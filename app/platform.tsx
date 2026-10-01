import { useCallback, useEffect, useRef, useState } from "react";
import { ActivityIndicator, BackHandler, Linking, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, X } from "lucide-react-native";
import WebView from "react-native-webview";
import type {
  ShouldStartLoadRequest,
  WebViewNavigation,
} from "react-native-webview/lib/WebViewTypes";
import { colors, fonts } from "@/constants/theme";
import { ARC_WEBSITE, ARC_MEMBERSHIP_URL } from "@/constants/links";
import { SecondaryButton } from "@/components/Buttons";

// ARC's own host — always loads inside the WebView.
const ARC_HOST = "alliance4regencomm.com";

// Hosts a real auth flow is CONFIRMED to redirect through, discovered via
// runtime testing. Empty until testing proves a specific provider is
// needed — add hostnames here as they're confirmed, rather than allowing
// all third-party domains by default.
const ADDITIONAL_ALLOWED_HOSTS: string[] = [];

function extractHostname(url: string): string | null {
  const match = url.match(/^https?:\/\/([^/:?#]+)/i);
  return match ? match[1].toLowerCase() : null;
}

function isAllowedHost(hostname: string): boolean {
  return hostname === ARC_HOST || hostname.endsWith(`.${ARC_HOST}`) || ADDITIONAL_ALLOWED_HOSTS.includes(hostname);
}

export default function PlatformScreen() {
  const router = useRouter();
  const { entry } = useLocalSearchParams<{ entry?: string }>();
  const initialUrl = entry === "membership" ? ARC_MEMBERSHIP_URL : ARC_WEBSITE;
  const webviewRef = useRef<WebView>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearLoadingTimeout = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
  }, []);

  // Safety net only — never used to show a false error. If onLoadEnd never
  // arrives (e.g. a same-page SPA navigation that doesn't pair cleanly with
  // the WebView's load lifecycle), stop blocking with our own overlay so
  // whatever actually loaded underneath becomes visible. Real failures still
  // surface separately via onError/onHttpError. Once fired, the overlay is
  // retired for the rest of this screen instance (see hasLoadedOnce below),
  // so it can't re-block a later navigation either.
  useEffect(() => {
    return () => clearLoadingTimeout();
  }, [clearLoadingTimeout]);

  // Shared by the header back arrow AND the hardware back button, so both
  // behave identically: go back inside the WebView if possible, else leave
  // the screen.
  const goBackOrExit = useCallback(() => {
    if (canGoBack && webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    router.back();
    return false;
  }, [canGoBack, router]);

  // Native-only exit — deliberately never touches the WebView, regardless of its
  // navigation history. Lets a user several pages deep in the site leave in one tap.
  const exitPlatform = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  }, [router]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true; // handled — consume the event
      }
      return false; // not handled — let default back navigation (router.back()) proceed
    });
    return () => subscription.remove();
  }, [canGoBack]);

  const handleShouldStartLoadWithRequest = useCallback((request: ShouldStartLoadRequest): boolean => {
    const { url } = request;

    if (url.startsWith("mailto:") || url.startsWith("tel:")) {
      Linking.openURL(url).catch(() => {});
      // We're blocking this navigation ourselves, so no onLoadEnd will ever
      // arrive for it — clear our own loading state rather than leave it
      // waiting on an event that isn't coming.
      clearLoadingTimeout();
      setLoading(false);
      return false;
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      clearLoadingTimeout();
      setLoading(false);
      return false; // unsupported/custom scheme — block silently
    }

    const hostname = extractHostname(url);
    if (hostname && isAllowedHost(hostname)) {
      return true; // ARC + confirmed auth-redirect hosts load inside the WebView
    }

    // Unrelated external domain — hand off to the system browser instead of
    // loading it inside the WebView. If runtime testing finds a real auth
    // redirect needs one of these hosts, add it to ADDITIONAL_ALLOWED_HOSTS
    // above rather than loosening this default.
    Linking.openURL(url).catch(() => {});
    clearLoadingTimeout();
    setLoading(false);
    return false;
  }, [clearLoadingTimeout]);

  function handleRetry() {
    setError(false);
    setLoading(true);
    webviewRef.current?.reload();
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <ArrowLeft size={18} color={colors.paper} onPress={goBackOrExit} />
        <Text style={styles.headerTitle}>ARC Platform</Text>
        <X
          size={18}
          color={colors.paper}
          onPress={exitPlatform}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Close ARC Platform"
        />
      </View>

      <View style={styles.body}>
        <WebView
          ref={webviewRef}
          source={{ uri: initialUrl }}
          style={styles.webview}
          onLoadStart={() => {
            setError(false);
            setLoading(true);
            clearLoadingTimeout();
            loadingTimeoutRef.current = setTimeout(() => {
              // Timed out waiting for onLoadEnd. Don't assume failure — just
              // stop blocking with our own overlay so the WebView's actual
              // state (which may have loaded fine underneath) becomes
              // visible. Retired permanently for this screen instance so a
              // later navigation can't get stuck behind the overlay either.
              setLoading(false);
              setHasLoadedOnce(true);
            }, 15000);
          }}
          onLoadEnd={() => {
            setLoading(false);
            setHasLoadedOnce(true);
            clearLoadingTimeout();
          }}
          onError={() => {
            setLoading(false);
            setError(true);
            clearLoadingTimeout();
          }}
          onHttpError={() => {
            setLoading(false);
            setError(true);
            clearLoadingTimeout();
          }}
          onNavigationStateChange={(navState: WebViewNavigation) => setCanGoBack(navState.canGoBack)}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
        />

        {loading && !error && !hasLoadedOnce && (
          <View style={styles.overlay} pointerEvents="none">
            <ActivityIndicator size="large" color={colors.gold} />
          </View>
        )}

        {error && (
          <View style={styles.overlay}>
            <Text style={styles.errorText}>
              Couldn't load the ARC platform. Check your connection and try again.
            </Text>
            <SecondaryButton label="Retry" onPress={handleRetry} style={{ marginTop: 14 }} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgDeep },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  headerTitle: { fontFamily: fonts.display, fontSize: 16, color: colors.paper },
  body: { flex: 1, position: "relative" },
  webview: { flex: 1, backgroundColor: colors.bgDeep },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.bgDeep,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  errorText: { fontFamily: fonts.body, fontSize: 13.5, lineHeight: 20, color: colors.danger, textAlign: "center" },
});

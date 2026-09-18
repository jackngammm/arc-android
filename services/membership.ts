const VALIDATE_MEMBERSHIP_URL = "https://qxhuqdimirwbwjwdcqry.supabase.co/functions/v1/validate-membership";

// Documented as the project's PUBLIC key (the official example sends it
// directly in client requests) — not a secret, no proxy/env-var needed.
const VALIDATE_MEMBERSHIP_API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4aHVxZGltaXJ3Yndqd2RjcXJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1Mzc1ODYsImV4cCI6MjA4MDExMzU4Nn0.nUn0AOONNuv7zuGXgiqWDNFfZKHEZ_Wc2ge2Btbpk-o";

export type MembershipFeatures = {
  capital_network_access?: boolean;
  initiative_access?: boolean;
  events_access?: boolean;
  magazine_access?: boolean;
  premium_content_access?: boolean;
  [key: string]: boolean | undefined;
};
// All 5 documented keys are OPTIONAL, not required. The documentation's
// example response happens to include all five, but nothing in the docs
// states every response always contains every flag (e.g. different tiers
// plausibly expose different feature sets) — so presence is not guaranteed
// and the type must not assume it. The index signature separately allows
// additional, currently-undocumented flags to pass through typed as
// boolean without breaking compilation, per "do not assume these are the
// only feature flags that could ever exist."
//
// Semantics of a missing key are UNKNOWN / NEEDS PRODUCT DECISION — the
// docs don't say whether an absent flag means "not granted," "not
// applicable to this tier," or something else. Milestone 1 does not
// perform feature gating, so it never needs to interpret a missing key
// one way or the other: it only displays/preserves whatever object the
// API actually returned, as-is. Do not assume "missing = denied" when
// real feature gating is eventually built — that interpretation should
// be confirmed with ARC first.
//
// Display rule for milestone 1's UI: all 5 documented flags always get a
// rendered label — "Yes"/"No" when the key is explicitly present, "Not
// reported" when absent (never displayed as false/denied). Any
// additional, undocumented boolean keys the response happens to include
// may also be shown, using whatever value was returned.

export const DOCUMENTED_FEATURE_KEYS = [
  "capital_network_access",
  "initiative_access",
  "events_access",
  "magazine_access",
  "premium_content_access",
] as const;

export type MembershipVerification = {
  valid: true; // API docs: "always true for a recognized verification code"
  member_name: string | null;
  is_member: boolean;
  tier: string; // NOT a union — docs type this as a plain string; the 5
                // "documented" tiers are examples, not a closed set.
  plan_type: string | null;
  status: "active" | "inactive"; // docs explicitly close this to 2 values
  expires_at: string | null; // ISO 8601
  features: MembershipFeatures;
};

export type MembershipVerificationError =
  | { kind: "invalid_format"; message: string } // 400
  | { kind: "not_found"; message: string } // 404
  | { kind: "too_large"; message: string } // 413 (defensive only)
  | { kind: "rate_limited"; message: string; retryAfterSeconds?: number } // 429
  | { kind: "server_error"; message: string } // 500
  | { kind: "network_error"; message: string }; // fetch threw / no response

export type MembershipVerificationResult =
  | { ok: true; data: MembershipVerification }
  | { ok: false; error: MembershipVerificationError };

export function isValidMembershipCodeFormat(code: string): boolean {
  return /^[A-Z0-9]{12}$/i.test(code);
}

// The docs don't say whether Retry-After is an integer (seconds) or an
// HTTP date for this endpoint — parse defensively and fall back to
// undefined rather than guessing.
function parseRetryAfterSeconds(headerValue: string | null): number | undefined {
  if (!headerValue) return undefined;

  const trimmedHeader = headerValue.trim();
  if (/^\d+$/.test(trimmedHeader)) {
    return parseInt(trimmedHeader, 10);
  }

  const asDate = Date.parse(headerValue);
  if (!Number.isNaN(asDate)) {
    const secondsUntil = Math.round((asDate - Date.now()) / 1000);
    return secondsUntil > 0 ? secondsUntil : undefined;
  }

  return undefined;
}

export async function verifyMembershipCode(code: string): Promise<MembershipVerificationResult> {
  let response: Response;
  try {
    response = await fetch(VALIDATE_MEMBERSHIP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: VALIDATE_MEMBERSHIP_API_KEY,
      },
      body: JSON.stringify({ code }),
    });
  } catch (err) {
    return {
      ok: false,
      error: { kind: "network_error", message: "Couldn't reach the verification service — check your connection and try again." },
    };
  }

  if (response.ok) {
    try {
      const data = (await response.json()) as MembershipVerification;
      return { ok: true, data };
    } catch {
      return {
        ok: false,
        error: { kind: "server_error", message: "Something went wrong on ARC's end. Please try again shortly." },
      };
    }
  }

  switch (response.status) {
    case 400:
      return {
        ok: false,
        error: { kind: "invalid_format", message: "That code doesn't look right — check it's exactly 12 letters/numbers and try again." },
      };
    case 404:
      return {
        ok: false,
        error: {
          kind: "not_found",
          message: "We couldn't find a membership associated with that code. It may not exist, or it may have been revoked or regenerated — check your ARC dashboard for your current code.",
        },
      };
    case 413:
      return {
        ok: false,
        error: { kind: "too_large", message: "That code doesn't look right — check it's exactly 12 letters/numbers and try again." },
      };
    case 429: {
      const retryAfterSeconds = parseRetryAfterSeconds(response.headers.get("Retry-After"));
      return {
        ok: false,
        error: { kind: "rate_limited", message: "Too many attempts — please wait a moment and try again.", retryAfterSeconds },
      };
    }
    case 500:
      return {
        ok: false,
        error: { kind: "server_error", message: "Something went wrong on ARC's end. Please try again shortly." },
      };
    default:
      return {
        ok: false,
        error: { kind: "server_error", message: "Something went wrong on ARC's end. Please try again shortly." },
      };
  }
}

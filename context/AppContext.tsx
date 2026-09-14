import { createContext, useContext, useState, ReactNode } from "react";

export type UserType = "guest" | "free" | "paid" | "scholarship" | "team";

export type CartItem = {
  id: string;
  label: string;
  price: string;
};

type AppState = {
  userType: UserType;
  isSignedIn: boolean;
  name: string;
  signIn: (tier: UserType, name: string) => void;
  signOut: () => void;
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  savedEventIds: string[];
  toggleSavedEvent: (id: string) => void;
  savedResourceIds: string[];
  toggleSavedResource: (id: string) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>("guest");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [name, setName] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [savedEventIds, setSavedEventIds] = useState<string[]>([]);
  const [savedResourceIds, setSavedResourceIds] = useState<string[]>([]);

  function signIn(tier: UserType, signedInName: string) {
    setUserType(tier);
    setIsSignedIn(true);
    setName(signedInName);
  }

  function signOut() {
    setUserType("guest");
    setIsSignedIn(false);
    setName("");
  }

  function addToCart(item: CartItem) {
    setCart((prev) => (prev.some((c) => c.id === item.id) ? prev : [...prev, item]));
  }

  function removeFromCart(id: string) {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }

  function toggleSavedEvent(id: string) {
    setSavedEventIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function toggleSavedResource(id: string) {
    setSavedResourceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  return (
    <AppContext.Provider
      value={{
        userType,
        isSignedIn,
        name,
        signIn,
        signOut,
        cart,
        addToCart,
        removeFromCart,
        savedEventIds,
        toggleSavedEvent,
        savedResourceIds,
        toggleSavedResource,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

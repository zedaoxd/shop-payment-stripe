"use client";

import { CartProvider } from "use-shopping-cart";

type AppCartProviderProps = {
  children: React.ReactNode;
};

export const AppCartProvider = ({ children }: AppCartProviderProps) => {
  return (
    <CartProvider
      shouldPersist
      cartMode="checkout-session"
      stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      currency="BRL"
      language="pt-BR"
    >
      {children}
    </CartProvider>
  );
};

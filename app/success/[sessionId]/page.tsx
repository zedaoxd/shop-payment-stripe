"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";

type Props = {
  Params: {
    sessionId: string;
  };
};

export default function Success({ Params }: Props) {
  const { clearCart } = useShoppingCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="container my-10 space-y-4 flex flex-col items-center justify-center">
      <Check className="text-green-500 w-24 h-24" />
      <h1 className="text-2xl">Obrigado e Parabéns pela compra</h1>
    </div>
  );
}

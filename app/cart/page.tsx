"use client";

import { useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Loader, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function Cart() {
  const { cartCount, cartDetails, redirectToCheckout, removeItem } =
    useShoppingCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const checkout = async () => {
    setIsCheckingOut(true);

    const response = await axios.post("/api/checkout", {
      cartDetails,
    });

    await redirectToCheckout(response.data.id);

    setIsCheckingOut(false);
  };

  return (
    <section className="container flex flex-col my-2 space-y-2">
      {cartDetails &&
        Object.keys(cartDetails).map((key) => (
          <Card key={key} className="w-full">
            <CardHeader>
              <CardTitle className="tracking-wider">
                {cartDetails[key].name} ({cartDetails[key].quantity})
              </CardTitle>

              <CardDescription className="tracking-wider">
                {cartDetails[key].description}
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-28 h-28">
                    <Image
                      src={cartDetails[key].image ?? ""}
                      alt={cartDetails[key].name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div>
                    <p className="font-medium leading-none">Preço</p>
                    <p className="text-muted-foreground">
                      {cartDetails[key].formattedValue}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  className="text-red-400 cursor-pointer hover:text-red-600"
                  onClick={() => removeItem(key)}
                >
                  <Trash2 />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

      <div
        className={cn(
          "flex items-center justify-end",
          cartCount === undefined || cartCount <= 0 ? "hidden" : ""
        )}
      >
        <Button size="lg" onClick={checkout} disabled={isCheckingOut}>
          {isCheckingOut ? (
            <div className="flex items-center justify-between gap-2">
              <Loader className="animate-spin 2s repeat-infinite" />
              Finalizando...
            </div>
          ) : (
            "Finalizar compra"
          )}
        </Button>
      </div>
    </section>
  );
}

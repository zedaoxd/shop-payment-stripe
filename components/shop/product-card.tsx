"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";
import { toast } from "../ui/use-toast";

type Props = {
  name: string;
  description: string | null;
  image: string;
  price: string | number;
  id: string;
};

export function ProductCard({ id, name, description, image, price }: Props) {
  const { addItem } = useShoppingCart();

  const formattedPrice = formatCurrencyString({
    value: Number(price),
    currency: "BRL",
    language: "pt-BR",
  });

  const addToCart = async () => {
    addItem({
      currency: "BRL",
      id,
      name,
      price: Number(price),
      description: description ?? "Sem descrição",
      image,
    });

    toast({
      title: "Produto adicionado ao carrinho",
      description: `O produto ${name} foi adicionado ao carrinho`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-center min-h-[4rem]">
          {name}
        </CardTitle>

        <CardDescription className="relative w-full h-60">
          <Image
            src={image}
            alt={name}
            fill
            sizes="100%"
            className="object-contain"
          />
        </CardDescription>
      </CardHeader>

      <CardContent className="relative w-full">
        <p className="min-h-[6rem]">{description}</p>
      </CardContent>

      <CardFooter className="flex items-center justify-between">
        <div>
          <p>Preço</p>
          <p>{formattedPrice}</p>
        </div>

        <Button size="lg" onClick={addToCart}>
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
}

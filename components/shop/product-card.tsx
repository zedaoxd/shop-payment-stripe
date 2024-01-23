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
import { priceFormater } from "@/utils/formaters";
import Image from "next/image";

type Props = {
  name: string;
  description: string | null;
  image: string;
  price: string | number;
};

export function ProductCard({ name, description, image, price }: Props) {
  const addToCart = async () => {};

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
          <p>{priceFormater(Number(price))}</p>
        </div>

        <Button size="lg" onClick={addToCart}>
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

type Props = {
  name: string;
  description: string | null;
  images?: string[];
};

export function ProductCard({ name, description, images }: Props) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Carousel
          plugins={[plugin]}
          className="w-full max-w-xs"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {images?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Image src={image} alt={name} width={400} height={400} />
                  {index}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />

          <CarouselNext />
        </Carousel>
      </CardContent>

      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
}

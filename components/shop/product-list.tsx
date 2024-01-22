import { stripe } from "@/lib/stripe";
import Stripe from "stripe";
import { ProductCard } from "./product-card";

async function getProducts() {
  try {
    const stripeProducts = await stripe.products.list({
      limit: 9,
      expand: ["data.default_price"],
    });

    const products: Product[] = stripeProducts.data.map(
      (product: Stripe.Product) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: (product.default_price as Stripe.Price).unit_amount_decimal ?? 0,
        currency: (product.default_price as Stripe.Price).currency,
        image: product.images[0],
        images: product.images,
      })
    );

    return products;
  } catch (error) {
    console.error(error);
  }
}

export async function ProductList() {
  const products = await getProducts();
  return (
    <section>
      {products?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </section>
  );
}

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
    <section className="grid gap-4 m-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            description={product.description}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
    </section>
  );
}

import { stripe } from "@/lib/stripe";
import axios from "axios";
import Stripe from "stripe";

async function getDummyProducts() {
  const response = await axios.get<{ products: DummyProduct[] }>(
    "https://dummyjson.com/products?limit=9"
  );

  const products: Stripe.ProductCreateParams[] = response.data.products.map(
    (dummyProduct) => ({
      name: dummyProduct.title,
      default_price_data: {
        currency: "BRL",
        unit_amount_decimal: dummyProduct.price.toString(),
      },
    })
  );

  return products;
}

async function seedDummyData() {
  const products = await getDummyProducts();
  products.map(async (product: Stripe.ProductCreateParams) => {
    try {
      const productCreated = await stripe.products.create(product);
      console.log(productCreated);
    } catch (error) {
      console.error(`STRIPE_CREATE_ERROR: ${error}`);
    }
  });
}

export default async function Seed() {
  await seedDummyData();

  return (
    <div className="container flex items-center justify-center my-10">
      <h1 className="text-3xl text-green-600 font-extrabold">
        Dummy data created in your Stripe inventory. If you don&apos;t see it on
        your products dashboard. Take a look at you console.log
      </h1>
    </div>
  );
}

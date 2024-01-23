import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";
import { validateCartItems } from "use-shopping-cart/utilities";
import { Product } from "use-shopping-cart/core";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  try {
    const { cartDetails } = await request.json();
    const baseUrl = request.nextUrl.origin;

    const stripeInvestory = await stripe.products.list({
      limit: 100,
      expand: ["data.default_price"],
    });

    const products = stripeInvestory.data.map(
      (product): Product => ({
        id: product.id,
        name: product.name,
        price: (product.default_price as Stripe.Price).unit_amount ?? 0,
        currency: (product.default_price as Stripe.Price).currency,
        image: product.images[0],
      })
    );

    const line_items = validateCartItems(products, cartDetails);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "boleto"],
      line_items,
      success_url: `${baseUrl}/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/cart`,
    });

    return NextResponse.json(session, {
      status: 200,
      statusText: "OK",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}

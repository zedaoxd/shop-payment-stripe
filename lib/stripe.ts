import Stripe from "stripe";
import { env } from "./env";

export const stripe = new Stripe(env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

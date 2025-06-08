import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
export const createProductReview = async (
  client: SupabaseClient<Database>,
  {
    productId,
    review,
    rating,
    userId,
  }: {
    productId: string;
    review: string;
    rating: number;
    userId: string;
  }
) => {
  const { error } = await client.from("reviews").insert({
    product_id: +productId,
    review,
    rating,
    profile_id: userId,
  });
  if (error) {
    throw error;
  }
};

export const createProduct = async (
  client: SupabaseClient<Database>,
  {
    name,
    tagline,
    description,
    howItWork,
    url,
    iconUrl,
    categoryId,
    userId,
  }: {
    name: string;
    tagline: string;
    description: string;
    howItWork: string;
    url: string;
    iconUrl: string;
    categoryId: number;
    userId: string;
  }
) => {
  const { data, error } = await client
    .from("products")
    .insert({
      name,
      tagline,
      description,
      how_it_works: howItWork,
      url,
      icon: iconUrl,
      category_id: categoryId,
      profile_id: userId,
    })
    .select("product_id")
    .single();

  if (error) throw error;
  return data.product_id;
};

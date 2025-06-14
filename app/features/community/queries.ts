import type { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import type { Database } from "~/supa-client";
// export const getTopics = async () => {
//   const allTopics = await db
//     .select({ name: topics.name, slug: topics.slug })
//     .from(topics);
//   return allTopics;
// };

// export const getPosts = async () => {
//   const allPosts = await db
//     .select({
//       id: posts.post_id,
//       title: posts.title,
//       createdAt: posts.created_at,
//       topic: topics.name,
//       author: profiles.name,
//       authorAvatarUrl: profiles.avatar,
//       username: profiles.username,
//       upvotes: count(postUpvotes.post_id),
//     })
//     .from(posts)
//     .innerJoin(topics, eq(posts.topic_id, topics.topic_id))
//     .innerJoin(profiles, eq(posts.profile_id, profiles.profile_id))
//     .leftJoin(postUpvotes, eq(posts.post_id, postUpvotes.post_id))
//     .groupBy(
//       posts.post_id,
//       profiles.name,
//       profiles.avatar,
//       profiles.username,
//       topics.name
//     )
//     .orderBy(asc(posts.post_id));
//   return allPosts;
// };

export const getTopics = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.from("topics").select("name, slug");
  if (error) throw new Error(error.message);
  return data;
};

export const getPosts = async (
  client: SupabaseClient<Database>,
  {
    limit,
    sorting,
    period = "all",
    keyword,
    topic,
  }: {
    limit: number;
    sorting: "newest" | "popular";
    period?: "all" | "today" | "week" | "month" | "year";
    keyword?: string;
    topic?: string;
  }
) => {
  const baseQuery = client
    .from("community_post_list_view")
    .select("*")
    .limit(limit);
  if (sorting === "newest") {
    baseQuery.order("created_at", { ascending: false });
  } else if (sorting === "popular") {
    baseQuery.order("upvotes", { ascending: false });
  } else {
    const today = DateTime.now();
    if (period === "today") {
      baseQuery.gte("created_at", today.startOf("day").toISO());
    } else if (period === "week") {
      baseQuery.gte("created_at", today.startOf("week").toISO());
    } else if (period === "month") {
      baseQuery.gte("created_at", today.startOf("month").toISO());
    }
    baseQuery.order("upvotes", { ascending: false });
  }

  if (keyword) {
    baseQuery.ilike("title", `%${keyword}%`);
  }

  if (topic) {
    baseQuery.eq("topic_slug", topic);
  }

  const { data, error } = await baseQuery;
  if (error) throw new Error(error.message);
  return data;
};

export const getPostById = async (
  client: SupabaseClient<Database>,
  postId: string
) => {
  const { data, error } = await client
    .from("community_post_detail")
    .select("*")
    .eq("post_id", Number(postId))
    .single();
  if (error) throw error;
  return data;
};

export const getReplies = async (
  client: SupabaseClient<Database>,
  postId: string
) => {
  const replyQuery = `
  post_reply_id,
  reply,
  created_at,
  user:profiles (
  name,
  avatar,
  username
  )
  `;

  const { data, error } = await client
    .from("post_replies")
    .select(
      `
    ${replyQuery},
    post_replies (
      ${replyQuery}
    )`
    )
    .eq("post_id", Number(postId))
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getTeams = async (client: SupabaseClient<Database>) => {
  const { data, error } = await client.from("team").select(
    `
        team_id,
        roles,
        product_description,
        team_leader:profiles!inner(
        username, avatar)
        `
  );

  if (error) {
    throw error;
  }
  return data;
};

export const getTeamById = async (
  client: SupabaseClient<Database>,
  teamId: string
) => {
  const { data, error } = await client
    .from("team")
    .select(
      `
      *,
      team_leader:profiles!inner(
        name,
        avatar,
        role,
        username
      )
      `
    )
    .eq("team_id", Number(teamId))
    .single();

  if (error) {
    throw error;
  }
  return data;
};

import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";
import { LOCATION_TYPES, JOB_TYPES, SALARY_RANGE } from "./constants";

export const getJobs = async (
  client: SupabaseClient<Database>,
  {
    limit,
    location,
    type,
    salary,
  }: {
    limit: number;
    location?: (typeof LOCATION_TYPES)[number]["value"];
    type?: (typeof JOB_TYPES)[number]["value"];
    salary?: (typeof SALARY_RANGE)[number];
  }
) => {
  const baseQuery = client
    .from("jobs")
    .select(
      `
        job_id,
        position,
        overview,
        company_name,
        company_logo,
        company_location,
        job_type,
        location,
        salary_range,
        created_at
      `
    )
    .limit(limit);

  if (location) {
    baseQuery.eq("location", location);
  }

  if (type) {
    baseQuery.eq("job_type", type);
  }

  if (salary) {
    baseQuery.eq("salary_range", salary);
  }
  const { data, error } = await baseQuery;

  if (error) {
    throw error;
  }
  return data;
};

export const getJobById = async (
  client: SupabaseClient<Database>,
  jogId: string
) => {
  const { data, error } = await client
    .from("jobs")
    .select("*")
    .eq("job_id", Number(jogId))
    .single();
  if (error) {
    throw error;
  }
  return data;
};

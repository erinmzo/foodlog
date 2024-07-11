import { Tables } from "./supabase";

export type Post = Tables<"posts">;

export type Profile = Tables<"profile">;

export type Recommend = Tables<"recommend">; 
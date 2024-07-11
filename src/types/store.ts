import { Tables } from "./supabase";

export type Post = Tables<"posts">;

export type Profile = Tables<"profile">;

export type Comments = Tables<"comments">; 

export type Recommend = Tables<"recommend">;

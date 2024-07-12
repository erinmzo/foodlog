import { Tables } from "./supabase";

export type Post = Tables<"posts">;

export type Profile = Tables<"profile">;

export type Comments = Tables<"comments">;

export type Recommend = Tables<"recommend">;

export type TPostData = Omit<Post, "created_at" | "id">;

// {
//   category: string;
//   store_name: string;
//   menu_name: string;
//   order_date: string;
//   address: string;
//   rating: string;
//   content: string;
//   img_url: string;
//   user_nickname: string;
//   user_id: string;
//   id?: string;
// }

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];
export type Database = {
  public: {
    Tables: {
      comments: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          post_id: string | null;
          user_id: string;
          user_name: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          user_id: string;
          user_name: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          post_id?: string | null;
          user_id?: string;
          user_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_user_name_fkey";
            columns: ["user_name"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["nickname"];
          }
        ];
      };
      posts: {
        Row: {
          address: string | null;
          category: string;
          content: string;
          created_at: string;
          id: string;
          img_url: string | null;
          menu_name: string;
          order_date: string;
          rating: string;
          store_name: string;
          user_id: string;
          user_nickname: string;
        };
        Insert: {
          address?: string | null;
          category: string;
          content: string;
          created_at?: string;
          id?: string;
          img_url?: string | null;
          menu_name: string;
          order_date: string;
          rating: string;
          store_name: string;
          user_id: string;
          user_nickname: string;
        };
        Update: {
          address?: string | null;
          category?: string;
          content?: string;
          created_at?: string;
          id?: string;
          img_url?: string | null;
          menu_name?: string;
          order_date?: string;
          rating?: string;
          store_name?: string;
          user_id?: string;
          user_nickname?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profile";
            referencedColumns: ["id"];
          }
        ];
      };
      profile: {
        Row: {
          id: string;
          nickname: string;
        };
        Insert: {
          id: string;
          nickname: string;
        };
        Update: {
          id?: string;
          nickname?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      recommend: {
        Row: {
          created_at: string;
          id: number;
          img_url: string;
          menu: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          img_url: string;
          menu: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          img_url?: string;
          menu?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
type PublicSchema = Database[Extract<keyof Database, "public">];
export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;
export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;
export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;
export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

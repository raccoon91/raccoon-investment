type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

interface Supabase {
  public: {
    Tables: {
      dividens: {
        Row: {
          date: string;
          id: number;
          symbol_id: number;
          text: string;
          user_id: string;
        };
        Insert: {
          date: string;
          id?: number;
          symbol_id: number;
          text: string;
          user_id: string;
        };
        Update: {
          date?: string;
          id?: number;
          symbol_id?: number;
          text?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "dividens_symbol_id_fkey";
            columns: ["symbol_id"];
            referencedRelation: "symbols";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "dividens_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      favorites: {
        Row: {
          group_id: number | null;
          id: number;
          order: number | null;
          symbol_id: number;
          user_id: string;
        };
        Insert: {
          group_id?: number | null;
          id?: number;
          order?: number | null;
          symbol_id: number;
          user_id: string;
        };
        Update: {
          group_id?: number | null;
          id?: number;
          order?: number | null;
          symbol_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "favorites_group_id_fkey";
            columns: ["group_id"];
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_symbol_id_fkey";
            columns: ["symbol_id"];
            referencedRelation: "symbols";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "favorites_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      groups: {
        Row: {
          id: number;
          name: string;
          order: number | null;
          user_id: string;
        };
        Insert: {
          id?: number;
          name: string;
          order?: number | null;
          user_id: string;
        };
        Update: {
          id?: number;
          name?: string;
          order?: number | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "groups_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      symbols: {
        Row: {
          country: string | null;
          currency: string | null;
          exchange: string | null;
          id: number;
          mic_code: string | null;
          name: string;
          ticker: string;
          type: string;
        };
        Insert: {
          country?: string | null;
          currency?: string | null;
          exchange?: string | null;
          id?: number;
          mic_code?: string | null;
          name: string;
          ticker: string;
          type: string;
        };
        Update: {
          country?: string | null;
          currency?: string | null;
          exchange?: string | null;
          id?: number;
          mic_code?: string | null;
          name?: string;
          ticker?: string;
          type?: string;
        };
        Relationships: [];
      };
      trades: {
        Row: {
          commission: number;
          count: number;
          date: string;
          id: number;
          price: number;
          symbol_id: number;
          text: string;
          type: string;
          user_id: string;
        };
        Insert: {
          commission: number;
          count: number;
          date: string;
          id?: number;
          price: number;
          symbol_id: number;
          text: string;
          type: string;
          user_id: string;
        };
        Update: {
          commission?: number;
          count?: number;
          date?: string;
          id?: number;
          price?: number;
          symbol_id?: number;
          text?: string;
          type?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "trades_symbol_id_fkey";
            columns: ["symbol_id"];
            referencedRelation: "symbols";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "trades_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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
}

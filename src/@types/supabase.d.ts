type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

interface Database {
  public: {
    Tables: {
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

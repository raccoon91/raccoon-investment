import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Supabase>(
  import.meta.env.VITE_SUPABASE_API,
  import.meta.env.VITE_SUPABASE_API_KEY
);

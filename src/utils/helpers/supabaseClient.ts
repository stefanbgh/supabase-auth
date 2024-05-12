import { SupabaseClient, createClient } from "@supabase/supabase-js";

export const supabaseClient: SupabaseClient = createClient(
	import.meta.env.VITE_SUPABASE_BASE_URL,
	import.meta.env.VITE_SUPABASE_ANON_KEY
);

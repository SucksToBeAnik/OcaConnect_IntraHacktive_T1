import { createClient } from "@supabase/supabase-js";

// Admin Client, bypasses rls policy
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}
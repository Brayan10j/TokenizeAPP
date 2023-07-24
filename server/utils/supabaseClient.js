import { serverSupabaseClient } from "#supabase/server";

export const useSupabaseClient = (handler) => {
  return serverSupabaseClient(handler);
};

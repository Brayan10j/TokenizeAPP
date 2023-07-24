export const useValidateApiKey = async (handle, apiKey) => {
  const client = useSupabaseClient(handle);
  const { data, error } = await client
    .from("apiKeys")
    .select("key")
    .eq("key", apiKey);
  return data.length !== 0;
};

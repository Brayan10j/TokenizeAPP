export default defineEventHandler(async (event) => {
  const client = useSupabaseClient(event);
  const { data, error } = await client
    .from("products")
    .select("data")
    .eq("id", event.context.params.id);
  return data;
});

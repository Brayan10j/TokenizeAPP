export default defineEventHandler(async (event) => {
  const client = useSupabaseClient(event);
  const { data } = await client.from("products").select("data");
  return { products: data };
});

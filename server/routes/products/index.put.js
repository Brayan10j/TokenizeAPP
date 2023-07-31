export default defineEventHandler(async (event) => {
  const { id, metadata } = await readBody(event);
  const client = useSupabaseClient(event);
  const { data, error } = await client
    .from("products")
    .update({ data: metadata })
    .eq("id", id)
    .select();

    if (error) console.log(error.message);
  return "OK";
});

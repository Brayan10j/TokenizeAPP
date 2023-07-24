export default defineEventHandler(async (event) => {
  /* const query = getQuery(event);
  const client = useSupabaseClient(event);
  if (query.apiKey) {
    const { data, error } = await client
      .from("apiKeys")
      .select("key")
      .eq("key", query.apiKey);
    if (data.length == 0) {
      throw createError({
        statusCode: 400,
        statusMessage: "should have an apiKey o this not exist",
      });
    }
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: "should have an apiKey o this not exist",
    });
  } */
  /* if (process.client) {
    console.log("client");
  }
  if (process.server) {
    console.log("server");
  } */
});

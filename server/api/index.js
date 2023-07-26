
/* import { NFTStorage } from "nft.storage";
//import ganache from "ganache";

const NFT_STORAGE_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQ5RTZiOEM2OTNjMjlFQTJEOTUyODY5NzdlNjlGY2Y1RDkxMDk3NDUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4OTM1NTQ3MTU0NSwibmFtZSI6InRva2VuZXhhbXBsZSJ9.-X2Q5T1bXe4hGNf17BEpmncWRCCXBvR0lCt1PUABctw";
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

export default defineEventHandler(async () => {
  const metadata = await client.store({
    name: "My sweet NFT",
    description: "Just try to funge it. You can't do it.",
  });
  console.log(metadata);
});

/* console.log(
  web3.eth.accounts.privateKeyToAccount(
    "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709"
  )
); */

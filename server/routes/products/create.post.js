import { Web3 } from "web3";
import abi from "@/public/abi.json";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  if (query.apiKey) {
    const access = await useValidateApiKey(event, query.apiKey);
    if (access) {
      const client = useSupabaseClient(event);
      const { id, metadata, account ,quantity } = await readBody(event);
      const web3 = new Web3(
        "wss://rpc-mumbai.maticvigil.com/ws/v1/09533f1130c95616c233e806d6a45473c38fbb70"
      );
      const MyContract = new web3.eth.Contract(abi, process.env.CONTRACT);

      let tx = {
        from: "0x800d5633013855484B0271784bddEA18f9eE162A",
        to: process.env.CONTRACT,
        data: MyContract.methods.mint(account, id, 1, []).encodeABI(),
        gasPrice: await web3.eth.getGasPrice(),
        gas: 500000,
      };

      const txSigned = await web3.eth.accounts.signTransaction(
        tx,
        "0x6490d9b54d224f9c351a02a0274e94b844ec8ea90155e16c4e14b503f855733a"
      );

      const { transactionHash } = await web3.eth.sendSignedTransaction(
        txSigned.rawTransaction
      );

      //insert data

      const { data, error } = await client
        .from("products")
        .insert([{ id: id, data: metadata }])
        .select();

      if (error) return error.message;

      return {
        transactionExplorer:
          "https://mumbai.polygonscan.com/tx/" + transactionHash,
        metadataLink: "https://localhost:3000/products/" + id,
      };
    }
  } else {
    throw createError({
      statusCode: 500,
      statusMessage: "should have an apiKey o this not exist",
    });
  }
});

import { Configuration, OpenAIApi } from "openai";
import { Telegraf } from "telegraf";
import fs from "fs";
import https from "https";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { ConversationSummaryMemory } from "langchain/memory";
import { LLMChain } from "langchain/chains";
import gTTS from "gtts";

import { createClient } from "@supabase/supabase-js";

import { PromptTemplate } from "langchain/prompts";
export default defineEventHandler(() => {
  return "sadasdadd";
});

const prompt =
  PromptTemplate.fromTemplate(`The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.
  Current conversation:
  {history}
  Human: {input}
  AI:`);

const model = new ChatOpenAI();

const client = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);

const runtimeConfig = useRuntimeConfig();

const bot = new Telegraf(process.env.BOT);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function makeChatCompletion(message) {
  let res = await client.from("chats").select("*").eq("id", message.chat.id);

  const memory = new ConversationSummaryMemory({
    llm: new ChatOpenAI({ temperature: 0 }),
  });

  if (res.data.length > 0) {
    const history = res.data[0].history;
    await memory.saveContext(
      { input: history },
      { output: "conversation history check!" }
    );
  }

  const chain = new LLMChain({ llm: model, prompt, memory });
  const res1 = await chain.call({
    input: message.text,
  });
  const temp = await memory.loadMemoryVariables({});
  await client
    .from("chats")
    .upsert([
      {
        id: message.chat.id,
        history: temp.history,
      },
    ])
    .select();
  return res1;
}

bot.start(
  async (ctx) => ctx.reply("Welcome")
  /*   const res = await ctx.reply("Welcome", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "pregunta",
            callback_data: "get",
          },
        ],
      ],
    },
  });
} */
);

bot.on("text", async (ctx) => {
  ctx.reply("Procesing ...");
  ctx.reply(await makeChatCompletion(ctx.update.message));
});

bot.on("voice", async (context) => {
  context.reply("Procesing ...");
  const fileLINK = await bot.telegram.getFileLink(
    context.message.voice.file_id
  );
  https.get(fileLINK.href, (response) => {
    if (response.statusCode !== 200) {
      console.error("Error en la solicitud:", response.statusCode);
      return;
    }

    // Crear un flujo de escritura hacia el archivo local
    const writeStream = fs.createWriteStream("salida.ogg");

    // Pipe (conectar) el flujo de lectura de la respuesta al flujo de escritura hacia el archivo local
    response.pipe(writeStream);

    writeStream.on("finish", async () => {
      const resp = await openai.createTranscription(
        fs.createReadStream("salida.ogg"),
        "whisper-1"
      );

      const response = await makeChatCompletion({
        chat: {
          id: context.update.message.chat.id,
        },
        text: resp.data.text,
      })

    
      const gtts = new gTTS(response.text);
      await gtts.save("Voice.mp3", function (err, result) {
        if (err) {
          throw new Error(err);
        }
        console.log("Text to speech converted!");
        context.sendAudio({ source: "Voice.mp3" });
      });

      console.log("Archivo guardado correctamente en:", "salida.ogg");
    });

    writeStream.on("error", (err) => {
      console.error("Error al guardar el archivo:", err);
    });
  });
});

bot.action("suprise", async (ctx) => {});

bot.action("get", async (ctx) => {
  console.log(ctx.state);
});

bot.launch();

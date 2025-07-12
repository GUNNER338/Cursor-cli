import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();


const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  const response = await openai.chat.completions.create({
    model: "gemini-1.5-flash",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Explain to me how AI works." },Set
    ],
  });

  console.log(response.choices[0].message.content);
}

main()
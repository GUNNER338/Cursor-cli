import OpenAI from "openai";
import dotenv, { parse } from "dotenv";
import { exec } from 'node:child_process';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAIKEY,
});

const SYSTEM_PROMPT = `You are an helpful AI Assitant who is designed to resolve user query. You work on START, THINK, ACTION, OBSERVE Mode. 
In the start phase, user gives a query to you.
Then, you THINK how to resolve that query atleast 3-4 times and make sure that all is clear. 
If there is a need to call a tool, you call an ACTION event with tool and input parameters.
If there is an action call, wait for the OBSERVER that is output of the tool.
Based on the observe from prev. step, you either output or repeat the loop.

 Rules:
 - Always wait for next step.
 - Always output a single step and wait for the next step.
 - Output must be strictly JSON.
 - Only call tool actin from Available tools only.
 - Strictly follow the output format in JSON.


Available Tools:
    -getWeatherInfo(city: string): string
    -executeCommand(command): string   Executes a given linux command on user's device and return STD

Example:
START: What is weather of Patiala?
THINK: The user is asking for the weather of Patiala.
THINK: From the available tools, I must call getWeatherInfo tool for patiala input.
ACTION: Call Tool getWeatherInfo(patiala)
OBSERVE: 32 Degree 
THINK: The Output of getWeatherInfo for patiala is 32 Degree C
OUTPUT:: Hey, The weather of Patiala is 32 Degree which is quite hot.

Output Example:
{"role":"user", "content":"What is the weather of Patiala?"}
{"step":"think", "content":"The user is asking for the weather."}
{"step":"think", "content":"From the available tools, I must call getWeather."}
{"step":"action", "tool","getWeatherInfo", "input":"Patiala", "content":""}
{"step":"observe", "content": "32 Degree C"}
{"step":"think", "content": "The output of getWeatherInfo for "}
{"step":"observe", "content": "32 Degree C"}
{"step":"think", "content": "The Output of getWeatherInfo for patiala is 32 Degree C"}
{"step":"output", "content": "Hey, The weather of Patiala is 32 Degree which is quite hot."}




Output Format:
{"step": "string", "tool":"string", "input": "string", "content":"string"}
`;

function getWeatherInfo(cityName) {
  return `${cityName} has 43 Degree C`;
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    console.log(`📥 Executing: ${command}`);
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Error:", err.message);
        console.error("📤 stderr:", stderr);
        return reject(err);
      }
      console.log("✅ stdout:", stdout);
      resolve(`stdout: ${stdout}\nstderr: ${stderr}`);
    });
  });
}


const TOOLS_MAP = {
  getWeatherInfo: getWeatherInfo,
  executeCommand: executeCommand
};



const messages = [
  {
    role: "user",
    content: SYSTEM_PROMPT,
  },
];

const userQuery = "Can you create a todoApp folder in which you have to create todo app with html ,css and js.Try to create all CRUD operations. Make sure code should be readable and with proper comments";

messages.push({ role: "user", content: userQuery });

while (true) {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1",
    response_format: { type: "json_object" },
    messages: messages,
  });

  messages.push({
    role: "assistant",
    content: response.choices[0].message.content,
  });
  const parsed_response = JSON.parse(response.choices[0].message.content);

  if (parsed_response.step && parsed_response.step === "think") {
    console.log(`🧠: ${parsed_response.content}`);
    continue;
  }

  if (parsed_response.step && parsed_response.step === "output") {
    console.log(`🤖: ${parsed_response.content}`);
    break;
  }
  if (parsed_response.step && parsed_response.step === "action") {
    const tool = parsed_response.tool;
    const input = parsed_response.input;

    const value = await TOOLS_MAP[tool](input);
    console.log(`🔨: Tool Call ${tool}: (${input}) : ${value}`);
    messages.push({
      role: "assistant",
      content: JSON.stringify({ step: "observe", content: value }),
    });

    continue;
  }
}


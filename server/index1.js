import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
// import express from "express";

config();

const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

async function get_text(prompt) {
  // const prompt =
  //   "Give me popular dress choices  , in the format of array of objects with name and description ";
  const example_output = '[{ "name" : "example","description":"example"}]';
  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: `Give me response in the format of stringified json , for example ${example_output}`,
      },
      {
        role: "model",
        parts: "I'll give all my response in the desired format",
      },
    ],
    generationConfig: {
      maxOutputTokens: 1024,
    },
  });
  //   console.log("result", result);
  const result = await chat.sendMessage(prompt);
  const response = result.response;
//   console.log({ response });
  const text = response.text();
//   console.log({ text });
  var new_text = text.replace(/`/g, "");
  new_text = new_text.replace("json", "");
  // const json_text = JSON.parse(new_text);
  // console.log(json_text);
//   console.log({ new_text });
  new_text = JSON.parse(new_text);
  console.log({ new_text });
  console.log("first data ", new_text[0]);
}

get_text("Give me some indian foods with name and its description");

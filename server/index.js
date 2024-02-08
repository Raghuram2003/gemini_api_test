import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "dotenv";
import express from "express";

config();

const genAI = new GoogleGenerativeAI(process.env.GEN_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test");
});

app.post("/api/genAi", async (req, res) => {
  const { prompt } = req.body;
  const resp = await get_text(prompt);
  res.json({ text_arr: resp });
});

app.listen(3000, () => {
  console.log("server started at 3000");
});

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

  const result = await chat.sendMessage(prompt);
  const response = result.response;

  const text = response.text();

  var new_text = text.replace(/`/g, "");
  new_text = new_text.replace("json", "");

  new_text = JSON.parse(new_text);

  return new_text;
}

// async function get_text(prompt) {
//   // const prompt =
//   //   "Give me popular dress choices  , in the format of array of objects with name and description ";
//   const result = await model.generateContent(prompt);
//   //   console.log("result", result);
//   const response = await result.response;
//   console.log({response})
//   const text = response.text();
//   console.log(text);
//   var new_text = text.replace(/`/g, "");
//   new_text = new_text.replace('json',"");
//   // const json_text = JSON.parse(new_text);
//   // console.log(json_text);
//   return new_text;
// }

// get_text();
// [
//   {
//     name: 'Little Black Dress (LBD)',
//     description: 'A versatile and timeless dress that can be dressed up or down for various occasions.'
//   },
//   {
//     name: 'Maxi Dress',
//     description: 'A long and flowy dress that is perfect for warm weather and casual outings.'
//   },
//   {
//     name: 'Midi Dress',
//     description: 'A dress that falls below the knees, offering a more formal and elegant look.'
//   },
//   {
//     name: 'Wrap Dress',
//     description: 'A dress that wraps around the body and ties at the waist, creating a flattering and feminine silhouette.'
//   },
//   {
//     name: 'Shift Dress',
//     description: 'A simple and loose-fitting dress that is often made from a stretchy material and can be worn for casual or
//  semi-formal occasions.'
//   },
//   {
//     name: 'Sundress',
//     description: 'A lightweight and airy dress that is perfect for hot summer days and beach vacations.'
//   },
//   {
//     name: 'Cocktail Dress',
//     description: 'A semi-formal dress that is typically worn to cocktail parties, weddings, and other special events.'
//   },
//   {
//     name: 'Prom Dress',
//     description: 'A formal and elaborate dress that is worn to prom, a high school dance.'
//   },
//   {
//     name: 'Wedding Dress',
//     description: 'A white or ivory dress worn by the bride on her wedding day.'
//   },
//   {
//     name: 'Quinceañera Dress',
//     description: 'A colorful and elaborate dress worn by a young Hispanic woman to celebrate her 15th birthday.'
//   }
// ]

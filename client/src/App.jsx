import axios from "axios";
import { useState } from "react";

function App() {
  // axios.defaults.baseURL = "http://localhost:3000/"
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);

  //Give me popular dress choices  , in the format of stringified json with name and description , for example "[{ "name" : "example","description":"example"}]"

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/genAi", { prompt });
      console.log(res);
      const json_res = res.data.text_arr;
      console.log(json_res);
      setResponse(json_res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-black w-full h-full">
      <div className="flex items-center justify-center">
        <form className="flex flex-col w-1/2 mx-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Prompt"
            className="rounded-sm mb-2"
          />
          <button className="text-white bg-slate-500 rounded-sm">Submit</button>
        </form>
      </div>
      <div className="flex items-center justify-center ">
        <div className="flex  flex-col items-center justify-center w-1/2 overflow-x-auto">
          {response !== null &&
            response.length > 0 &&
            response.map((data, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center border border-white w-full m-2"
              >
                <div className="p-2 bg-slate-600 rounded-full m-2 text-white">
                  Name : {data.name}
                </div>
                <div className="p-2 bg-slate-600 rounded-full m-2 text-white">
                  Desc : {data.description}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;

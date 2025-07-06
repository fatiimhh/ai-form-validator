import axios from "axios";
import { buildPrompt } from "../utils/promptBuilder";

export const fetchStructuredData = async (userInput) => {
  const prompt = buildPrompt(userInput);

  const response = await axios.post(
    "https://api.cohere.ai/v1/generate",
    {
      model: "command",
      prompt: prompt,
      max_tokens: 100,
      temperature: 0.3,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_COHERE_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const rawOutput = response.data.generations[0].text.trim();
  const jsonStart = rawOutput.indexOf("{");
  const jsonEnd = rawOutput.lastIndexOf("}") + 1;
  const cleanJson = rawOutput.substring(jsonStart, jsonEnd);

  return JSON.parse(cleanJson);
};

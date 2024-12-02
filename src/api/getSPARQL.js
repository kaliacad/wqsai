import { GoogleGenerativeAI } from "@google/generative-ai";

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('');

/**
 * SPARQL GET INFORMATION APIS
 * @param {string} promptInput 
 * @returns {string}
 */

export default async function getSPARQL(promptInput) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = promptInput;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}
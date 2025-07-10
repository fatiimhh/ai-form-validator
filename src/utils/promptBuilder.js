

export const buildPrompt = (userInput) => `
You are a helpful assistant that extracts structured data from user input.
Given this sentence: "${userInput}"
Return a JSON object with the following fields:
- subject (what the task or event is)
- date (e.g., June 20, next Thursday, tomorrow)
- time (e.g., 4PM, 18:00)
- location (e.g., Starbucks, Office)
- priority (e.g., high, medium, low)
- category (e.g., meeting, workout, study)

If any field is missing, return it as null.
`;

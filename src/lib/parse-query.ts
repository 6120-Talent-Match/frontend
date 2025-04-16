import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const systemPrompt = `
# Role and Task

You are an experienced HR and you will process a request from a department manager, which is described as natural language and about what kind of people he/she wants to hire for the coming days.

# Input Format

A description about the position and requirements about the job.

# Output Format

As an experienced HR, you will spot and summarize the most relevant skills and probable job positions that the candidates might have been in. You will return a JSON object with a list of skills and job positions, where each item is a skill or job position.

# Example

{
  "skills": ["skill1", "skill2", "skill3"],
  "experience": ["experience1", "experience2", "experience3"]
}
`;

const parseQuery = async (query: string) => {
  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        "role": "system",
        "content": [
          {
            "type": "input_text",
            "text": systemPrompt
          },
        ]
      },
      {
        "role": "user",
        "content": [
          {
            "type": "input_text",
            "text": query
          }
        ]
      },
    ],
    text: {
      "format": {
        "type": "json_schema",
        "name": "requirements",
        "strict": true,
        "schema": {
          "type": "object",
          "properties": {
            "skills": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "experience": {
              "type": "array",
              "items": {
                "type": "string"
              }
            }
          },
          "additionalProperties": false,
          "required": [
            "skills",
            "experience"
          ]
        }
      }
    },
    reasoning: {},
    tools: [],
    temperature: 0.9,
    max_output_tokens: 2048,
    top_p: 1,
    store: true
  });

  console.log(response);

  return response.output_text;
};

export default parseQuery;
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

As an experienced HR, you will summarize the most relevant skills about this position. You will return a JSON object with a list of skills, where each item is a skill.
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
            }
          },
          "additionalProperties": false,
          "required": [
            "skills"
          ]
        }
      }
    },
    reasoning: {},
    tools: [],
    temperature: 1,
    max_output_tokens: 2048,
    top_p: 1,
    store: true
  });

  return response.output_text;
};

export default parseQuery;
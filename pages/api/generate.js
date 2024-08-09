import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = "";

const generateAction = async (request, response) => {
  try {
    // Run first prompt
    console.log(`API: ${basePromptPrefix}${request.body.userInput}`);

    const completion = await openai.createChatCompletion({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `${basePromptPrefix}${request.body.userInput}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const generatedText = completion.data.choices[0].message.content;

    response.status(200).json({ output: { text: generatedText } });
  } catch (error) {
    console.error("Error:", error);
    response
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

export default generateAction;

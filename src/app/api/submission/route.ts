import { NextResponse } from "next/server";
import { addSubmission, createOrUpdateUser } from "@/lib/stores";

////////////////////////////////CORE JUDGEMENT LOGIC HERE//////////////////////////////
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const judgeModels = [
  'llama-3.3-70b-versatile',
  'gemma2-9b-it',
  'llama-3.1-8b-instant',
  'llama3-70b-8192',
  'llama-3.2-3b-preview'
]
// export async function getGroqChatCompletion(submissionJson: any, model_name: string) {
//   // Convert the submission JSON to a formatted string
//   const submissionString = JSON.stringify(submissionJson, null, 2);
//   return groq.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a expert roast judge. You are very highly critical and meagerly give points. You are provided the roasting person the roasted person and the top 10 roasts. You need to judge all the roasts on the basis of following criteria: 1.Creativity-25point  \n2.Humor-25points \n3.Originality-25points \n4.Relevance-25points \n5.How well it impersonates the roasters style-25points. \n\n!!MAKE SURE TO JUST RETURN A SINGLE INTEGER BETWEEN 0 TO 100 **AND NOTHING ELSE**!!",
//       },
//       {
//         role: "user",
//         content: submissionString,
//       },
//     ],
//     model: model_name,
//   });
// }
// async function judgeSubmission(submissionJson: any): Promise<number> {
//   const chatCompletion = await getGroqChatCompletion(submissionJson, "model_name");
//   const score = parseInt(chatCompletion?.choices[0]?.message?.content || "50");
//   console.log(chatCompletion.choices[0]?.message?.content)
//   // Ensure score is between 0 and 100
//   return Math.min(Math.max(score, 0), 100);
// }
async function getGroqChatCompletion(submissionJson: any, model_name: string) {
  try {
    const submissionString = JSON.stringify(submissionJson, null, 2);
    return await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a expert roast judge. You are very highly critical and meagerly give points. You are provided the roasting person the roasted person and the top 10 roasts. You need to judge all the roasts on the basis of following criteria: 1.Creativity-25point  \n2.Humor-25points \n3.Originality-25points \n4.Relevance-25points \n5.How well it impersonates the roasters style-25points. \n\n!!MAKE SURE TO JUST RETURN A SINGLE INTEGER BETWEEN 0 TO 100 **AND NOTHING ELSE**!!",
        },
        {
          role: "user",
          content: submissionString,
        },
      ],
      model: model_name,
    });
  } catch (error) {
    console.error(`Model ${model_name} failed:`, error);
    return null;
  }
}

async function getSingleModelScore(submissionJson: any, model_name: string): Promise<number> {
  try {
    const chatCompletion = await getGroqChatCompletion(submissionJson, model_name);
    if (!chatCompletion?.choices?.[0]?.message?.content) {
      console.log(`No valid response from model ${model_name}, using default score 50`);
      return 50.0;
    }

    const scoreText = chatCompletion.choices[0].message.content.trim();
    const score = parseInt(scoreText);

    if (isNaN(score) || score < 0 || score > 100) {
      console.log(`Invalid score from model ${model_name}: ${scoreText}, using default score 50`);
      return 50.0;
    }

    return score;
  } catch (error) {
    console.error(`Error getting score from model ${model_name}:`, error);
    return 50.0;
  }
}

async function judgeSubmission(submissionJson: any): Promise<number> {
  const scores: number[] = [];
  
  // Get scores from all models
  for (const model of judgeModels) {
    const score = await getSingleModelScore(submissionJson, model);
    console.log(`Model ${model} score: ${score}`);
    scores.push(score);
  }

  // Calculate average score
  const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  console.log('Individual scores:', scores);
  console.log('Average score:', averageScore);

  // Return rounded average
  return Math.round(averageScore);
}

///////////////////////////////////////////////////////////////////////////////////////////////



export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const notebookUrl = formData.get("notebookUrl") as string;
    const submission = formData.get("submission") as File;

    // Parse submission JSON
    const submissionText = await submission.text();
    const submissionJson = JSON.parse(submissionText);

    // Create user if not exists
    await createOrUpdateUser(name, email);

    // Get current score for submission
    const score = await judgeSubmission(submissionJson);

    // Try to add submission
    const submissionSuccess = await addSubmission(
      email,
      submissionJson,
      notebookUrl,
      score
    );

    if (!submissionSuccess) {
      return NextResponse.json(
        { error: "Failed to process submission" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      score: score,
      message: "Submission processed successfully"
    });

  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "Submission failed" },
      { status: 500 }
    );
  }
}
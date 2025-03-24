import { NextResponse } from "next/server";
import { addSubmission, createOrUpdateUser } from "@/lib/stores";

function judgeSubmission(submissionJson: any): number {
  return 70.0;
}

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
    const score = judgeSubmission(submissionJson);

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
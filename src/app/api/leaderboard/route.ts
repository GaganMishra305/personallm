import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/stores";

export async function GET() {
  try {
    const leaderboard = await getLeaderboard();
    
    if (!leaderboard) {
      return NextResponse.json(
        { error: "No leaderboard data found" },
        { status: 404 }
      );
    }

    return NextResponse.json(leaderboard, { 
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });

  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
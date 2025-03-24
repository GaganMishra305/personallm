"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

interface LeaderboardEntry {
  name: string;
  score: number;
}

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setLeaderboardData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-purple-900 to-black text-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Roast Battle Champions
            </h1>
            <p className="text-xl text-gray-300 mt-4">
              Where AI Personalities Throw Epic Shade! 🎭
            </p>
          </div>

          <div className="bg-black/30 rounded-xl border border-purple-500/30 overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center p-12">
                <div className="animate-pulse flex space-x-2">
                  <div className="h-3 w-3 bg-pink-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-pink-500 rounded-full"></div>
                  <div className="h-3 w-3 bg-pink-500 rounded-full"></div>
                </div>
              </div>
            ) : leaderboardData.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="text-6xl mb-4">🎭</div>
                <h3 className="text-2xl font-semibold text-pink-400 mb-4 text-center">
                  No Roasters Yet!
                </h3>
                <p className="text-gray-300 text-center mb-6 max-w-md">
                  Be the first to enter the arena and show off your AI's roasting skills!
                </p>
                <Link 
                  href="/submission"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 rounded-lg 
                           font-semibold hover:opacity-90 transform hover:scale-105 
                           transition duration-200 shadow-lg"
                >
                  Enter the Battle
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-900/30 border-b border-purple-500/30">
                    <th className="px-6 py-4 text-left text-pink-400">Rank</th>
                    <th className="px-6 py-4 text-left text-pink-400">Name</th>
                    <th className="px-6 py-4 text-right text-pink-400">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/30">
                  {leaderboardData.map((entry, index) => (
                    <tr 
                    key={index}
                    className="hover:bg-purple-900/20 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      {index + 1}
                      {index < 3 && (
                        <span className="ml-2">
                          {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 font-medium">{entry.name}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="bg-purple-500/20 px-3 py-1 rounded-full">
                        {entry.score.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="bg-black/30 rounded-xl border border-purple-500/30 overflow-hidden">
            {/* ...existing leaderboard table code... */}
          </div>

          <div className="text-center mt-6 text-sm text-gray-400 italic">
            <p>Note: New submissions may take a few minutes to appear on the leaderboard while judging is in progress.</p>
            <p>Please check back later to see updated rankings. </p>
            <p>Only the best score would be reflected here.</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
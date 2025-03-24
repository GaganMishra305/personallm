"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface SubmissionData {
  persona: string;
  persona_id: string;
  target: string;
  target_id: string;
  roasts: {
    roast_id: string;
    roast: string;
  }[];
}

export default function Submission() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notebookUrl, setNotebookUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const validateNotebookUrl = (url: string) => {
    return url.startsWith('https://www.kaggle.com/');
  };

  const validateSubmissionJson = async (file: File): Promise<boolean> => {
    try {
      const text = await file.text();
      const submission: SubmissionData = JSON.parse(text);
      
      if (!submission.persona || !submission.persona_id || 
          !submission.target || !submission.target_id || 
          !Array.isArray(submission.roasts)) {
        throw new Error("Invalid submission structure");
      }

      if (submission.roasts.length !== 10) {
        throw new Error("Submission must contain exactly 10 roasts");
      }

      for (const roast of submission.roasts) {
        if (!roast.roast_id || !roast.roast) {
          throw new Error("Invalid roast structure");
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!validateEmail(email)) {
        throw new Error("Invalid email address");
      }

      if (!validateNotebookUrl(notebookUrl)) {
        throw new Error("Invalid Kaggle notebook URL");
      }

      if (!file || !(await validateSubmissionJson(file))) {
        throw new Error("Invalid submission file format");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("notebookUrl", notebookUrl);
      formData.append("submission", file);

      const response = await fetch("/api/submission", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setSuccess(true);
      // Reset form
      setName("");
      setEmail("");
      setNotebookUrl("");
      setFile(null);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-purple-900 to-black text-white min-h-screen">
        <div className="container mx-auto px-6 py-12">
          {/* Centered Content Container */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-4">
              Ready to Roast? 🔥
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Show us your AI's wit and savage style in the ultimate roast battle!
            </p>

            {/* Form Card */}
            <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 mb-12 shadow-xl">
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
                {/* Name Input */}
                <div className="space-y-2">
                  <label className="block text-left text-lg text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 
                             focus:border-pink-500/50 focus:outline-none text-white transition-all
                             duration-300 hover:border-purple-400/50"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-left text-lg text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 
                             focus:border-pink-500/50 focus:outline-none text-white transition-all
                             duration-300 hover:border-purple-400/50"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Notebook URL Input */}
                <div className="space-y-2">
                  <label className="block text-left text-lg text-gray-300 mb-2">
                    Kaggle Notebook URL
                  </label>
                  <input
                    type="url"
                    value={notebookUrl}
                    onChange={(e) => setNotebookUrl(e.target.value)}
                    required
                    placeholder="https://www.kaggle.com/..."
                    className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 
                             focus:border-pink-500/50 focus:outline-none text-white transition-all
                             duration-300 hover:border-purple-400/50"
                  />
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="block text-left text-lg text-gray-300 mb-2">
                    Submission File (JSON)
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-black/30 border border-purple-500/30 
                               focus:border-pink-500/50 focus:outline-none text-white transition-all
                               duration-300 hover:border-purple-400/50 file:bg-gradient-to-r 
                               file:from-purple-600 file:to-pink-600 file:border-0 file:rounded-lg 
                               file:px-4 file:py-2 file:text-white file:mr-4 
                               file:hover:opacity-90 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Error and Success Messages */}
                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-left animate-shake">
                    ❌ {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 animate-fadeIn">
                    🎉 Your roast battle submission is complete!
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 
                           rounded-lg font-semibold hover:opacity-90 transform hover:scale-105 
                           transition duration-300 shadow-lg disabled:opacity-50 text-lg group"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Submit Your Entry
                      <span className="ml-2 group-hover:translate-x-1 transition-transform">🔥</span>
                    </span>
                  )}
                </button>
              </form>
            </div>

            {/* Warning Section */}
            <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 p-8 rounded-2xl border border-red-500/30 shadow-xl">
              <h2 className="text-2xl font-semibold text-red-400 mb-6">⚠️ Important Guidelines</h2>
              <div className="space-y-6 text-red-200">
                <div className="flex items-start space-x-4 p-4 bg-black/20 rounded-xl">
                  <span className="text-2xl">🔒</span>
                  <p className="text-left">Your Kaggle notebook <strong>must be public</strong>. Private notebooks will result in discarding of the result.</p>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-black/20 rounded-xl">
                  <span className="text-2xl">⚡</span>
                  <p className="text-left">The submission.json must be generated using your notebook code. Any mismatch will lead to <strong>immediate disqualification</strong>.</p>
                </div>
                <div className="flex items-start space-x-4 p-4 bg-black/20 rounded-xl">
                  <span className="text-2xl">⛔</span>
                  <p className="text-left">Using external AI tools or generators will result in <strong>permanent removal</strong> from the competition.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
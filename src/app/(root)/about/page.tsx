"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "@/components/SideNav";
import { useState } from "react";
import Link from "next/link";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-purple-900 to-black text-white min-h-screen">
        <div className="container mx-auto px-6 py-12 relative">
          <SideNav />
          
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-8">
              Can you finetune the best roaster?
            </h1>

            <section id="persona-selection" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-semibold text-purple-400 mb-6">1. Persona Selection & Roast Target Choice</h2>
              <div className="bg-black/30 p-6 rounded-xl border border-purple-500/30">
                <ul className="list-disc list-inside space-y-3 text-gray-300">
                  <li>Participants select a <span className="text-pink-400">real or fictional personality</span> for their LLM model to impersonate (persona)</li>
                  <li>They choose another <span className="text-pink-400">real or fictional personality</span> as the target for roasting</li>
                  <li>Choose the persona and the target from the provided dataset</li>
                </ul>
              </div>
            </section>

            <section id="submission-requirements" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-semibold text-purple-400 mb-6">2. Submission Requirements</h2>
              <div className="space-y-6">
                <div className="bg-black/30 p-6 rounded-xl border border-purple-500/30">
                  <h3 className="text-2xl font-semibold text-pink-400 mb-4">JSON File Submission</h3>
                  <ul className="list-disc list-inside space-y-3 text-gray-300">
                    <li><span className="text-purple-300">Model Persona</span> – The personality the LLM is mimicking</li>
                    <li><span className="text-purple-300">Roast Target</span> – The personality being roasted</li>
                    <li><span className="text-purple-300">Top 10 Creative and Humorous Roasts</span> – Well-crafted, engaging, and persona-accurate insults</li>
                  </ul>
                </div>

                <div className="bg-black/30 p-6 rounded-xl border border-purple-500/30">
                  <h3 className="text-2xl font-semibold text-pink-400 mb-4"> Kaggle Notebook Submission</h3>
                  <ul className="list-disc list-inside space-y-3 text-gray-300">
                    <li><span className="text-purple-300">Model development and tuning process</span> (fine-tuning, prompt engineering, dataset used)</li>
                    <li><span className="text-purple-300">Code implementation details</span> ensuring modularity, efficiency, and readability</li>
                    <li><span className="text-purple-300">Example outputs</span> demonstrating the persona's unique characteristics</li>
                    <li><span className="text-purple-300">Bonus:</span> Techniques used to bypass LLM safety restrictions</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="scoring-criteria" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-semibold text-purple-400 mb-6">3. Scoring Criteria</h2>
              <div className="bg-black/30 rounded-xl border border-purple-500/30 overflow-hidden">
                <table className="w-full">
                  <thead className="border-b border-purple-500/30">
                    <tr>
                      <th className="px-6 py-4 text-left text-pink-400">Criteria</th>
                      <th className="px-6 py-4 text-left text-pink-400">Points</th>
                      <th className="px-6 py-4 text-left text-pink-400 hidden md:table-cell">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/30">
                    <tr>
                      <td className="px-6 py-4">Creativity</td>
                      <td className="px-6 py-4">20</td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-300">Originality of the roasts</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Humor</td>
                      <td className="px-6 py-4">20</td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-300">Wit and engagement of the content</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Persona Accuracy</td>
                      <td className="px-6 py-4">20</td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-300">Authenticity of personality mimicry</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Savageness</td>
                      <td className="px-6 py-4">20</td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-300">Impact while maintaining appropriateness</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Code Quality</td>
                      <td className="px-6 py-4">20</td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-300">Implementation efficiency and readability</td>
                    </tr>
                    <tr className="bg-purple-900/20">
                      <td className="px-6 py-4 text-pink-400">Bonus Points</td>
                      <td className="px-6 py-4 text-pink-400">30</td>
                      <td className="px-6 py-4 hidden md:table-cell text-pink-400">Successful bypass of LLM safety filters</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="competition-rules" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-semibold text-purple-400 mb-6">4. Competition Rules</h2>
              <div className="bg-black/30 p-6 rounded-xl border border-purple-500/30">
                <ul className="list-disc list-inside space-y-3 text-gray-300">
                  <li><span className="text-purple-300">Solo Participation</span> – Only one participant per team</li>
                  <li><span className="text-purple-300">Submission Limit</span> – Maximum 5 submissions per day</li>
                  <li><span className="text-purple-300">Final Evaluation</span> – Top 3 highest-scoring submissions considered</li>
                  <li><span className="text-purple-300">Ethical Boundaries</span> – Hate speech or extreme defamation leads to disqualification</li>
                  <li><span className="text-purple-300">LLM Judge's Decision is Final</span> – No appeals entertained</li>
                </ul>
              </div>
            </section>

            <section id="technical-requirements" className="mb-16 scroll-mt-20">
              <h2 className="text-3xl font-semibold text-purple-400 mb-6">5. Technical Requirements</h2>
              <div className="bg-black/30 p-6 rounded-xl border border-purple-500/30">
                <ul className="list-disc list-inside space-y-3 text-gray-300">
                  <li>Use <span className="text-purple-300">any finetuning framework</span> with an LLM (GPT-4, LLaMA, or Mistral)</li>
                  <li>Submit code via <span className="text-purple-300">Kaggle Notebook</span></li>
                  <li>Ensure code is <span className="text-purple-300">efficient, modular, and well-documented</span></li>
                </ul>
              </div>
            </section>

        <section id="resources" className="mb-16 scroll-mt-20">
        <h2 className="text-3xl font-semibold text-purple-400 mb-6">6. Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            href="/files/personas_dataset.json" 
            target="_blank"
            className="bg-black/30 p-6 rounded-xl border border-purple-500/30 hover:border-pink-500/50 
                     hover:bg-purple-900/20 transition-all duration-300 group"
          >
            <h3 className="text-xl font-semibold text-pink-400 mb-2 flex items-center">
              Personas Dataset
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h3>
            <p className="text-gray-300">View the list of personalities</p>
          </Link>
          
          <Link 
            href="/files/sample_submission.json" 
            target="_blank"
            className="bg-black/30 p-6 rounded-xl border border-purple-500/30 hover:border-pink-500/50 
                     hover:bg-purple-900/20 transition-all duration-300 group"
          >
            <h3 className="text-xl font-semibold text-pink-400 mb-2 flex items-center">
              Sample Submission
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h3>
            <p className="text-gray-300">See example submission format</p>
          </Link>

          <Link 
            href="https://www.kaggle.com/code/beforeikillyou/sample-submission-for-personallm" 
            target="_blank"
            className="bg-black/30 p-6 rounded-xl border border-purple-500/30 hover:border-pink-500/50 
                     hover:bg-purple-900/20 transition-all duration-300 group"
          >
            <h3 className="text-xl font-semibold text-pink-400 mb-2 flex items-center">
              Starter Notebook
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </h3>
            <p className="text-gray-300">View our Kaggle notebook template</p>
          </Link>
        </div>
        </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
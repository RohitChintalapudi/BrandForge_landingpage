import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileCheck,
  Video,
  Trophy,
  Shield,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Send,
  Lock,
  Star,
  Play,
  Layers,
  Award,
  Sparkle,
} from "lucide-react";
import { REGISTER_URL } from "../config/appUrls.js";

const WORKFLOW_STEPS = [
  {
    id: "step-1",
    stepNumber: "01",
    tabTitle: "01 · Brief Creation",
    badge: "Step 1: Campaign Creation",
    title: "Post Targeted Briefs & Lock Prize Escrow",
    description:
      "Brands specify exact hooks, talking points, target aspect ratios, and deposit escrow-guaranteed prize pools (₹5,000 to ₹1,00,000+). Verified creators discover briefs tailored to their exact niche within seconds.",
    color: "#FAF5FF",
    borderTopColor: "#7C3AED",
    accentColor: "#7C3AED",
    cardBg: "from-[#faf5ff] to-[#f3e8ff]",
    features: [
      "Custom hook prompts & visual guidelines",
      "100% Escrow-protected bounty pools",
      "Instant matching with verified niche creators",
    ],
    visualType: "brief",
  },
  {
    id: "step-2",
    stepNumber: "02",
    tabTitle: "02 · Video Pitching",
    badge: "Step 2: Submissions & Review",
    title: "Receive High-Converting UGC Video Pitches",
    description:
      "Creators submit uncompressed Google Drive, YouTube unlisted, or Loom video concepts without clunky upload limits. Brands stream and review submissions in real-time with automated rating tools.",
    color: "#EEF2FF",
    borderTopColor: "#4F46E5",
    accentColor: "#4F46E5",
    cardBg: "from-[#eef2ff] to-[#e0e7ff]",
    features: [
      "Frictionless public link submissions",
      "Stream raw uncompressed 4K video clips",
      "Side-by-side pitch comparison & scoring",
    ],
    visualType: "pitch",
  },
  {
    id: "step-3",
    stepNumber: "03",
    tabTitle: "03 · Crown & Payout",
    badge: "Step 3: Instant Settlement",
    title: "Crown Winning Creators with Instant Payout",
    description:
      "Brands crown winning video concepts in 1-click. Escrow funds release directly into the creator's bank account within 24 hours, while the brand gains immediate commercial licensing and raw ad-ready assets.",
    color: "#FFFBEB",
    borderTopColor: "#D97706",
    accentColor: "#D97706",
    cardBg: "from-[#fffbeb] to-[#fef3c7]",
    features: [
      "1-Click automated winner selection",
      "Instant 24-hour direct creator payouts",
      "Full commercial usage rights & raw downloads",
    ],
    visualType: "payout",
  },
];

function RenderCardVisual({ type }) {
  if (type === "brief") {
    return (
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-purple-200 shadow-[0_4px_20px_rgba(124,58,237,0.06)] flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              🏢
            </span>
            <div>
              <div className="text-xs font-black text-slate-900">Aura Botanics</div>
              <div className="text-[10px] text-slate-400">Campaign Brief #BF-2026</div>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200 flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" /> Escrow Locked
          </span>
        </div>

        <div className="py-2.5 space-y-2">
          <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100">
            <span className="text-[9px] font-bold text-purple-900 uppercase block mb-0.5">Required Hook Format</span>
            <span className="text-[11px] font-semibold text-slate-800 line-clamp-1">"3-Second Problem Hook: Why Your Skin Feels Dull in Summer"</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-bold uppercase block">Aspect Ratio</span>
              <span className="text-xs font-black text-slate-900">9:16 (Vertical)</span>
            </div>
            <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
              <span className="text-[9px] text-slate-400 font-bold uppercase block">Deliverables</span>
              <span className="text-xs font-black text-slate-900">2 Video Concepts</span>
            </div>
          </div>
        </div>

        <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between bg-purple-50/40 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3 sm:p-3.5 rounded-b-2xl">
          <div>
            <span className="text-[9px] text-slate-500 font-bold uppercase block">Guaranteed Prize Pool</span>
            <span className="text-base sm:text-lg font-black text-purple-700">₹30,000</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Verified Brief</span>
          </span>
        </div>
      </div>
    );
  }

  if (type === "pitch") {
    return (
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-indigo-200 shadow-[0_4px_20px_rgba(99,102,241,0.06)] flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              🎨
            </span>
            <div>
              <div className="text-xs font-black text-slate-900">Aarav Sharma</div>
              <div className="text-[10px] text-slate-400">@aarav_creates • Level 2 UGC</div>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> 4.9 Rating
          </span>
        </div>

        {/* Video Player Preview Mockup */}
        <div className="my-1.5 p-3 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-indigo-200 mb-1.5">
            <span className="font-mono text-[9px]">📁 Google Drive 4K Raw</span>
            <span className="bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded text-[9px] font-bold">Ready</span>
          </div>
          <div className="flex items-center gap-2.5 py-0.5">
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0">
              <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white line-clamp-1">"Vitamin C Texture & AM Routine"</div>
              <div className="text-[9px] text-slate-300">Duration: 0:34 • Resolution: 2160x3840</div>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
          <span className="text-slate-500 text-[10px]">Submitted: 2h ago</span>
          <span className="inline-flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
            <CheckCircle2 className="w-3 h-3 text-indigo-600" />
            <span>HQ Link Verified</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-amber-200 shadow-[0_4px_20px_rgba(245,158,11,0.06)] flex flex-col justify-between h-full relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            🏆
          </span>
          <div>
            <div className="text-xs font-black text-slate-900">Winner Crowned</div>
            <div className="text-[10px] text-emerald-600 font-bold">Instant Payout Released</div>
          </div>
        </div>
        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
          ₹35,000 Paid
        </span>
      </div>

      <div className="py-2 space-y-2">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div>
              <span className="text-[9px] text-amber-900 font-bold uppercase block">Awarded Creator</span>
              <span className="text-[11px] font-black text-slate-900 line-clamp-1">Priya Menon (@priyaugestudio)</span>
            </div>
          </div>
          <span className="text-xs font-black text-amber-700">👑 Winner</span>
        </div>

        <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-slate-600">Full Commercial Ad License:</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">Granted ✓</span>
        </div>
      </div>

      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between bg-amber-50/40 -mx-4 -mb-4 sm:-mx-5 sm:-mb-5 p-3 sm:p-3.5 rounded-b-2xl">
        <span className="text-[10px] text-slate-600 font-medium">Bank settlement status:</span>
        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" />
          <span>Direct Payout Complete</span>
        </span>
      </div>
    </div>
  );
}

export function ScrollStackWorkflow() {
  return (
    <section id="how-it-works" className="py-12 sm:py-16 relative bg-[#fafbfc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[10px] font-bold uppercase tracking-wider text-purple-800 mb-2">
            <Layers className="w-3 h-3 text-purple-600" />
            <span>Interactive 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e1b4b] tracking-tight">
            How BrandForge Operates
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            A seamless, escrow-protected collaboration engine connecting brands with elite UGC creators.
          </p>
        </div>

        {/* Stacking Card Deck Container */}
        <div className="space-y-6 sm:space-y-8 relative">
          {WORKFLOW_STEPS.map((step, index) => {
            // Calculate sticky top offset so cards stack neatly
            const topOffset = 80 + index * 24; // 80px, 104px, 128px

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  top: `${topOffset}px`,
                  zIndex: index + 10,
                }}
                className="sticky rounded-2xl sm:rounded-3xl border border-purple-200/90 shadow-[0_10px_35px_-5px_rgba(124,58,237,0.1),0_4px_12px_rgba(0,0,0,0.03)] bg-white overflow-hidden transition-shadow"
              >
                {/* Top Tab Strip */}
                <div
                  style={{ backgroundColor: step.color }}
                  className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-purple-100/80"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: step.accentColor }}
                    />
                    <span className="text-xs font-bold text-[#1e1b4b]">
                      {step.tabTitle}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-white/80 px-2.5 py-0.5 rounded-full border border-purple-200">
                    {step.badge}
                  </span>
                </div>

                {/* Card Content Grid */}
                <div
                  style={{ backgroundColor: step.color }}
                  className="p-5 sm:p-8 grid md:grid-cols-[1.2fr_0.8fr] gap-6 items-center"
                >
                  {/* Left Column Text Details */}
                  <div className="flex flex-col items-start gap-3">
                    <h3 className="m-0 text-xl sm:text-2xl font-black text-[#1e1b4b] tracking-tight leading-tight">
                      {step.title}
                    </h3>

                    <p className="m-0 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="mt-1 space-y-1.5 w-full">
                      {step.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3">
                      <a
                        href={REGISTER_URL}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-xs font-bold shadow-xs hover:shadow-purple-500/30 transition-all cursor-pointer"
                      >
                        <span>Get Started with {step.tabTitle.split("·")[1]}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column Visual Graphic */}
                  <div className="w-full h-[17rem] sm:h-[19rem]">
                    <RenderCardVisual type={step.visualType} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ScrollStackWorkflow;

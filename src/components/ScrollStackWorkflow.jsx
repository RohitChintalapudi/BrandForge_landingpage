import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Lenis from "lenis";
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
} from "lucide-react";
import { REGISTER_URL } from "../config/appUrls.js";

const WORKFLOW_STEPS = [
  {
    id: 1,
    tabTitle: "01 · Brief Initiation",
    stepNumber: "01",
    badge: "Step 1: Campaign Creation",
    title: "Post Targeted Briefs & Lock Prize Escrow",
    description:
      "Brands define hooks, talking points, target aspect ratios, and deposit escrow-guaranteed prize pools (₹5,000 to ₹1,00,000+). Verified creators discover briefs tailored to their exact niche within seconds.",
    color: "#FAF5FF",
    accentColor: "#7C3AED",
    textColor: "#1E1B4B",
    features: [
      "Custom hook prompts & visual guidelines",
      "100% Escrow protected bounty pools",
      "Instant matching with verified creators",
    ],
    visualType: "brief",
  },
  {
    id: 2,
    tabTitle: "02 · Video Pitching",
    stepNumber: "02",
    badge: "Step 2: Submissions & Review",
    title: "Receive High-Converting UGC Video Pitches",
    description:
      "Creators submit uncompressed Google Drive, YouTube unlisted, or Loom video concepts without clunky upload limits. Brands stream and review submissions in real-time with automated rating tools.",
    color: "#EEF2FF",
    accentColor: "#4F46E5",
    textColor: "#1E1B4B",
    features: [
      "Frictionless public link submissions",
      "Stream raw uncompressed 4K video clips",
      "Side-by-side pitch comparison & scoring",
    ],
    visualType: "pitch",
  },
  {
    id: 3,
    tabTitle: "03 · Crown & Reward",
    stepNumber: "03",
    badge: "Step 3: Instant Settlement",
    title: "Crown Winning Creators with Instant Payout",
    description:
      "Brands crown winning video concepts in 1-click. Escrow funds release directly into the creator's bank account within 24 hours, while the brand gains immediate commercial licensing and raw ad-ready assets.",
    color: "#FFFBEB",
    accentColor: "#D97706",
    textColor: "#1E1B4B",
    features: [
      "1-Click automated winner selection",
      "Instant 24-hour direct creator payouts",
      "Full commercial usage rights & raw downloads",
    ],
    visualType: "payout",
  },
];

function buildCardKeyframes(index, totalCards) {
  const steps = [];
  const yValues = [];
  const scaleValues = [];
  const numTransitions = Math.max(totalCards - 1, 1);

  for (let step = 0; step <= numTransitions; step++) {
    const progress = step / numTransitions;
    steps.push(progress);

    if (step < index) {
      yValues.push(700);
      scaleValues.push(1);
    } else if (step === index) {
      yValues.push(0);
      scaleValues.push(1);
    } else {
      const stackDepth = step - index;
      yValues.push(-stackDepth * 42);
      scaleValues.push(1 - stackDepth * 0.04);
    }
  }

  if (index === 0) {
    return {
      steps,
      y: yValues,
      scale: scaleValues,
    };
  }

  const entryStart = (index - 1) / numTransitions;
  const entryEnd = index / numTransitions;
  const fullSteps = [];
  const fullY = [];
  const fullScale = [];

  for (let i = 0; i < steps.length; i++) {
    if (steps[i] < entryStart) {
      fullSteps.push(steps[i]);
      fullY.push(700);
      fullScale.push(1);
    }
  }

  fullSteps.push(entryStart);
  fullY.push(700);
  fullScale.push(1);

  for (let i = 0; i < steps.length; i++) {
    if (steps[i] >= entryEnd) {
      fullSteps.push(steps[i]);
      fullY.push(yValues[i]);
      fullScale.push(scaleValues[i]);
    }
  }

  return {
    steps: fullSteps,
    y: fullY,
    scale: fullScale,
  };
}

function RenderCardVisual({ type }) {
  if (type === "brief") {
    return (
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-purple-200/90 shadow-[0_8px_30px_rgba(124,58,237,0.08)] flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              🏢
            </span>
            <div>
              <div className="text-xs font-black text-slate-900">Aura Botanics</div>
              <div className="text-[10px] text-slate-400">Campaign Brief #BF-2026</div>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
            Escrow Locked 🔒
          </span>
        </div>

        <div className="py-3.5 space-y-2.5">
          <div className="p-2.5 rounded-xl bg-purple-50/50 border border-purple-100">
            <span className="text-[10px] font-bold text-purple-900 uppercase block mb-0.5">Required Hook Format</span>
            <span className="text-xs font-semibold text-slate-800">"3-Second Problem Hook: Why Your Skin Feels Dull in Summer"</span>
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

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-purple-50/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
          <div>
            <span className="text-[9px] text-slate-500 font-bold uppercase block">Guaranteed Prize Pool</span>
            <span className="text-lg font-black text-purple-700">₹30,000</span>
          </div>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Verified Brief</span>
          </span>
        </div>
      </div>
    );
  }

  if (type === "pitch") {
    return (
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-indigo-200/90 shadow-[0_8px_30px_rgba(99,102,241,0.08)] flex flex-col justify-between h-full relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              🎨
            </span>
            <div>
              <div className="text-xs font-black text-slate-900">Aarav Sharma</div>
              <div className="text-[10px] text-slate-400">@aarav_creates • Level 2 UGC</div>
            </div>
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200 flex items-center gap-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> 4.9 Rating
          </span>
        </div>

        {/* Video Player Preview Mockup */}
        <div className="my-2 p-3 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-indigo-200 mb-2">
            <span className="font-mono">📁 Google Drive Uncompressed 4K</span>
            <span className="bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded font-bold">Ready</span>
          </div>
          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-white translate-x-0.5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">"Vitamin C Texture & AM Routine"</div>
              <div className="text-[10px] text-slate-300">Duration: 0:34 • Resolution: 2160x3840</div>
            </div>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-between text-xs font-bold text-indigo-700">
          <span className="text-slate-500 text-[11px]">Submission Time: 2h ago</span>
          <span className="inline-flex items-center gap-1 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            <span>HQ Link Checked</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-amber-200/90 shadow-[0_8px_30px_rgba(245,158,11,0.08)] flex flex-col justify-between h-full relative overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            🏆
          </span>
          <div>
            <div className="text-xs font-black text-slate-900">Campaign Winner Crowned</div>
            <div className="text-[10px] text-emerald-600 font-bold">Payout Released Automatically</div>
          </div>
        </div>
        <span className="text-[10px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
          ₹35,000 Paid
        </span>
      </div>

      <div className="py-3 space-y-2">
        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-500" />
            <div>
              <span className="text-[10px] text-amber-900 font-bold uppercase block">Awarded Creator</span>
              <span className="text-xs font-black text-slate-900">Priya Menon (@priyaugestudio)</span>
            </div>
          </div>
          <span className="text-sm font-black text-amber-700">👑 Winner</span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-[11px]">
          <span className="text-slate-600">Full Commercial Ad License:</span>
          <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Granted ✓</span>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-100 flex items-center justify-between bg-amber-50/40 -mx-5 -mb-5 p-4 rounded-b-2xl">
        <span className="text-[11px] text-slate-600 font-medium">Bank settlement status:</span>
        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Direct Payout Complete</span>
        </span>
      </div>
    </div>
  );
}

function AnimatedWorkflowCard({
  project,
  index,
  totalCards,
  smoothProgress,
}) {
  const keyframes = buildCardKeyframes(index, totalCards);
  const y = useTransform(smoothProgress, keyframes.steps, keyframes.y);
  const scale = useTransform(smoothProgress, keyframes.steps, keyframes.scale);

  return (
    <motion.div
      style={{
        y,
        scale,
        zIndex: 700 + index * 10,
        transformOrigin: "center top",
        willChange: "transform",
        backfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
      }}
      className="absolute inset-x-0 top-0 w-full select-none"
    >
      <div className="relative box-border w-full pt-12 sm:pt-14">
        {/* Top Tab Pill Header */}
        <div
          style={{ backgroundColor: project.color }}
          className="absolute left-0 top-0 flex h-12 w-48 sm:w-64 items-center rounded-t-2xl px-4 sm:px-6 text-xs sm:text-sm font-bold tracking-tight text-[#1e1b4b] border-t border-l border-r border-purple-200/80 shadow-[inset_0_-1px_0_rgba(0,0,0,0.04)]"
        >
          <span className="truncate flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
            <span>{project.tabTitle}</span>
          </span>
        </div>

        {/* Main Card Container */}
        <div
          style={{ backgroundColor: project.color }}
          className="relative grid min-h-[26rem] sm:min-h-[29rem] grid-cols-1 items-center gap-6 overflow-hidden rounded-b-2xl rounded-tr-2xl p-6 sm:p-8 border border-purple-200/90 shadow-[0_12px_36px_-6px_rgba(124,58,237,0.12),inset_0_-2px_4px_-2px_rgba(0,0,0,0.06)] md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-8"
        >
          {/* Left Text Column */}
          <div className="z-10 flex flex-col items-start gap-3.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-purple-200/80 text-[10px] font-bold uppercase tracking-wider text-purple-900 shadow-xs">
              <span className="font-black text-purple-700">{project.stepNumber}</span>
              <span>•</span>
              <span>{project.badge}</span>
            </div>

            <h3 className="m-0 text-xl sm:text-2xl lg:text-3xl font-black leading-tight tracking-tight text-[#1e1b4b]">
              {project.title}
            </h3>

            <p className="m-0 text-xs sm:text-sm md:text-base font-normal leading-relaxed text-slate-600">
              {project.description}
            </p>

            <div className="mt-2 space-y-2 w-full">
              {project.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <a
                href={REGISTER_URL}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-xs font-bold shadow-xs hover:shadow-purple-500/30 transition-all cursor-pointer"
              >
                <span>Experience {project.tabTitle.split("·")[1]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Visual Graphic Column */}
          <div className="relative w-full h-[18rem] sm:h-[21rem]">
            <RenderCardVisual type={project.visualType} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ScrollStackWorkflow({
  className = "",
  enableLenis = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!enableLenis) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    let animationFrameId = 0;
    const raf = (time) => {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    };
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [enableLenis]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.15,
    restDelta: 0.0001,
  });

  return (
    <div id="how-it-works" className={`w-full py-12 sm:py-16 relative bg-[#fafbfc] ${className}`}>
      {/* Section Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[10px] font-bold uppercase tracking-wider text-purple-800 mb-2">
          <Layers className="w-3 h-3 text-purple-600" />
          <span>Interactive 3-Step Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e1b4b] tracking-tight">
          How BrandForge Operates
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          A seamless, escrow-protected collaboration engine connecting brands with elite UGC creators.
        </p>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-semibold text-purple-700">
          <span>Scroll down to experience each step</span>
          <motion.svg
            animate={{ y: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
            className="h-4 w-4 text-purple-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 4.75v13.5M6.75 13.75l5.25 5.5 5.25-5.5" />
          </motion.svg>
        </div>
      </div>

      {/* Sticky Stacking Cards Section */}
      <section
        ref={containerRef}
        aria-label="Stacked BrandForge Workflow"
        className="relative w-full"
        style={{ height: `${WORKFLOW_STEPS.length * 95}vh` }}
      >
        <div className="sticky top-20 sm:top-24 grid min-h-[30rem] w-full place-items-center px-3 sm:px-6">
          <div className="relative h-[32rem] min-h-[32rem] w-full max-w-5xl overflow-visible">
            {WORKFLOW_STEPS.map((stepItem, index) => (
              <AnimatedWorkflowCard
                key={stepItem.id}
                project={stepItem}
                index={index}
                totalCards={WORKFLOW_STEPS.length}
                smoothProgress={smoothProgress}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ScrollStackWorkflow;

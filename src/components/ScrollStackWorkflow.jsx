import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Lock,
  Play,
  Trophy,
  CheckCircle2,
  Star,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileCheck,
  Video,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { REGISTER_URL } from "../config/appUrls.js";

export function sliderStep(cardWidth, overlapFactor, cardGap) {
  return Math.round(cardWidth - cardWidth * overlapFactor + cardGap);
}

export function snapSliderIndex(offsetX, step, velocity, total) {
  if (total <= 1) return 0;
  let index = -offsetX / step;
  if (velocity < -300) index = Math.ceil(index);
  else if (velocity > 300) index = Math.floor(index);
  else index = Math.round(index);
  return Math.max(0, Math.min(index, total - 1));
}

export function cardLeave(diff) {
  const t = Math.min(1, Math.max(0, -diff));
  return {
    scale: 1 - t * 0.08,
    y: t * 16,
    opacity: 1 - t * 0.15,
  };
}

const WORKFLOW_CARDS = [
  {
    id: "step-1",
    stepNumber: "01",
    tabTitle: "01 · Brief Launch",
    role: "Brand Campaign Initiation",
    title: "Post Targeted Briefs & Lock Prize Escrow",
    description:
      "Brands define hooks, talking points, target aspect ratios, and deposit escrow-guaranteed prize pools (₹5,000 to ₹1,00,000+).",
    tag: "Escrow Locked 🔒",
    highlightLabel: "Prize Escrow",
    highlightValue: "₹30,000 Pool",
    accentBg: "bg-purple-50",
    accentText: "text-purple-700",
    accentBorder: "border-purple-200",
    gradientBar: "from-[#8b5cf6] to-[#7c3aed]",
    features: [
      "Custom hook prompts & visual guidelines",
      "100% Escrow-protected prize guarantee",
      "Instant matching with verified creators",
    ],
    mockupType: "brief",
  },
  {
    id: "step-2",
    stepNumber: "02",
    tabTitle: "02 · Video Pitch",
    role: "Creator Video Pitching",
    title: "Stream Raw 4K Video Pitches in Real-Time",
    description:
      "Creators submit uncompressed Google Drive, Loom, or YouTube video concepts. Brands review high-res videos in a side-by-side dashboard.",
    tag: "4K Raw Playback 🎥",
    highlightLabel: "Creator Rating",
    highlightValue: "4.9/5 ⭐ (Level 2)",
    accentBg: "bg-indigo-50",
    accentText: "text-indigo-700",
    accentBorder: "border-indigo-200",
    gradientBar: "from-[#6366f1] to-[#4f46e5]",
    features: [
      "Frictionless Drive & YouTube submissions",
      "Stream raw uncompressed 4K video clips",
      "Side-by-side pitch scoring & review",
    ],
    mockupType: "pitch",
  },
  {
    id: "step-3",
    stepNumber: "03",
    tabTitle: "03 · Crown & Payout",
    role: "Instant Settlement",
    title: "1-Click Winner Selection & Direct 24h Payout",
    description:
      "Brands crown winning video concepts in 1-click. Creators get direct bank payouts within 24 hours, and brands unlock full commercial ad rights.",
    tag: "Winner Crowned 👑",
    highlightLabel: "Direct Payout",
    highlightValue: "₹35,000 Released",
    accentBg: "bg-amber-50",
    accentText: "text-amber-800",
    accentBorder: "border-amber-200",
    gradientBar: "from-[#f59e0b] to-[#d97706]",
    features: [
      "Automated 1-click winner selection",
      "Instant direct creator bank transfers",
      "Full commercial usage rights certificate",
    ],
    mockupType: "payout",
  },
  {
    id: "step-4",
    stepNumber: "04",
    tabTitle: "04 · Scale Ad ROAS",
    role: "Ad Deployment",
    title: "Deploy Winning Creatives into Meta & TikTok Ads",
    description:
      "Plug proven user-generated content directly into paid ad pipelines. Achieve lower CPMs, higher CTRs, and scale high-converting organic reach.",
    tag: "Ad Scale Ready 🚀",
    highlightLabel: "Average Return",
    highlightValue: "3.4x ROAS",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
    accentBorder: "border-emerald-200",
    gradientBar: "from-[#10b981] to-[#059669]",
    features: [
      "Clean unwatermarked raw video masters",
      "High CTR ad hooks for Meta & TikTok",
      "Zero recurring agency retainer fees",
    ],
    mockupType: "growth",
  },
];

function CardMockup({ type }) {
  if (type === "brief") {
    return (
      <div className="rounded-xl p-3.5 bg-gradient-to-br from-purple-50/80 via-white to-purple-50/50 border border-purple-100 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1e1b4b] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
              🏢
            </span>
            <span>Aura Botanics Summer Reel</span>
          </span>
          <span className="text-[10px] font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
            Escrow Locked
          </span>
        </div>

        <div className="p-2 rounded-lg bg-white border border-purple-100 text-[11px] space-y-1">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Hook Prompt</div>
          <div className="text-slate-800 font-semibold line-clamp-1">
            "3-Second Hook: Why Your Skin Feels Dehydrated in Summer"
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
          <div className="p-1.5 rounded-lg bg-white border border-purple-100">
            <span className="text-slate-400 block font-bold">Aspect Ratio</span>
            <span className="font-black text-slate-900">9:16 Vertical</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white border border-purple-100">
            <span className="text-slate-400 block font-bold">Prize Bounty</span>
            <span className="font-black text-purple-700">₹30,000</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "pitch") {
    return (
      <div className="rounded-xl p-3.5 bg-gradient-to-br from-indigo-50/80 via-white to-indigo-50/50 border border-indigo-100 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1e1b4b] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
              🎨
            </span>
            <span>Aarav Sharma (@aarav_creates)</span>
          </span>
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> 4.9
          </span>
        </div>

        {/* Video Player Mockup Strip */}
        <div className="p-2.5 rounded-lg bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center gap-2.5 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Play className="w-3 h-3 fill-white translate-x-0.2" />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="text-[11px] font-bold text-white truncate">Vitamin C AM Routine Hook.mp4</div>
            <div className="text-[9px] text-indigo-200">Google Drive 4K Raw • 0:34s</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] px-1 font-semibold text-slate-500">
          <span>Format: Uncompressed 4K</span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ready for Review
          </span>
        </div>
      </div>
    );
  }

  if (type === "payout") {
    return (
      <div className="rounded-xl p-3.5 bg-gradient-to-br from-amber-50/80 via-white to-amber-50/50 border border-amber-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1e1b4b] flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
              👑
            </span>
            <span>Winner Crowned</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
            Paid in 24h ✓
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-white border border-amber-200 flex items-center justify-between text-left">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block">Crowned Creator</span>
              <span className="text-xs font-bold text-slate-900">Priya Menon (@priyaugestudio)</span>
            </div>
          </div>
          <span className="text-xs font-black text-emerald-600">₹35,000</span>
        </div>

        <div className="flex items-center justify-between text-[10px] px-1 font-semibold text-slate-600">
          <span>Full Commercial License:</span>
          <span className="text-emerald-700 font-bold">100% Granted</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-3.5 bg-gradient-to-br from-emerald-50/80 via-white to-emerald-50/50 border border-emerald-200 shadow-xs space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-[#1e1b4b] flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
            🚀
          </span>
          <span>Meta & TikTok Ad Scaling</span>
        </span>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
          3.4x ROAS
        </span>
      </div>

      <div className="p-2.5 rounded-lg bg-white border border-emerald-100 grid grid-cols-2 gap-2 text-center text-[10px]">
        <div>
          <span className="text-slate-400 block font-bold">Average CTR</span>
          <span className="text-sm font-black text-emerald-600">+148%</span>
        </div>
        <div>
          <span className="text-slate-400 block font-bold">Cost Per Click</span>
          <span className="text-sm font-black text-purple-700">-42% CPA</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] px-1 font-semibold text-slate-600">
        <span>Usage Rights:</span>
        <span className="text-emerald-700 font-bold">Perpetual Commercial</span>
      </div>
    </div>
  );
}

export function WorkflowCard({ card, isActive }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white border border-purple-200/90 shadow-[0_12px_32px_-6px_rgba(124,58,237,0.1),0_4px_16px_rgba(0,0,0,0.03)] p-5 sm:p-6 text-slate-900 select-none transition-all duration-300 hover:border-purple-300 group">
      {/* Top Accent Gradient Bar */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradientBar}`} />

      {/* Top Header Pill & Step Number */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-[10px] font-bold tracking-wide text-purple-900">
            <span className="font-black text-purple-700">{card.stepNumber}</span>
            <span>•</span>
            <span>{card.tabTitle}</span>
          </div>

          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${card.accentBg} ${card.accentText} border ${card.accentBorder}`}>
            {card.tag}
          </span>
        </div>

        {/* Step Title & Description */}
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
          {card.role}
        </div>
        <h3 className="text-base sm:text-lg font-black leading-snug tracking-tight text-[#1e1b4b] mb-1.5 group-hover:text-purple-700 transition-colors">
          {card.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
          {card.description}
        </p>
      </div>

      {/* Middle Interactive Mockup Component */}
      <div className="my-3">
        <CardMockup type={card.mockupType} />
      </div>

      {/* Feature Bullet Points */}
      <div className="space-y-1 my-1">
        {card.features.slice(0, 2).map((feat, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{feat}</span>
          </div>
        ))}
      </div>

      {/* Bottom Card Footer */}
      <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[9px] text-slate-400 uppercase font-bold block">{card.highlightLabel}</span>
          <span className="text-xs sm:text-sm font-black text-purple-800">{card.highlightValue}</span>
        </div>

        <a
          href={REGISTER_URL}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-xs font-bold shadow-xs hover:shadow-purple-500/30 transition-all cursor-pointer"
        >
          <span>Explore</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export function ScrollStackWorkflow({
  cardWidth = 350,
  cardHeight = 460,
  overlapFactor = 0.04,
  cardGap = 18,
  autoLoop = true,
  loopInterval = 3400,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const total = WORKFLOW_CARDS.length;
  const step = sliderStep(cardWidth, overlapFactor, cardGap);

  const dragRef = useRef({
    down: false,
    startX: 0,
    origin: 0,
    lastX: 0,
    lastT: 0,
    velocity: 0,
    moved: 0,
  });

  const apply = (x, animate) => {
    offsetRef.current = x;
    const track = trackRef.current;
    if (!track) return;
    const transition = animate
      ? "transform 400ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    track.style.transition = transition;
    track.style.setProperty("--ox", `${x}px`);
    const activeExact = -x / step;

    for (let i = 0; i < track.children.length; i++) {
      const card = track.children[i];
      const diff = i - activeExact;
      const leave = cardLeave(diff);
      card.style.transition = transition;
      card.style.zIndex = String(i + 1);
      card.style.setProperty("--y", `${leave.y}px`);
      card.style.setProperty("--s", String(leave.scale));
      card.style.setProperty("--op", String(leave.opacity));
    }
  };

  const goTo = (index) => {
    let next = index;
    if (next < 0) next = total - 1;
    if (next >= total) next = 0;

    setActiveIndex(next);
    apply(-next * step, true);
  };

  useLayoutEffect(() => {
    apply(offsetRef.current, false);
  }, [cardWidth, cardHeight, overlapFactor, cardGap, total]);

  // Autoplay carousel loop with Pause on Hover
  useEffect(() => {
    if (!autoLoop || isHovered) return;
    const timer = setInterval(() => {
      if (!dragRef.current.down) {
        goTo((activeIndex + 1) % total);
      }
    }, loopInterval);

    return () => clearInterval(timer);
  }, [activeIndex, autoLoop, isHovered, loopInterval, total]);

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const drag = dragRef.current;
    drag.down = true;
    drag.startX = e.clientX;
    drag.origin = offsetRef.current;
    drag.lastX = e.clientX;
    drag.lastT = performance.now();
    drag.velocity = 0;
    drag.moved = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag.down) return;
    const now = performance.now();
    const dt = Math.max(1, now - drag.lastT);
    drag.velocity = ((e.clientX - drag.lastX) / dt) * 1000;
    drag.lastX = e.clientX;
    drag.lastT = now;
    drag.moved = Math.max(drag.moved, Math.abs(e.clientX - drag.startX));
    const x = drag.origin + (e.clientX - drag.startX);
    apply(x, false);
    const predicted = Math.max(0, Math.min(Math.round(-x / step), total - 1));
    if (predicted !== activeIndex) {
      setActiveIndex(predicted);
    }
  };

  const onPointerUp = (e) => {
    const drag = dragRef.current;
    if (!drag.down) return;
    drag.down = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    goTo(snapSliderIndex(offsetRef.current, step, drag.velocity, total));
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-16 relative bg-[#fafbfc] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[10px] font-bold uppercase tracking-wider text-purple-800 mb-2">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Interactive Workflow Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e1b4b] tracking-tight">
              How BrandForge Operates
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
              Hover over any card to pause. Drag, swipe, or click through to explore the automated campaign flow.
            </p>
          </div>

          {/* Arrow Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              aria-label="Previous step"
              onClick={() => goTo(activeIndex - 1)}
              className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-white border border-purple-200 text-[#1e1b4b] shadow-xs hover:border-purple-400 hover:bg-purple-50 transition active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-4 text-purple-900" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-label="Next step"
              onClick={() => goTo(activeIndex + 1)}
              className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-xs hover:shadow-purple-500/30 transition active:scale-95 cursor-pointer border-none"
            >
              <ChevronRight className="size-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Overlapping Slider Track Container (With Pause on Hover) */}
        <div
          className="relative flex w-full select-none flex-col"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className="flex w-full cursor-grab touch-pan-y items-center overflow-hidden py-3 sm:py-5 active:cursor-grabbing"
            style={{ minHeight: cardHeight + 30 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              ref={trackRef}
              className="flex items-center pl-2 sm:pl-6"
              style={{ transform: "translate3d(var(--ox, 0px), 0, 0)" }}
            >
              {WORKFLOW_CARDS.map((card, index) => (
                <div
                  key={card.id}
                  className="shrink-0"
                  style={{
                    width: cardWidth,
                    height: cardHeight,
                    marginRight: cardGap - cardWidth * overlapFactor,
                    zIndex: index + 1,
                    transformOrigin: "50% 90%",
                    transform: "translateY(var(--y, 0px)) scale(var(--s, 1))",
                    opacity: "var(--op, 1)",
                  }}
                  onClick={() => {
                    if (dragRef.current.moved < 8) goTo(index);
                  }}
                >
                  <WorkflowCard card={card} isActive={activeIndex === index} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator & Step Progress */}
          <div className="mt-3 flex items-center justify-between px-3 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                Step <span className="text-purple-700 font-black">{activeIndex + 1}</span> of {total}
              </span>
              {isHovered && (
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 animate-pulse">
                  Paused
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5">
              {WORKFLOW_CARDS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
                    activeIndex === i
                      ? "w-8 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]"
                      : "w-2 bg-purple-200 hover:bg-purple-300"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollStackWorkflow;

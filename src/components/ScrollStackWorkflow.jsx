import React, { useState, useRef, useLayoutEffect, useEffect, useCallback } from "react";
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

const WORKFLOW_CARDS = [
  {
    id: "step-1",
    stepNumber: "01",
    tabTitle: "Brief Launch",
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
    ],
    mockupType: "brief",
  },
  {
    id: "step-2",
    stepNumber: "02",
    tabTitle: "Video Pitch",
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
    ],
    mockupType: "pitch",
  },
  {
    id: "step-3",
    stepNumber: "03",
    tabTitle: "Crown & Payout",
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
    ],
    mockupType: "payout",
  },
  {
    id: "step-4",
    stepNumber: "04",
    tabTitle: "Scale Ad ROAS",
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
    ],
    mockupType: "growth",
  },
];

// Duplicate cards for seamless infinite loop (5 sets = 20 cards)
const REPEAT_SETS = 5;
const EXTENDED_CARDS = Array.from({ length: REPEAT_SETS }, (_, setIdx) =>
  WORKFLOW_CARDS.map((card, cardIdx) => ({
    ...card,
    instanceKey: `set-${setIdx}-card-${card.id}`,
    originalIndex: cardIdx,
  }))
).flat();

function CardMockup({ type }) {
  if (type === "brief") {
    return (
      <div className="rounded-xl p-3 bg-gradient-to-br from-purple-50/70 via-white to-purple-50/40 border border-purple-100 shadow-xs space-y-2">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
              🏢
            </span>
            <span className="font-bold text-[#1e1b4b] text-[11px] truncate">
              Aura Botanics Summer Reel
            </span>
          </div>
          <span className="text-[9px] font-bold text-purple-700 bg-purple-100/80 px-2 py-0.5 rounded-full flex-shrink-0">
            Escrow Locked
          </span>
        </div>

        <div className="p-2 rounded-lg bg-white border border-purple-100/90 text-[11px] space-y-0.5">
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Hook Prompt</div>
          <div className="text-slate-800 font-semibold text-[11px] truncate">
            "3-Second Hook: Why Your Skin Feels Dehydrated"
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center text-[10px]">
          <div className="p-1.5 rounded-lg bg-white border border-purple-100/80">
            <span className="text-slate-400 block font-bold text-[9px]">Aspect Ratio</span>
            <span className="font-black text-slate-800 text-[11px]">9:16 Vertical</span>
          </div>
          <div className="p-1.5 rounded-lg bg-white border border-purple-100/80">
            <span className="text-slate-400 block font-bold text-[9px]">Prize Bounty</span>
            <span className="font-black text-purple-700 text-[11px]">₹30,000</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === "pitch") {
    return (
      <div className="rounded-xl p-3 bg-gradient-to-br from-indigo-50/70 via-white to-indigo-50/40 border border-indigo-100 shadow-xs space-y-2">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
              🎨
            </span>
            <span className="font-bold text-[#1e1b4b] text-[11px] truncate">
              Aarav Sharma (@aarav_creates)
            </span>
          </div>
          <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-0.5 flex-shrink-0">
            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-500" /> 4.9
          </span>
        </div>

        {/* Video Player Mockup Strip */}
        <div className="p-2 rounded-lg bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center gap-2.5 shadow-xs">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <Play className="w-3 h-3 fill-white translate-x-0.5" />
          </div>
          <div className="min-w-0 flex-1 text-left">
            <div className="text-[11px] font-bold text-white truncate">Vitamin C Routine.mp4</div>
            <div className="text-[9px] text-indigo-200">Google Drive 4K Raw • 0:34s</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] px-1 font-semibold text-slate-500">
          <span>Format: 4K Raw Master</span>
          <span className="text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ready for Review
          </span>
        </div>
      </div>
    );
  }

  if (type === "payout") {
    return (
      <div className="rounded-xl p-3 bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 border border-amber-200 shadow-xs space-y-2">
        <div className="flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
              👑
            </span>
            <span className="font-bold text-[#1e1b4b] text-[11px] truncate">Winner Crowned</span>
          </div>
          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex-shrink-0">
            Paid in 24h ✓
          </span>
        </div>

        <div className="p-2 rounded-lg bg-white border border-amber-200 flex items-center justify-between text-left">
          <div className="flex items-center gap-2 min-w-0">
            <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div className="min-w-0">
              <span className="text-[8px] font-bold text-slate-400 uppercase block">Crowned Creator</span>
              <span className="text-[11px] font-bold text-slate-900 truncate block">Priya Menon (@priya)</span>
            </div>
          </div>
          <span className="text-xs font-black text-emerald-600 flex-shrink-0">₹35,000</span>
        </div>

        <div className="flex items-center justify-between text-[10px] px-1 font-semibold text-slate-600">
          <span>Usage License:</span>
          <span className="text-emerald-700 font-bold">100% Granted</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-3 bg-gradient-to-br from-emerald-50/70 via-white to-emerald-50/40 border border-emerald-200 shadow-xs space-y-2">
      <div className="flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
            🚀
          </span>
          <span className="font-bold text-[#1e1b4b] text-[11px] truncate">Meta & TikTok Ad Scaling</span>
        </div>
        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full flex-shrink-0">
          3.4x ROAS
        </span>
      </div>

      <div className="p-2 rounded-lg bg-white border border-emerald-100 grid grid-cols-2 gap-2 text-center text-[10px]">
        <div>
          <span className="text-slate-400 block font-bold text-[9px]">Average CTR</span>
          <span className="text-xs font-black text-emerald-600">+148%</span>
        </div>
        <div>
          <span className="text-slate-400 block font-bold text-[9px]">Cost Per Click</span>
          <span className="text-xs font-black text-purple-700">-42% CPA</span>
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
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl bg-white border transition-all duration-300 p-5 sm:p-5.5 text-slate-900 select-none group ${
        isActive
          ? "border-purple-300 shadow-[0_16px_36px_-6px_rgba(124,58,237,0.18),0_4px_16px_rgba(0,0,0,0.04)] ring-2 ring-purple-400/20"
          : "border-purple-200/90 shadow-[0_10px_28px_-6px_rgba(124,58,237,0.08),0_4px_14px_rgba(0,0,0,0.02)] hover:border-purple-300"
      }`}
    >
      {/* Top Accent Gradient Bar */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.gradientBar}`} />

      {/* Top Header Pill & Step Number */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200/80 text-[10px] font-bold tracking-wide text-purple-900">
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
        <h3 className="text-base sm:text-[17px] font-black leading-snug tracking-tight text-[#1e1b4b] mb-1.5 group-hover:text-purple-700 transition-colors">
          {card.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed font-normal line-clamp-2">
          {card.description}
        </p>
      </div>

      {/* Middle Interactive Mockup Component */}
      <div className="my-2.5">
        <CardMockup type={card.mockupType} />
      </div>

      {/* Feature Bullet Points */}
      <div className="space-y-1.5 my-1">
        {card.features.map((feat, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span className="truncate">{feat}</span>
          </div>
        ))}
      </div>

      {/* Bottom Card Footer */}
      <div className="pt-3 mt-auto border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[9px] text-slate-400 uppercase font-bold block">{card.highlightLabel}</span>
          <span className="text-xs sm:text-sm font-black text-purple-800">{card.highlightValue}</span>
        </div>

        <a
          href={REGISTER_URL}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-xs font-bold shadow-xs hover:shadow-purple-500/30 transition-all cursor-pointer"
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
  cardHeight = 490,
  cardGap = 20,
  autoLoop = true,
  loopInterval = 3200,
}) {
  const baseCount = WORKFLOW_CARDS.length; // 4
  const middleSetStart = 2 * baseCount; // Index 8 (middle set in 5 sets)
  
  const [vIndex, setVIndex] = useState(middleSetStart);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const trackRef = useRef(null);
  const step = cardWidth + cardGap;
  const vIndexRef = useRef(vIndex);
  vIndexRef.current = vIndex;

  const dragRef = useRef({
    down: false,
    startX: 0,
    currentX: 0,
    dragOffset: 0,
    lastTime: 0,
    velocity: 0,
  });

  const activeRealIndex = ((vIndex % baseCount) + baseCount) % baseCount;

  // Direct helper to position track
  const setTrackPosition = useCallback((targetIndex, animate = true) => {
    const track = trackRef.current;
    if (!track) return;

    if (animate) {
      track.style.transition = "transform 480ms cubic-bezier(0.25, 1, 0.5, 1)";
      setIsAnimating(true);
    } else {
      track.style.transition = "none";
      setIsAnimating(false);
    }

    const x = -targetIndex * step;
    track.style.transform = `translate3d(${x}px, 0, 0)`;
  }, [step]);

  // Handle seamless infinite snapping when transition ends
  const handleTransitionEnd = useCallback(() => {
    setIsAnimating(false);
    const curr = vIndexRef.current;
    const real = ((curr % baseCount) + baseCount) % baseCount;
    const normalizedIndex = middleSetStart + real;

    if (curr !== normalizedIndex) {
      // Instantly snap to the middle set equivalent without animation
      vIndexRef.current = normalizedIndex;
      setVIndex(normalizedIndex);
      setTrackPosition(normalizedIndex, false);
    }
  }, [baseCount, middleSetStart, setTrackPosition]);

  // Navigate to target virtual index
  const goToVIndex = useCallback((newIndex, animate = true) => {
    vIndexRef.current = newIndex;
    setVIndex(newIndex);
    setTrackPosition(newIndex, animate);
  }, [setTrackPosition]);

  // Navigate to real index (0..3) choosing the shortest path from current vIndex
  const goToRealIndex = useCallback((targetReal) => {
    const current = vIndexRef.current;
    const currentReal = ((current % baseCount) + baseCount) % baseCount;
    let diff = targetReal - currentReal;
    if (diff > baseCount / 2) diff -= baseCount;
    if (diff < -baseCount / 2) diff += baseCount;
    goToVIndex(current + diff, true);
  }, [baseCount, goToVIndex]);

  // Initialize track position on mount / resize
  useLayoutEffect(() => {
    setTrackPosition(vIndexRef.current, false);
  }, [setTrackPosition, cardWidth, cardGap]);

  // Autoplay loop with Pause-on-Hover
  useEffect(() => {
    if (!autoLoop || isHovered) return;

    const timer = setInterval(() => {
      if (!dragRef.current.down) {
        goToVIndex(vIndexRef.current + 1, true);
      }
    }, loopInterval);

    return () => clearInterval(timer);
  }, [autoLoop, isHovered, loopInterval, goToVIndex]);

  // Pointer drag & touch swipe interactions
  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;

    dragRef.current.down = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.currentX = e.clientX;
    dragRef.current.dragOffset = 0;
    dragRef.current.lastTime = performance.now();
    dragRef.current.velocity = 0;

    track.style.transition = "none";
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag.down) return;

    const now = performance.now();
    const dt = Math.max(1, now - drag.lastTime);
    drag.velocity = ((e.clientX - drag.currentX) / dt) * 1000;
    drag.currentX = e.clientX;
    drag.lastTime = now;

    drag.dragOffset = e.clientX - drag.startX;
    const baseX = -vIndexRef.current * step;
    const currentX = baseX + drag.dragOffset;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }
  };

  const onPointerUp = (e) => {
    const drag = dragRef.current;
    if (!drag.down) return;
    drag.down = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const moved = drag.dragOffset;
    let delta = 0;

    if (drag.velocity < -280 || moved < -step * 0.25) {
      delta = Math.max(1, Math.round(Math.abs(moved) / step) || 1);
    } else if (drag.velocity > 280 || moved > step * 0.25) {
      delta = -Math.max(1, Math.round(Math.abs(moved) / step) || 1);
    }

    goToVIndex(vIndexRef.current + delta, true);
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-16 relative bg-[#fafbfc] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-[10px] font-bold uppercase tracking-wider text-purple-800 mb-2">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Interactive Workflow Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e1b4b] tracking-tight">
              How BrandForge Operates
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-xl">
              Continuous 4-stage automated pipeline. Hover anywhere to pause, or click and drag to navigate.
            </p>
          </div>

          {/* Arrow Navigation Controls */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              aria-label="Previous step"
              onClick={() => goToVIndex(vIndexRef.current - 1, true)}
              className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-white border border-purple-200 text-[#1e1b4b] shadow-xs hover:border-purple-400 hover:bg-purple-50 transition active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="size-4 text-purple-900" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              aria-label="Next step"
              onClick={() => goToVIndex(vIndexRef.current + 1, true)}
              className="flex size-9 sm:size-10 items-center justify-center rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-xs hover:shadow-purple-500/30 transition active:scale-95 cursor-pointer border-none"
            >
              <ChevronRight className="size-4 text-white" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Carousel Outer Track Container (Pause on Hover) */}
        <div
          className="relative w-full select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Subtle Left & Right edge fade gradients for ultra-premium look */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#fafbfc] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#fafbfc] to-transparent z-10" />

          <div
            className="w-full cursor-grab touch-pan-y overflow-hidden py-4 active:cursor-grabbing"
            style={{ minHeight: cardHeight + 20 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="flex items-center"
              style={{
                willChange: "transform",
              }}
            >
              {EXTENDED_CARDS.map((card, idx) => {
                const isCurrentActive = idx === vIndex;
                return (
                  <div
                    key={card.instanceKey}
                    className="shrink-0 transition-transform duration-300"
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      marginRight: cardGap,
                    }}
                    onClick={() => {
                      if (Math.abs(dragRef.current.dragOffset) < 8) {
                        goToVIndex(idx, true);
                      }
                    }}
                  >
                    <WorkflowCard card={card} isActive={isCurrentActive} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator & Real-Time Status */}
          <div className="mt-4 flex items-center justify-between px-2 sm:px-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                Stage <span className="text-purple-700 font-black">{activeRealIndex + 1}</span> of {baseCount}:{" "}
                <span className="text-slate-800 font-bold hidden sm:inline">
                  {WORKFLOW_CARDS[activeRealIndex].tabTitle}
                </span>
              </span>
              {isHovered && (
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200 animate-pulse">
                  Paused on Hover
                </span>
              )}
            </div>

            {/* 4 Interactive Step Indicator Dots */}
            <div className="flex items-center gap-1.5">
              {WORKFLOW_CARDS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToRealIndex(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer ${
                    activeRealIndex === i
                      ? "w-8 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] shadow-xs shadow-purple-500/30"
                      : "w-2.5 bg-purple-200 hover:bg-purple-300"
                  }`}
                  aria-label={`Go to stage ${i + 1}`}
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


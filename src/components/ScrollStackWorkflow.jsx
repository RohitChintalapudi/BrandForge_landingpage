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
    scale: 1 - t * 0.12,
    y: t * 24,
    opacity: 1 - t * 0.2,
  };
}

const WORKFLOW_CARDS = [
  {
    id: "step-1",
    stepNumber: "01",
    tabTitle: "01 · Brief Launch",
    role: "Brand Initiation",
    title: "Post Targeted Briefs & Lock Prize Escrow",
    description:
      "Brands define hooks, visual guidelines, 9:16 aspect ratios, and deposit escrow-guaranteed prize pools (₹5,000 to ₹1,00,000+).",
    tag: "Escrow Locked 🔒",
    reward: "₹30,000 Pool",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    gradient: "linear-gradient(to top, rgba(15, 10, 36, 0.96) 0%, rgba(30, 27, 75, 0.75) 50%, rgba(30, 27, 75, 0.2) 100%)",
    accentColor: "#8b5cf6",
    details: ["Hook: 3-Second Problem Hook", "Deliverable: 2 UGC Video Concepts", "100% Escrow Protected"],
  },
  {
    id: "step-2",
    stepNumber: "02",
    tabTitle: "02 · Video Pitch",
    role: "Creator Submission",
    title: "Stream Raw 4K Video Pitches in Real-Time",
    description:
      "Creators submit uncompressed Google Drive, Loom, or YouTube video concepts. Brands review high-res videos in a side-by-side dashboard.",
    tag: "4K Raw Playback 🎥",
    reward: "14 Pitches Received",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    gradient: "linear-gradient(to top, rgba(15, 10, 36, 0.96) 0%, rgba(49, 16, 75, 0.75) 50%, rgba(49, 16, 75, 0.2) 100%)",
    accentColor: "#6366f1",
    details: ["Public Drive / YouTube Links", "Creator Rating: 4.9/5 ⭐", "Instant Audio & Video Preview"],
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
    reward: "₹35,000 Paid Out",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    gradient: "linear-gradient(to top, rgba(15, 10, 36, 0.96) 0%, rgba(67, 20, 7, 0.75) 50%, rgba(67, 20, 7, 0.2) 100%)",
    accentColor: "#f59e0b",
    details: ["Automated Bank Settlement", "Full Commercial Ad Licensing", "Download Raw 4K Files"],
  },
  {
    id: "step-4",
    stepNumber: "04",
    tabTitle: "04 · Scale Ad ROAS",
    role: "Ad Growth",
    title: "Deploy Winning Creatives into Meta & TikTok Ads",
    description:
      "Plug proven user-generated content directly into paid ad pipelines. Achieve lower CPMs, higher CTRs, and scale high-converting organic reach.",
    tag: "Ad Scale Ready 🚀",
    reward: "3.4x ROAS Avg",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    gradient: "linear-gradient(to top, rgba(15, 10, 36, 0.96) 0%, rgba(20, 45, 80, 0.75) 50%, rgba(20, 45, 80, 0.2) 100%)",
    accentColor: "#10b981",
    details: ["Clean unwatermarked masters", "High CTR ad hooks", "Zero ongoing royalty fees"],
  },
];

export function WorkflowCard({ card, isActive }) {
  return (
    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[28px] sm:rounded-[32px] bg-slate-900 border border-purple-300/30 shadow-[0_16px_36px_-8px_rgba(124,58,237,0.25)] p-5 sm:p-7 text-white select-none transition-all duration-300 group">
      {/* Background Image */}
      <img
        src={card.image}
        alt={card.title}
        draggable={false}
        className="pointer-events-none absolute inset-0 size-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-700 ease-out"
      />

      {/* Atmospheric Gradient Layer */}
      <div
        className="pointer-events-none absolute inset-0 size-full"
        style={{ background: card.gradient }}
      />

      {/* Top Header Badge */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[11px] font-bold tracking-wide">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accentColor }} />
          <span>{card.tabTitle}</span>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/30 border border-purple-300/40 text-purple-200 backdrop-blur-md">
          {card.tag}
        </span>
      </div>

      {/* Middle Step Details */}
      <div className="relative z-10 my-auto py-3">
        <div className="text-[11px] font-bold uppercase tracking-wider text-purple-300 mb-1">
          {card.role}
        </div>
        <h3 className="text-xl sm:text-2xl font-black leading-tight tracking-tight text-white mb-2 drop-shadow-md">
          {card.title}
        </h3>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed drop-shadow-sm font-normal line-clamp-3">
          {card.description}
        </p>

        {/* Feature Checkpoints */}
        <div className="mt-3.5 space-y-1.5">
          {card.details.map((detail, idx) => (
            <div key={idx} className="flex items-center gap-2 text-[11px] font-medium text-purple-100/90">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="relative z-10 pt-3 border-t border-white/15 flex items-center justify-between gap-2">
        <div>
          <span className="text-[9px] text-slate-300 uppercase font-bold block">Key Highlight</span>
          <span className="text-xs sm:text-sm font-black text-amber-300">{card.reward}</span>
        </div>

        <a
          href={REGISTER_URL}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-xs font-bold shadow-md hover:shadow-purple-500/50 transition-all cursor-pointer"
        >
          <span>Explore Step</span>
          <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export function ScrollStackWorkflow({
  cardWidth = 360,
  cardHeight = 490,
  overlapFactor = 0.05,
  cardGap = 20,
  autoLoop = true,
  loopInterval = 4000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
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
      ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
      : "none";
    track.style.transition = transition;
    track.style.setProperty("--ox", `${x}px`);
    const activeExact = -x / step;
    const active = Math.max(0, Math.min(Math.round(activeExact), total - 1));

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
    // Wrap around for continuous loop
    let next = index;
    if (next < 0) next = total - 1;
    if (next >= total) next = 0;

    setActiveIndex(next);
    apply(-next * step, true);
  };

  useLayoutEffect(() => {
    apply(offsetRef.current, false);
  }, [cardWidth, cardHeight, overlapFactor, cardGap, total]);

  // Optional Autoplay Loop
  useEffect(() => {
    if (!autoLoop) return;
    const timer = setInterval(() => {
      if (!dragRef.current.down) {
        goTo((activeIndex + 1) % total);
      }
    }, loopInterval);

    return () => clearInterval(timer);
  }, [activeIndex, autoLoop, loopInterval, total]);

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
    <section id="how-it-works" className="py-14 sm:py-20 relative bg-[#fafbfc] overflow-hidden">
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
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl">
              Drag, swipe, or click through the cards to explore the frictionless end-to-end campaign cycle.
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

        {/* Overlapping Slider Track Container */}
        <div className="relative flex w-full select-none flex-col">
          <div
            className="flex w-full cursor-grab touch-pan-y items-center overflow-hidden py-4 sm:py-6 active:cursor-grabbing"
            style={{ minHeight: cardHeight + 40 }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div
              ref={trackRef}
              className="flex items-center pl-4 sm:pl-8"
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
          <div className="mt-4 flex items-center justify-between px-4 sm:px-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                Step <span className="text-purple-700 font-black">{activeIndex + 1}</span> of {total}
              </span>
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

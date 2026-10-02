import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Trophy,
  Users,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  Play,
  Clock,
  Filter,
  Search,
  ExternalLink,
  ChevronDown,
  Layers,
  Award,
  DollarSign,
  Video,
  Check,
  Building2,
  Palette,
  Star,
  Flame,
  MousePointerClick,
  FileCheck,
  Send,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "./Navbar.jsx";
import SectionDivider from "./SectionDivider.jsx";
import { REGISTER_URL, LOGIN_URL } from "../config/appUrls.js";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.02 },
  },
};

const LandingPage = () => {
  // State for interactive live dashboard preview
  const [dashboardView, setDashboardView] = useState("brand"); // "brand" | "creator"
  const [demoBrandFilter, setDemoBrandFilter] = useState("all");
  const [demoSearchQuery, setDemoSearchQuery] = useState("");
  const [demoWinnerId, setDemoWinnerId] = useState(null);
  const [demoPitchUrl, setDemoPitchUrl] = useState("https://drive.google.com/file/d/1v8UGC_Sample_Video/view");
  const [demoPitchSubmitted, setDemoPitchSubmitted] = useState(false);

  // State for Campaign Marketplace section
  const [marketCategory, setMarketCategory] = useState("all");

  // State for ROI & Payout Calculator
  const [calculatorRole, setCalculatorRole] = useState("brand");
  const [brandBudget, setBrandBudget] = useState(50000);
  const [creatorPitches, setCreatorPitches] = useState(6);

  // State for FAQ Accordion
  const [openFaq, setOpenFaq] = useState(0);

  // Confetti trigger helper
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 75,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#a855f7", "#6366f1", "#f59e0b", "#10b981"],
      });
    } catch {
      // fallback
    }
  };

  const handleSelectWinnerDemo = (id) => {
    setDemoWinnerId(id);
    triggerConfetti();
  };

  const handleSubmitPitchDemo = (e) => {
    e.preventDefault();
    if (!demoPitchUrl.trim()) return;
    setDemoPitchSubmitted(true);
    triggerConfetti();
    setTimeout(() => {
      setDemoPitchSubmitted(false);
    }, 4000);
  };

  // Mock campaigns for interactive dashboard demo (Seeded Rich Brand Portfolio)
  const demoBrandCampaigns = [
    {
      id: "c1",
      title: "Summer Glow Vitamin C Serum UGC Reel",
      brand: "GlowVeda Organics",
      reward: "₹25,000",
      status: "approved",
      submissionsCount: 14,
      deadline: "Oct 15, 2026",
      category: "Beauty & Wellness",
    },
    {
      id: "c2",
      title: "Smart Ergonomic Backpack Everyday Carry Reel",
      brand: "UrbanNomad Gear",
      reward: "₹18,000",
      status: "approved",
      submissionsCount: 9,
      deadline: "Oct 20, 2026",
      category: "D2C Lifestyle",
    },
    {
      id: "c3",
      title: "Real-Time AI Meeting Notes Workflow Reel",
      brand: "EchoNote AI",
      reward: "₹45,000",
      status: "approved",
      submissionsCount: 19,
      deadline: "Oct 22, 2026",
      category: "Tech & SaaS",
    },
    {
      id: "c4",
      title: "Ceremonial Grade Matcha Morning Latte ASMR",
      brand: "ZenMatcha Botanicals",
      reward: "₹22,000",
      status: "approved",
      submissionsCount: 11,
      deadline: "Oct 25, 2026",
      category: "Food & Beverage",
    },
    {
      id: "c5",
      title: "UltraFit Pro Smart Band Workout Log Ad",
      brand: "PulseTech Wearables",
      reward: "₹35,000",
      status: "approved",
      submissionsCount: 16,
      deadline: "Oct 26, 2026",
      category: "Fitness Tech",
    },
    {
      id: "c6",
      title: "FinFlow Mobile App 30s Viral Hook Ad",
      brand: "FinFlow Technologies",
      reward: "₹35,000",
      status: "pending",
      submissionsCount: 0,
      deadline: "Oct 28, 2026",
      category: "Tech & Fintech",
    },
    {
      id: "c7",
      title: "Full-Grain Italian Leather Cardholder Drop Test",
      brand: "Atelier Leather Co.",
      reward: "₹20,000",
      status: "pending",
      submissionsCount: 0,
      deadline: "Nov 02, 2026",
      category: "D2C Lifestyle",
    },
  ];

  const filteredDemoCampaigns = demoBrandCampaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(demoSearchQuery.toLowerCase()) ||
      c.brand.toLowerCase().includes(demoSearchQuery.toLowerCase());
    const matchesFilter =
      demoBrandFilter === "all" || c.status === demoBrandFilter;
    return matchesSearch && matchesFilter;
  });

  // Mock submissions for Winner Crowning simulation
  const demoSubmissions = [
    {
      id: "sub-1",
      creatorName: "Aarav Sharma",
      handle: "@aarav_creates",
      videoTitle: "Natural Morning Skincare Routine Hook",
      platform: "📁 Google Drive",
      submittedTime: "2 hours ago",
      rating: "4.9/5",
    },
    {
      id: "sub-2",
      creatorName: "Priya Menon",
      handle: "@priyaugestudio",
      videoTitle: "Before vs After 7 Days Texture Reveal",
      platform: "🎥 YouTube Unlisted",
      submittedTime: "5 hours ago",
      rating: "4.8/5",
    },
    {
      id: "sub-3",
      creatorName: "Rohan Desai",
      handle: "@rohan_visuals",
      videoTitle: "Fast-Paced Aesthetic EDC Unpack & Laptop Fit",
      platform: "⚡ Loom Video",
      submittedTime: "7 hours ago",
      rating: "4.9/5",
    },
    {
      id: "sub-4",
      creatorName: "Sneha Roy",
      handle: "@snehadigital",
      videoTitle: "Creamy Froth Pour & Natural Energy Review",
      platform: "📦 Dropbox Link",
      submittedTime: "11 hours ago",
      rating: "5.0/5",
    },
  ];

  // Campaign Marketplace Live Teasers (Expanded Brand Dataset)
  const marketplaceCampaigns = [
    {
      id: "m1",
      title: "SuperCoffee Energy Brew 30s Morning Routine",
      brand: "BrewCraft Foods",
      category: "food",
      reward: "₹30,000",
      deadline: "In 4 days",
      submissions: 18,
      status: "Active Brief",
      urgent: true,
      tag: "D2C Beverage",
      guidelines: "9:16 Vertical, energetic coffee brewing hook, natural morning sunlight.",
    },
    {
      id: "m2",
      title: "AI Voice Scribe iOS App Demonstration Pitch",
      brand: "EchoNote AI",
      category: "tech",
      reward: "₹45,000",
      deadline: "In 7 days",
      submissions: 12,
      status: "High Reward",
      urgent: false,
      tag: "SaaS & AI",
      guidelines: "Screen capture + talking head, show real-time meeting transcription in action.",
    },
    {
      id: "m3",
      title: "HydraBoost Collagen Glow Drink Honest Review",
      brand: "Aura Botanics",
      category: "beauty",
      reward: "₹22,000",
      deadline: "In 3 days",
      submissions: 26,
      status: "Trending",
      urgent: true,
      tag: "Beauty & Health",
      guidelines: "Unboxing + unboxing sachet pour, 7-day before-after honest skin commentary.",
    },
    {
      id: "m4",
      title: "UltraFit Pro Smart Band Workout Log Ad",
      brand: "PulseTech Wearables",
      category: "fitness",
      reward: "₹35,000",
      deadline: "In 10 days",
      submissions: 15,
      status: "Active Brief",
      urgent: false,
      tag: "Fitness Tech",
      guidelines: "Gym/Outdoor running footage, heart rate sensor feature highlight with upbeat audio.",
    },
    {
      id: "m5",
      title: "Minimalist Leather Travel Wallet Drop Test",
      brand: "Atelier Leather Co.",
      category: "lifestyle",
      reward: "₹18,000",
      deadline: "In 6 days",
      submissions: 8,
      status: "Open to All",
      urgent: false,
      tag: "Men's Lifestyle",
      guidelines: "ASMR unboxing, RFID blocking showcase, front and back pocket fit check.",
    },
    {
      id: "m6",
      title: "FinSnap Smart Budgeting App Relatable Problem-Agitate Hook",
      brand: "FinSnap Labs",
      category: "tech",
      reward: "₹28,000",
      deadline: "In 5 days",
      submissions: 21,
      status: "Top Brand",
      urgent: true,
      tag: "Fintech",
      guidelines: "Relatable monthly salary spending humor, app automatic expense categorizer showcase.",
    },
    {
      id: "m7",
      title: "Ceremonial Matcha Whisking ASMR & 2PM Slump Cure",
      brand: "ZenMatcha Botanicals",
      category: "food",
      reward: "₹24,000",
      deadline: "In 5 days",
      submissions: 14,
      status: "Trending",
      urgent: true,
      tag: "Organic Foods",
      guidelines: "Close-up bamboo whisking sounds, clean aesthetic kitchen setting, sustained focus angle.",
    },
    {
      id: "m8",
      title: "Silk Peptide Night Repair Cream Rich Texture Demo",
      brand: "LuxeDerma Labs",
      category: "beauty",
      reward: "₹32,000",
      deadline: "In 8 days",
      submissions: 19,
      status: "High Reward",
      urgent: false,
      tag: "Skincare Science",
      guidelines: "Macro texture swatch, skin absorption test, gentle evening wind-down voiceover.",
    },
    {
      id: "m9",
      title: "Carbon-Fiber Gym Duffel Extreme Durability & Water Test",
      brand: "Veloce Performance",
      category: "fitness",
      reward: "₹26,000",
      deadline: "In 9 days",
      submissions: 11,
      status: "Active Brief",
      urgent: false,
      tag: "Athletic Gear",
      guidelines: "Water splash test on outer fabric, shoe compartment demo, locker fit check.",
    },
    {
      id: "m10",
      title: "CloudSip Sparkling Adaptogen Tonic Blind Taste Test",
      brand: "CloudSip Beverages",
      category: "food",
      reward: "₹20,000",
      deadline: "In 4 days",
      submissions: 17,
      status: "Trending",
      urgent: true,
      tag: "Functional Drinks",
      guidelines: "Spontaneous friend blind taste reaction, can crack sound, zero-sugar emphasis.",
    },
    {
      id: "m11",
      title: "DevFlow Cloud Terminal 60s Speedrun Workflow",
      brand: "DevFlow Systems",
      category: "tech",
      reward: "₹50,000",
      deadline: "In 12 days",
      submissions: 8,
      status: "Top Brand",
      urgent: false,
      tag: "Developer Tools",
      guidelines: "Dual screen recording, CLI commands deployment demo, developer humor hook.",
    },
    {
      id: "m12",
      title: "Waterproof Commuter Trench Coat Monsoon Test Reel",
      brand: "NordicWeave Studio",
      category: "lifestyle",
      reward: "₹27,000",
      deadline: "In 7 days",
      submissions: 13,
      status: "Active Brief",
      urgent: false,
      tag: "Urban Apparel",
      guidelines: "Outdoor rain footage, hydrophobic water beading roll-off, stylish city walking shots.",
    },
  ];

  const filteredMarketplace = marketplaceCampaigns.filter((item) => {
    if (marketCategory === "all") return true;
    return item.category === marketCategory;
  });

  // Calculate ROI
  const calculatedVideos = Math.round(brandBudget / 10000);
  const calculatedAgencyCost = brandBudget * 3.2;
  const calculatedSavings = calculatedAgencyCost - brandBudget;

  const calculatedCreatorEarnings = creatorPitches * 12500;

  return (
    <div className="bg-[#fafbfc] text-slate-900 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden text-sm">
      <Navbar />

      {/* =====================================================
          1. HERO SECTION (High-Impact, Elegant & Balanced)
      ===================================================== */}
      <section id="hero" className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="hero-glow-orb-left" />
        <div className="hero-glow-orb-right" />
        <div className="ambient-mesh-pattern" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-3xl mx-auto"
          >
            {/* Main Headline */}
            <motion.h1
              variants={fadeIn}
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-black text-[#1e1b4b] tracking-tight leading-[1.15]"
            >
              Where Top Brands & Creators{" "}
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#4f46e5] bg-clip-text text-transparent">
                Forge Winning Campaigns
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeIn}
              className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-600 max-w-xl leading-relaxed"
            >
              Launch targeted creative briefs, receive high-converting user-generated video pitches, crown winners in 1-click, and supercharge your organic & paid ad performance.
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              variants={fadeIn}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm"
            >
              <motion.a
                href={REGISTER_URL}
                whileHover={{ y: -1, boxShadow: "0 8px 24px rgba(124, 58, 237, 0.32)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] text-white font-bold text-xs sm:text-sm shadow-[0_4px_16px_rgba(124,58,237,0.25)] transition-all"
              >
                <Building2 className="w-4 h-4" />
                <span>Launch a Campaign</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>

              <motion.a
                href={REGISTER_URL}
                whileHover={{ y: -1, backgroundColor: "rgba(255, 255, 255, 1)", borderColor: "rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/95 border border-purple-200 text-[#1e1b4b] font-bold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all"
              >
                <Palette className="w-4 h-4 text-[#7c3aed]" />
                <span>Join as Creator</span>
              </motion.a>
            </motion.div>

            {/* Quick Feature Highlights */}
            <motion.div
              variants={fadeIn}
              className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[11px] font-semibold text-slate-500"
            >
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero agency overhead</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Guaranteed prize pools</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Full commercial usage rights</span>
              </div>
            </motion.div>

            {/* Live Activity Floating Chips Deck */}
            <motion.div
              variants={fadeIn}
              className="mt-6 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 border border-purple-100 shadow-xs text-left">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] text-slate-700 font-medium">
                  🏢 <strong>GlowVeda:</strong> Summer Vitamin C Reel • <span className="text-purple-700 font-bold">₹25,000 Pool</span>
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/90 border border-purple-100 shadow-xs text-left">
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] text-slate-700 font-medium">
                  🎨 <strong>Aarav Sharma</strong> crowned winner • <span className="text-emerald-600 font-bold">₹35,000 Paid</span>
                </span>
              </div>
            </motion.div>

            {/* Platform Metrics Bar */}
            <motion.div
              variants={fadeIn}
              className="mt-8 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-2.5"
            >
              {[
                {
                  value: "500+",
                  label: "Brand Campaigns",
                  icon: <Zap className="w-3.5 h-3.5 text-[#7c3aed]" />,
                },
                {
                  value: "10,000+",
                  label: "Active Creators",
                  icon: <Users className="w-3.5 h-3.5 text-[#7c3aed]" />,
                },
                {
                  value: "₹2.5Cr+",
                  label: "Paid to Creators",
                  icon: <Trophy className="w-3.5 h-3.5 text-[#7c3aed]" />,
                },
                {
                  value: "99.2%",
                  label: "Satisfaction Rate",
                  icon: <Award className="w-3.5 h-3.5 text-[#7c3aed]" />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-3.5 border border-purple-100/90 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:border-purple-300 hover:shadow-sm transition-all text-left relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#4f46e5] opacity-80" />
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-lg sm:text-xl font-black text-[#1e1b4b] tracking-tight">
                      {stat.value}
                    </span>
                    <div className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* =====================================================
          2. INTERACTIVE LIVE DASHBOARD PREVIEW (BRAND & CREATOR PORTALS)
      ===================================================== */}
      <section id="live-demo" className="py-10 sm:py-14 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/70 border border-purple-200 text-[10px] font-bold uppercase tracking-wider text-purple-800 mb-2">
              <Sparkles className="w-3 h-3 text-purple-600" />
              <span>Interactive Command Experience</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">
              Experience the Dashboard in Action
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              Toggle between the dual portals to explore how Brands manage campaigns and how Creators discover and pitch winning concepts.
            </p>

            {/* Portal Switcher Tabs */}
            <div className="mt-4 inline-flex p-1 rounded-xl bg-white border border-purple-200 shadow-xs">
              <button
                onClick={() => setDashboardView("brand")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-xs cursor-pointer border-none transition-all ${
                  dashboardView === "brand"
                    ? "bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-xs"
                    : "bg-transparent text-slate-600 hover:text-purple-700"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Brand Management</span>
              </button>

              <button
                onClick={() => setDashboardView("creator")}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-bold text-xs cursor-pointer border-none transition-all ${
                  dashboardView === "creator"
                    ? "bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-xs"
                    : "bg-transparent text-slate-600 hover:text-purple-700"
                }`}
              >
                <Palette className="w-3.5 h-3.5" />
                <span>Creator Pitch Portal</span>
              </button>
            </div>
          </div>

          {/* Symmetrical Rectangular Mockup Card */}
          <div className="bg-[#f8fafc] rounded-2xl border border-purple-200/90 shadow-[0_12px_32px_-4px_rgba(139,92,246,0.12),0_4px_12px_rgba(0,0,0,0.04)] p-3.5 sm:p-5 relative overflow-hidden">
            {/* Top Mockup Browser Chrome */}
            <div className="flex items-center justify-between pb-3 mb-3.5 border-b border-purple-100">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] font-semibold text-slate-400 font-mono hidden sm:inline">
                  {dashboardView === "brand"
                    ? "https://brand-forge.app/brand/dashboard"
                    : "https://brand-forge.app/creator/dashboard"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Interactive Sandbox</span>
              </div>
            </div>

            {/* VIEW A: BRAND DASHBOARD MOCKUP */}
            {dashboardView === "brand" && (
              <div className="space-y-3.5">
                {/* Brand Header Banner */}
                <div className="rounded-xl p-3.5 sm:p-4 text-white relative overflow-hidden bg-gradient-to-r from-[#1e1b4b] via-[#31104b] to-[#1e1b4b] border border-purple-500/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center text-lg shadow-inner">
                      🏢
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-white">EcoGlow Organics</h3>
                        <span className="px-2 py-0.5 rounded bg-purple-500/30 text-purple-200 text-[9px] font-bold border border-purple-400/30">
                          Brand Verified
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Managing 4 active campaigns • 46 submissions received
                      </p>
                    </div>
                  </div>

                  <a
                    href={REGISTER_URL}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white font-bold text-xs shadow-xs hover:shadow-purple-500/30 transition-all self-start sm:self-auto"
                  >
                    <span>+ New Campaign</span>
                  </a>
                </div>

                {/* 4 Metric Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-white rounded-xl p-2.5 border border-purple-100 shadow-xs">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Total Briefs</div>
                    <div className="text-xl font-black text-[#1e1b4b]">18</div>
                    <div className="text-[9px] text-slate-500">Active portfolio</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-purple-100 shadow-xs">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">Live Campaigns</div>
                    <div className="text-xl font-black text-emerald-600">12</div>
                    <div className="text-[9px] text-slate-500">Open for pitches</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-purple-100 shadow-xs">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-amber-600">Pending Review</div>
                    <div className="text-xl font-black text-amber-600">2</div>
                    <div className="text-[9px] text-slate-500">Awaiting approval</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-purple-200 shadow-xs bg-purple-50/40">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-purple-700">Submissions</div>
                    <div className="text-xl font-black text-[#7c3aed]">46</div>
                    <div className="text-[9px] text-purple-600 font-medium">Video concepts</div>
                  </div>
                </div>

                {/* Two Column Grid: Left Campaigns / Right Winner Simulation */}
                <div className="grid md:grid-cols-2 gap-3">
                  {/* Left Column: Active Campaigns List */}
                  <div className="bg-white rounded-xl p-3.5 border border-purple-100 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-black text-[#1e1b4b] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-purple-600" />
                        <span>Active Briefs</span>
                      </h4>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        2 Live
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Live</span>
                            <span className="text-[11px] font-bold text-slate-900 line-clamp-1">Summer Glow Vitamin C Reel</span>
                          </div>
                          <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">₹25,000 Prize Pool • 14 Pitches</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Oct 15</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Live</span>
                            <span className="text-[11px] font-bold text-slate-900 line-clamp-1">Hydrating Lip Oil 15s Hook</span>
                          </div>
                          <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">₹18,000 Prize Pool • 9 Pitches</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Oct 20</span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Total Escrow: <strong>₹43,000</strong></span>
                      <a href={LOGIN_URL} className="text-purple-700 font-bold hover:underline flex items-center gap-0.5">
                        <span>View all</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Winner Crowning Simulation */}
                  <div className="bg-gradient-to-br from-purple-50/60 to-indigo-50/60 rounded-xl p-3.5 border border-purple-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-500" />
                          <h4 className="text-xs font-black text-[#1e1b4b]">Crown Top Pitch (Demo)</h4>
                        </div>
                        {demoWinnerId && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                            Winner Crowned 👑
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        {demoSubmissions.slice(0, 2).map((sub) => {
                          const isWon = demoWinnerId === sub.id;
                          return (
                            <div
                              key={sub.id}
                              className={`p-2.5 rounded-lg bg-white border transition-all flex items-center justify-between ${
                                isWon
                                  ? "border-amber-400 ring-1 ring-amber-300 shadow-xs"
                                  : "border-slate-200 hover:border-purple-300"
                              }`}
                            >
                              <div className="pr-2">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-[11px] text-slate-900">{sub.creatorName}</span>
                                  <span className="text-[9px] text-slate-400 font-mono">{sub.handle}</span>
                                </div>
                                <p className="text-[10px] text-slate-600 font-medium line-clamp-1 mt-0.5">
                                  "{sub.videoTitle}"
                                </p>
                              </div>

                              <button
                                onClick={() => handleSelectWinnerDemo(sub.id)}
                                className={`px-2.5 py-1 rounded-md text-[10px] font-bold cursor-pointer transition-all border-none flex-shrink-0 ${
                                  isWon
                                    ? "bg-amber-500 text-white shadow-xs"
                                    : "bg-purple-600 text-white hover:bg-purple-700"
                                }`}
                              >
                                {isWon ? "🏆 Winner!" : "Crown 👑"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 mt-2 text-center">
                      Click Crown to simulate automated creator payout and video licensing.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: CREATOR DASHBOARD MOCKUP */}
            {dashboardView === "creator" && (
              <div className="space-y-3.5">
                {/* Creator Header Banner */}
                <div className="rounded-xl p-3.5 sm:p-4 text-white relative overflow-hidden bg-gradient-to-r from-[#1e1b4b] via-[#31104b] to-[#1e1b4b] border border-purple-500/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center text-lg font-black shadow-inner">
                      🎨
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-black text-white">Aisha Patel</h3>
                        <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 text-[9px] font-bold border border-amber-400/30">
                          Top Creator • 3 Wins
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Level 2 UGC Creator • ₹75,000 Earned to date
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={triggerConfetti}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs shadow-xs hover:shadow-amber-500/30 transition-all border-none cursor-pointer self-start sm:self-auto"
                  >
                    <Trophy className="w-3 h-3" />
                    <span>Celebrate Wins</span>
                  </button>
                </div>

                {/* 4 Metric Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="bg-white rounded-xl p-2.5 border border-purple-100 shadow-xs">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">Open Briefs</div>
                    <div className="text-xl font-black text-emerald-600">24</div>
                    <div className="text-[9px] text-slate-500">Ready to pitch</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-purple-100 shadow-xs">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Pitches Sent</div>
                    <div className="text-xl font-black text-[#1e1b4b]">8</div>
                    <div className="text-[9px] text-slate-500">Active pitches</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-amber-200 shadow-xs">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-amber-600">Won Bounties</div>
                    <div className="text-xl font-black text-amber-600">3</div>
                    <div className="text-[9px] text-slate-500">100% Payout rate</div>
                  </div>
                  <div className="bg-white rounded-xl p-2.5 border border-purple-200 shadow-xs bg-purple-50/40">
                    <div className="text-[9px] font-bold uppercase tracking-wider text-purple-700">Total Earnings</div>
                    <div className="text-xl font-black text-[#7c3aed]">₹75,000</div>
                    <div className="text-[9px] text-purple-600 font-medium">Direct payouts</div>
                  </div>
                </div>

                {/* Two Column Grid: Left Opportunities / Right Pitch Submission Simulator */}
                <div className="grid md:grid-cols-2 gap-3">
                  {/* Left Column: Live Brand Opportunities */}
                  <div className="bg-white rounded-xl p-3.5 border border-purple-100 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-black text-[#1e1b4b] flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-purple-600" />
                        <span>Recommended Briefs</span>
                      </h4>
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                        High Match
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-100 text-purple-800">Beauty</span>
                            <span className="text-[11px] font-bold text-slate-900 line-clamp-1">Summer Glow Vitamin C Reel</span>
                          </div>
                          <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">GlowVeda Organics • ₹25,000 Reward</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">3d left</span>
                      </div>

                      <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 hover:border-purple-200 transition-all flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-800">Gear</span>
                            <span className="text-[11px] font-bold text-slate-900 line-clamp-1">Ergonomic EDC Backpack Ad</span>
                          </div>
                          <span className="text-[10px] text-purple-700 font-semibold mt-0.5 block">UrbanNomad • ₹18,000 Reward</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">5d left</span>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-medium">Available Pools: <strong>₹3,40,000+</strong></span>
                      <a href={LOGIN_URL} className="text-purple-700 font-bold hover:underline flex items-center gap-0.5">
                        <span>Explore all</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Right Column: Instant Pitch Engine Simulator */}
                  <div className="bg-gradient-to-br from-purple-50/60 to-indigo-50/60 rounded-xl p-3.5 border border-purple-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xs font-black text-[#1e1b4b] flex items-center gap-1.5">
                          <Send className="w-3.5 h-3.5 text-purple-600" />
                          <span>Instant Pitch Simulator</span>
                        </h4>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">
                          Live Demo
                        </span>
                      </div>

                      <form onSubmit={handleSubmitPitchDemo} className="space-y-2">
                        <select className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:border-purple-500">
                          <option>Summer Glow Vitamin C (₹25,000)</option>
                          <option>Ergonomic EDC Backpack (₹18,000)</option>
                        </select>

                        <div className="flex gap-1.5">
                          <input
                            type="url"
                            value={demoPitchUrl}
                            onChange={(e) => setDemoPitchUrl(e.target.value)}
                            placeholder="Public Drive/Loom URL"
                            className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] font-mono text-slate-800 bg-white focus:outline-none focus:border-purple-500"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white font-bold text-xs shadow-xs hover:shadow-sm cursor-pointer border-none flex-shrink-0"
                          >
                            Submit
                          </button>
                        </div>

                        {demoPitchSubmitted && (
                          <motion.div
                            initial={{ opacity: 0, y: 2 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>🚀 Video pitch submitted to brand escrow!</span>
                          </motion.div>
                        )}
                      </form>
                    </div>

                    <p className="text-[10px] text-slate-500 mt-2 text-center">
                      Brands review video concepts and award payouts directly within 48 hours.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* =====================================================
          3. DUAL VALUE PROPOSITIONS (FOR BRANDS & CREATORS)
      ===================================================== */}
      <section id="for-brands" className="py-12 sm:py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* For Brands Pillar */}
            <div className="bg-white rounded-2xl p-5 sm:p-7 border border-purple-100 shadow-[0_4px_20px_rgba(139,92,246,0.04)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-[10px] font-bold uppercase text-purple-700 mb-3">
                  <Building2 className="w-3 h-3" />
                  <span>Enterprise & D2C Growth</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1e1b4b]">
                  Built for High-Growth Brands
                </h3>
                <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Say goodbye to expensive agency retainers and endless creator DMs. BrandForge gives you a streamlined UGC engine designed for ad scale.
                </p>

                <div className="mt-5 space-y-3.5">
                  {[
                    {
                      title: "Custom Creative Briefs",
                      desc: "Define hooks, aspect ratios, talking points, and visual guidelines with prompt tags.",
                      icon: <FileCheck className="w-4 h-4 text-[#7c3aed]" />,
                    },
                    {
                      title: "Escrow-Protected Prize Pools",
                      desc: "Set fixed bounty rewards (₹5,000 to ₹1,00,000+) that build instant creator trust.",
                      icon: <Shield className="w-4 h-4 text-[#7c3aed]" />,
                    },
                    {
                      title: "1-Click Winner Selection",
                      desc: "Review submissions, crown winners with one click, and trigger automated payouts.",
                      icon: <Trophy className="w-4 h-4 text-[#7c3aed]" />,
                    },
                    {
                      title: "Full Commercial Ad Rights",
                      desc: "Instant download of clean uncompressed raw video files ready for Meta & YouTube ads.",
                      icon: <TrendingUp className="w-4 h-4 text-[#7c3aed]" />,
                    },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1e1b4b]">{feature.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={REGISTER_URL}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7c3aed] hover:text-[#6d28d9] group"
                >
                  <span>Launch your first brand campaign</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* For Creators Pillar */}
            <div id="for-creators" className="bg-white rounded-2xl p-5 sm:p-7 border border-purple-100 shadow-[0_4px_20px_rgba(139,92,246,0.04)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#7c3aed] to-[#4f46e5]" />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-[10px] font-bold uppercase text-indigo-700 mb-3">
                  <Palette className="w-3 h-3" />
                  <span>Monetize Your Creativity</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#1e1b4b]">
                  Empowering India's Top Creators
                </h3>
                <p className="mt-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                  No need to wait for sponsorships. Browse live campaigns from verified brands, pitch your video concepts, and get rewarded directly.
                </p>

                <div className="mt-5 space-y-3.5">
                  {[
                    {
                      title: "Guaranteed Prize Pools",
                      desc: "Every live campaign has verified prize pools ready to be awarded to winning pitches.",
                      icon: <DollarSign className="w-4 h-4 text-[#4f46e5]" />,
                    },
                    {
                      title: "Frictionless URL Pitching",
                      desc: "No complicated uploads. Simply paste your Google Drive, YouTube, or Loom links.",
                      icon: <Video className="w-4 h-4 text-[#4f46e5]" />,
                    },
                    {
                      title: "Build Verified Accolades",
                      desc: "Showcase crowned wins on your public creator profile to unlock exclusive brand invites.",
                      icon: <Award className="w-4 h-4 text-[#4f46e5]" />,
                    },
                    {
                      title: "Prompt 24-Hour Payouts",
                      desc: "Receive your rewards directly into your bank account once crowned as winner.",
                      icon: <Zap className="w-4 h-4 text-[#4f46e5]" />,
                    },
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-[#1e1b4b]">{feature.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href={REGISTER_URL}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#4f46e5] hover:text-[#4338ca] group"
                >
                  <span>Join as a creator & browse briefs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* =====================================================
          4. LIVE CAMPAIGN MARKETPLACE EXPLORER
      ===================================================== */}
      <section id="campaigns-explorer" className="py-12 sm:py-16 relative bg-slate-50/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-2">
                <Flame className="w-3 h-3 text-amber-500" />
                <span>Live Marketplace</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">
                Featured Brand Opportunities
              </h2>
              <p className="mt-1 text-slate-600 text-xs sm:text-sm">
                Explore live campaigns open for creator video submissions today.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: "all", label: "All Niches" },
                { id: "tech", label: "Tech & SaaS" },
                { id: "beauty", label: "Beauty & Wellness" },
                { id: "food", label: "Food & Beverage" },
                { id: "fitness", label: "Fitness & Health" },
                { id: "lifestyle", label: "D2C Lifestyle" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setMarketCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                    marketCategory === cat.id
                      ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-xs"
                      : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMarketplace.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-xl p-4 sm:p-5 border border-purple-100/90 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
                      {campaign.tag}
                    </span>
                    <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {campaign.deadline}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-[#1e1b4b] group-hover:text-purple-700 transition-colors line-clamp-2">
                    {campaign.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-500 block mt-0.5">
                    By {campaign.brand}
                  </span>

                  <div className="mt-3 p-2.5 rounded-lg bg-slate-50 text-[11px] text-slate-600 border border-slate-100 leading-normal">
                    <span className="font-bold text-slate-700 block mb-0.5">Brief Hint:</span>
                    {campaign.guidelines}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase block">Reward</span>
                    <span className="text-sm sm:text-base font-black text-emerald-600">{campaign.reward}</span>
                  </div>

                  <a
                    href={REGISTER_URL}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-xs font-bold shadow-xs hover:shadow-sm transition-all"
                  >
                    <span>Pitch</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* =====================================================
          5. INTERACTIVE ROI & EARNINGS CALCULATOR
      ===================================================== */}
      <section id="roi-calculator" className="py-12 sm:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-bold uppercase text-emerald-800 mb-2">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>Value Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">
              Calculate Your Impact on BrandForge
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              See how much you save as a brand or earn as a creator.
            </p>

            {/* Role Tab */}
            <div className="mt-4 inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setCalculatorRole("brand")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer ${
                  calculatorRole === "brand"
                    ? "bg-white text-purple-800 shadow-xs"
                    : "bg-transparent text-slate-500"
                }`}
              >
                🏢 For Brands (Cost Savings)
              </button>
              <button
                onClick={() => setCalculatorRole("creator")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border-none cursor-pointer ${
                  calculatorRole === "creator"
                    ? "bg-white text-purple-800 shadow-xs"
                    : "bg-transparent text-slate-500"
                }`}
              >
                🎨 For Creators (Earnings)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-purple-200/80 shadow-[0_10px_30px_rgba(139,92,246,0.06)]">
            {calculatorRole === "brand" ? (
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-800">
                        Monthly UGC Campaign Budget
                      </label>
                      <span className="text-base font-black text-[#7c3aed]">
                        ₹{brandBudget.toLocaleString()}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10000"
                      max="500000"
                      step="5000"
                      value={brandBudget}
                      onChange={(e) => setBrandBudget(Number(e.target.value))}
                      className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                      <span>₹10,000</span>
                      <span>₹2,50,000</span>
                      <span>₹5,00,000</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-purple-50/60 border border-purple-100 text-[11px] text-slate-600 space-y-0.5">
                    <div className="font-bold text-purple-900">Why BrandForge Outperforms Agencies:</div>
                    <p>Traditional agency video production costs ~₹30k–₹50k/video. On BrandForge, you get multiple vetted creator pitches per bounty pool.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1e1b4b] to-[#31104b] rounded-xl p-5 text-white space-y-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                    Estimated ROI Summary
                  </span>

                  <div>
                    <div className="text-[11px] text-slate-300">Estimated Video Creatives Received</div>
                    <div className="text-2xl font-black text-white mt-0.5">
                      {calculatedVideos} - {calculatedVideos * 3}+ <span className="text-xs font-medium text-purple-200">Ad Concepts</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-purple-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-slate-300">Traditional Agency Cost</div>
                      <div className="text-sm font-bold text-slate-300 line-through">
                        ₹{calculatedAgencyCost.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-300 font-bold">Estimated Savings</div>
                      <div className="text-lg font-black text-emerald-400">
                        ₹{calculatedSavings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs sm:text-sm font-bold text-slate-800">
                        Campaign Concepts Pitched / Month
                      </label>
                      <span className="text-base font-black text-[#7c3aed]">
                        {creatorPitches} Pitches
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="1"
                      value={creatorPitches}
                      onChange={(e) => setCreatorPitches(Number(e.target.value))}
                      className="w-full accent-purple-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                      <span>1 pitch</span>
                      <span>10 pitches</span>
                      <span>20 pitches</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-indigo-50/60 border border-indigo-100 text-[11px] text-slate-600 space-y-0.5">
                    <div className="font-bold text-indigo-900">Creator Earning Potential:</div>
                    <p>Top creators pitch 4–8 brand campaigns monthly with average reward sizes of ₹15,000–₹35,000.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1e1b4b] to-[#31104b] rounded-xl p-5 text-white space-y-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300">
                    Projected Monthly Earnings
                  </span>

                  <div>
                    <div className="text-[11px] text-slate-300">Estimated Monthly Creator Income</div>
                    <div className="text-2xl font-black text-emerald-400 mt-0.5">
                      ₹{calculatedCreatorEarnings.toLocaleString()} <span className="text-xs font-normal text-slate-300">/ mo</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-purple-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-[10px] text-slate-300">Annualized Run Rate</div>
                      <div className="text-sm font-bold text-white">
                        ₹{(calculatedCreatorEarnings * 12).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-purple-300">Payout Speed</div>
                      <div className="text-xs font-bold text-white">Within 24 Hours</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* =====================================================
          6. HOW IT WORKS (3-STEP WORKFLOW)
      ===================================================== */}
      <section id="how-it-works" className="py-12 sm:py-16 relative bg-slate-50/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3 h-3 text-purple-600" />
              <span>Simple 3-Step Process</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">
              How BrandForge Operates
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              A frictionless collaboration engine connecting brands with top creators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: "01",
                title: "Post or Discover Briefs",
                desc: "Brands set targeted campaign rules & prize pools. Creators browse verified briefs matching their niche.",
                badge: "Step 1: Initiation",
              },
              {
                step: "02",
                title: "Pitch & Review Videos",
                desc: "Creators submit uncompressed Google Drive or YouTube links. Brands review submissions in a clean dashboard.",
                badge: "Step 2: Submissions",
              },
              {
                step: "03",
                title: "Crown Winner & Payout",
                desc: "Brands crown winning creators with 1-click. Creators get instant payouts and brands gain full ad rights.",
                badge: "Step 3: Crown & Reward",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-purple-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] hover:border-purple-300 hover:shadow-md transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#8b5cf6] to-[#4f46e5]" />
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 text-[#7c3aed] font-black text-base flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                      {step.badge}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#1e1b4b] mb-1.5">{step.title}</h4>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[11px] font-bold text-purple-700">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  <span>Escrow Protected</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* =====================================================
          7. FAQ ACCORDION
      ===================================================== */}
      <section id="faq" className="py-12 sm:py-16 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-1 text-slate-600 text-xs sm:text-sm">
              Everything you need to know about BrandForge's creator campaign ecosystem.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "How does payment escrow work on BrandForge?",
                a: "When a brand creates a campaign, the reward pool is safely held in escrow. Once the brand selects and crowns the winning creator, the payout is automatically transferred directly to the creator's verified account within 24 hours.",
              },
              {
                q: "What format should creators submit their video pitches in?",
                a: "Creators can submit publicly accessible Google Drive folders, YouTube unlisted links, Dropbox links, Loom recordings, or Vimeo links. This eliminates file size limits and compression issues.",
              },
              {
                q: "Do brands receive full commercial rights to winning videos?",
                a: "Yes! Once a creator is crowned as the winner and reward payout is initiated, the brand receives 100% full commercial usage rights for organic social media, Meta Ads, TikTok Ads, YouTube Shorts, and website marketing.",
              },
              {
                q: "Is there any minimum follower requirement for creators to participate?",
                a: "No! BrandForge values authentic creative storytelling and high-converting video hooks over follower counts. Anyone with creative talent and a smartphone can pitch concepts and win bounties.",
              },
              {
                q: "How fast are campaigns approved and made live?",
                a: "Our admin moderation team verifies briefs within 2 hours to ensure clear creative parameters and safe reward pools before opening them up to creators.",
              },
            ].map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-purple-100/90 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-[#1e1b4b] hover:text-[#7c3aed] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-600 transition-transform duration-200 flex-shrink-0 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          8. HIGH-CONVERSION CTA BANNER
      ===================================================== */}
      <section className="py-12 sm:py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl p-6 sm:p-10 text-center text-white relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#31104b] to-[#180d38] border border-purple-500/30 shadow-[0_12px_36px_rgba(76,29,149,0.25)]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-purple-200 mb-4 backdrop-blur-md">
                <Sparkles className="w-3 h-3 text-purple-300" />
                <span>Ready to Transform Your UGC Marketing?</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Launch Your Next Campaign with{" "}
                <span className="bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
                  BrandForge
                </span>
              </h2>

              <p className="mt-2.5 text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Join over 500+ top brands and 10,000+ creators forging high-converting campaigns every day.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={REGISTER_URL}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-purple-500/40 transition-all"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Launch Campaign</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={REGISTER_URL}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-xs sm:text-sm hover:bg-white/20 transition-all backdrop-blur-md"
                >
                  <Palette className="w-4 h-4 text-purple-300" />
                  <span>Join as Creator</span>
                </a>
              </div>

              <p className="mt-5 text-[11px] text-slate-400">
                🔒 Bank-grade Escrow Protection • 24/7 Creator Support • Instant Rights Handover
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          9. FOOTER
      ===================================================== */}
      <footer className="bg-white border-t border-purple-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/favi.png"
                alt="BrandForge"
                className="w-7 h-7 rounded-lg object-contain flex-shrink-0 shadow-xs"
              />
              <div className="flex flex-col">
                <span className="text-base font-black text-[#1e1b4b] leading-tight">
                  Brand<span className="bg-gradient-to-r from-[#7C3AED] to-[#6366F1] bg-clip-text text-transparent">Forge</span>
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600">
              <a href={LOGIN_URL} className="hover:text-purple-700 transition-colors">
                Brand Portal
              </a>
              <a href={LOGIN_URL} className="hover:text-purple-700 transition-colors">
                Creator Portal
              </a>
              <a href={REGISTER_URL} className="hover:text-purple-700 transition-colors">
                Register
              </a>
              <a href={LOGIN_URL} className="hover:text-purple-700 transition-colors">
                Sign In
              </a>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
            <div>
              © {new Date().getFullYear()} BrandForge Collab Hub. All rights reserved.
            </div>
            <div className="flex items-center gap-3">
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
              <span>•</span>
              <span>Community Guidelines</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

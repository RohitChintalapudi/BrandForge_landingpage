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
} from "lucide-react";
import Navbar from "./Navbar.jsx";
import SectionDivider from "./SectionDivider.jsx";
import { REGISTER_URL, LOGIN_URL } from "../config/appUrls.js";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
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
        particleCount: 120,
        spread: 80,
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

  // Mock campaigns for interactive dashboard demo
  const demoBrandCampaigns = [
    {
      id: "c1",
      title: "Summer Glow Vitamin C Serum UGC Video",
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
      title: "FinFlow Mobile App 30s Viral Hook Ad",
      brand: "FinFlow Technologies",
      reward: "₹35,000",
      status: "pending",
      submissionsCount: 0,
      deadline: "Oct 28, 2026",
      category: "Tech & Fintech",
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
  ];

  // Campaign Marketplace Live Teasers
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
      guidelines: "9:16 Vertical, energetic coffee brewing hook, natural lighting.",
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
      guidelines: "Screen capture + talking head, show real-time meeting transcription.",
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
      guidelines: "Unboxing + unboxing sachet pour, taste reaction test.",
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
      guidelines: "Gym/Outdoor running footage, heart rate sensor feature highlight.",
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
      guidelines: "ASMR unboxing, RFID blocking showcase, pocket fit check.",
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
      guidelines: "Relatable monthly salary spending humor, app expense categorizer.",
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
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen font-['Plus_Jakarta_Sans',sans-serif] selection:bg-purple-200 selection:text-purple-900 overflow-x-hidden">
      <Navbar />

      {/* =====================================================
          1. HERO SECTION
      ===================================================== */}
      <section id="hero" className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        {/* Ambient background glows matching in-app atmosphere */}
        <div className="hero-glow-orb-left" />
        <div className="hero-glow-orb-right" />
        <div className="ambient-mesh-pattern" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col items-center text-center max-w-4xl mx-auto"
          >
            {/* Live Role Badge Chip */}
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-purple-200/80 shadow-[0_2px_10px_rgba(139,92,246,0.12)] mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-purple-900">
                Next-Gen UGC Creator & Brand Marketplace
              </span>
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1e1b4b] tracking-tight leading-[1.12]"
            >
              Where Top Brands & Creators{" "}
              <span className="bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#4f46e5] bg-clip-text text-transparent">
                Forge Winning Campaigns
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeIn}
              className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed"
            >
              Launch targeted creative briefs, receive high-converting user-generated video pitches, crown winners in 1-click, and supercharge your organic & paid ad performance.
            </motion.p>

            {/* Dual CTA Buttons */}
            <motion.div
              variants={fadeIn}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
            >
              <motion.a
                href={REGISTER_URL}
                whileHover={{ y: -2, boxShadow: "0 12px 28px rgba(124, 58, 237, 0.35)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] text-white font-bold text-base shadow-[0_8px_20px_rgba(124,58,237,0.25)] transition-all"
              >
                <Building2 className="w-5 h-5" />
                <span>Launch a Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href={REGISTER_URL}
                whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 1)", borderColor: "rgba(139, 92, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white/90 border-2 border-purple-200/80 text-[#1e1b4b] font-bold text-base shadow-sm hover:shadow-md transition-all"
              >
                <Palette className="w-5 h-5 text-[#7c3aed]" />
                <span>Join as Creator</span>
              </motion.a>
            </motion.div>

            {/* Quick Feature Highlights */}
            <motion.div
              variants={fadeIn}
              className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero agency overhead</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Guaranteed prize pools</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Full commercial usage rights</span>
              </div>
            </motion.div>

            {/* Platform Metrics Bar */}
            <motion.div
              variants={fadeIn}
              className="mt-16 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                {
                  value: "500+",
                  label: "Brand Campaigns",
                  icon: <Zap className="w-4 h-4 text-[#7c3aed]" />,
                },
                {
                  value: "10,000+",
                  label: "Active Creators",
                  icon: <Users className="w-4 h-4 text-[#7c3aed]" />,
                },
                {
                  value: "₹2.5Cr+",
                  label: "Paid to Creators",
                  icon: <Trophy className="w-4 h-4 text-[#7c3aed]" />,
                },
                {
                  value: "99.2%",
                  label: "Satisfaction Rate",
                  icon: <Award className="w-4 h-4 text-[#7c3aed]" />,
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-5 border border-purple-100 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-purple-300 hover:shadow-[0_8px_24px_rgba(139,92,246,0.08)] transition-all text-left relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5cf6] to-[#4f46e5] opacity-80" />
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl sm:text-3xl font-black text-[#1e1b4b] tracking-tight">
                      {stat.value}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
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
      <section id="live-demo" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/70 border border-purple-200 text-xs font-bold uppercase tracking-wider text-purple-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Interactive Command Experience</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#1e1b4b] tracking-tight">
              Experience the Dashboard in Action
            </h2>
            <p className="mt-3 text-base sm:text-lg text-slate-600">
              Toggle between the dual portals to explore how Brands manage campaigns and how Creators discover and pitch winning concepts.
            </p>

            {/* Portal Switcher Tabs */}
            <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-white border border-purple-200 shadow-sm">
              <button
                onClick={() => setDashboardView("brand")}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer border-none transition-all ${
                  dashboardView === "brand"
                    ? "bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-md shadow-purple-500/20"
                    : "bg-transparent text-slate-600 hover:text-purple-700"
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>🏢 Brand Management Portal</span>
              </button>

              <button
                onClick={() => setDashboardView("creator")}
                className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer border-none transition-all ${
                  dashboardView === "creator"
                    ? "bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-md shadow-purple-500/20"
                    : "bg-transparent text-slate-600 hover:text-purple-700"
                }`}
              >
                <Palette className="w-4 h-4" />
                <span>🎨 Creator Pitch & Growth Portal</span>
              </button>
            </div>
          </div>

          {/* Interactive Mockup Container */}
          <div className="bg-[#f8fafc] rounded-3xl border border-purple-200/80 shadow-[0_20px_50px_rgba(139,92,246,0.12)] p-4 sm:p-8 relative overflow-hidden">
            {/* Top Mockup Browser Chrome */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-purple-100">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs font-semibold text-slate-400 font-mono hidden sm:inline">
                  {dashboardView === "brand"
                    ? "https://brand-forge-frontend.vercel.app/brand/dashboard"
                    : "https://brand-forge-frontend.vercel.app/creator/dashboard"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Live Interactive Sandbox</span>
              </div>
            </div>

            {/* VIEW A: BRAND DASHBOARD MOCKUP */}
            {dashboardView === "brand" && (
              <div className="space-y-6">
                {/* Brand Welcome Banner matching in-app style */}
                <div className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#31104b] to-[#180d38] border border-purple-500/30 shadow-lg">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-indigo-200 mb-3 backdrop-blur-md">
                        <span>🏢 Brand Management Portal</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        Welcome back, EcoGlow Brands 👋
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        Create high-impact creator campaigns, monitor submissions in real-time, and crown top talent.
                      </p>
                    </div>

                    <div>
                      <a
                        href={REGISTER_URL}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white font-bold text-sm shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
                      >
                        <span className="text-lg leading-none font-bold">+</span>
                        <span>Create Campaign</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Campaigns</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">All-time</span>
                    </div>
                    <div className="text-3xl font-black text-[#1e1b4b]">18</div>
                    <div className="text-xs text-slate-500 mt-1">Active campaign portfolio</div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live & Approved</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Live</span>
                    </div>
                    <div className="text-3xl font-black text-emerald-600">12</div>
                    <div className="text-xs text-slate-500 mt-1">Open for creator submissions</div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Review</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">Review</span>
                    </div>
                    <div className="text-3xl font-black text-amber-600">2</div>
                    <div className="text-xs text-slate-500 mt-1">Awaiting admin verification</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-5 border border-purple-200 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Total Submissions</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-purple-200/60 text-purple-900 font-bold">Pitches</span>
                    </div>
                    <div className="text-3xl font-black text-[#7c3aed]">46</div>
                    <div className="text-xs text-purple-700 mt-1">High-converting video concepts</div>
                  </div>
                </div>

                {/* Campaign Explorer Controls & Table/Cards */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-purple-100 shadow-sm space-y-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-black text-[#1e1b4b]">Active Brand Campaigns</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                        {filteredDemoCampaigns.length}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Search */}
                      <div className="relative">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="Search campaigns..."
                          value={demoSearchQuery}
                          onChange={(e) => setDemoSearchQuery(e.target.value)}
                          className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-purple-500 bg-slate-50"
                        />
                      </div>

                      {/* Filter Pills */}
                      <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                        {["all", "approved", "pending"].map((filterKey) => (
                          <button
                            key={filterKey}
                            onClick={() => setDemoBrandFilter(filterKey)}
                            className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition-all border-none cursor-pointer ${
                              demoBrandFilter === filterKey
                                ? "bg-white text-purple-800 shadow-xs"
                                : "bg-transparent text-slate-500 hover:text-slate-900"
                            }`}
                          >
                            {filterKey}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Campaign Cards Grid */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {filteredDemoCampaigns.map((camp) => (
                      <div
                        key={camp.id}
                        className="rounded-xl p-4 border border-purple-100/90 bg-slate-50/50 hover:bg-white hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-[0.68rem] px-2 py-0.5 rounded-full font-bold uppercase ${
                                camp.status === "approved"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {camp.status}
                            </span>
                            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {camp.deadline}
                            </span>
                          </div>

                          <h5 className="font-bold text-sm text-[#1e1b4b] line-clamp-2">
                            {camp.title}
                          </h5>
                          <span className="text-xs text-purple-600 font-semibold block mt-1">
                            {camp.brand} • {camp.category}
                          </span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between">
                          <div>
                            <span className="text-[0.65rem] text-slate-400 uppercase font-bold block">Reward Pool</span>
                            <span className="text-sm font-black text-purple-800">{camp.reward}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[0.65rem] text-slate-400 uppercase font-bold block">Pitches</span>
                            <span className="text-xs font-bold text-slate-700">{camp.submissionsCount} Creator Videos</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Winner Crowning Simulation Box */}
                  <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50 border border-purple-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-amber-500" />
                          <h5 className="font-bold text-sm text-[#1e1b4b]">
                            Interactive Demo: Review & Crown Winner
                          </h5>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          Click <strong>"Crown as Winner"</strong> on any submitted creator pitch to trigger real-time winner selection & celebratory confetti.
                        </p>
                      </div>

                      {demoWinnerId && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold">
                          <span>🏆 Winner Crowned: {demoSubmissions.find((s) => s.id === demoWinnerId)?.creatorName}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {demoSubmissions.map((sub) => {
                        const isWon = demoWinnerId === sub.id;
                        return (
                          <div
                            key={sub.id}
                            className={`p-4 rounded-xl bg-white border transition-all flex flex-col justify-between ${
                              isWon
                                ? "border-amber-400 ring-2 ring-amber-300 shadow-md"
                                : "border-slate-200 hover:border-purple-300"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                                    {sub.creatorName.slice(0, 1)}
                                  </span>
                                  <div>
                                    <span className="font-bold text-xs text-slate-900 block">{sub.creatorName}</span>
                                    <span className="text-[0.68rem] text-slate-500">{sub.handle}</span>
                                  </div>
                                </div>
                                <p className="text-xs font-semibold text-slate-700 mt-2">
                                  "{sub.videoTitle}"
                                </p>
                                <span className="text-[0.68rem] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-mono inline-block mt-1">
                                  {sub.platform}
                                </span>
                              </div>

                              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-500" /> {sub.rating}
                              </span>
                            </div>

                            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                              <span className="text-[0.68rem] text-slate-400">{sub.submittedTime}</span>

                              <button
                                onClick={() => handleSelectWinnerDemo(sub.id)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all border-none ${
                                  isWon
                                    ? "bg-amber-500 text-white shadow-sm"
                                    : "bg-purple-600 text-white hover:bg-purple-700"
                                }`}
                              >
                                {isWon ? "🏆 Crowned Winner!" : "Crown as Winner 👑"}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW B: CREATOR DASHBOARD MOCKUP */}
            {dashboardView === "creator" && (
              <div className="space-y-6">
                {/* Creator Welcome Banner */}
                <div className="rounded-2xl p-6 sm:p-8 text-white relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#31104b] to-[#180d38] border border-purple-500/30 shadow-lg">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="max-w-xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-300/30 text-xs font-bold text-purple-200 mb-3 backdrop-blur-md">
                        <span>🎨 Creator Growth & Pitch Portal</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white">
                        Welcome back, Creator Aisha 👋
                      </h3>
                      <p className="mt-1 text-sm text-slate-300">
                        Discover live brand opportunities, pitch your creative video concepts, track review statuses, and celebrate winning rewards.
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={triggerConfetti}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm shadow-lg hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all border-none cursor-pointer"
                      >
                        <Trophy className="w-4 h-4" />
                        <span>Celebrate Wins (3)</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Creator Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Open Opportunities</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">Live</span>
                    </div>
                    <div className="text-3xl font-black text-emerald-600">24</div>
                    <div className="text-xs text-slate-500 mt-1">Ready for your video pitch</div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Pitches Submitted</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">Total</span>
                    </div>
                    <div className="text-3xl font-black text-[#1e1b4b]">8</div>
                    <div className="text-xs text-slate-500 mt-1">Collaborations in pipeline</div>
                  </div>

                  <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Crowned Wins</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-bold border border-amber-200">🏆 3 Wins</span>
                    </div>
                    <div className="text-3xl font-black text-amber-600">3</div>
                    <div className="text-xs text-slate-500 mt-1">Winning campaigns awarded</div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-amber-50/50 rounded-2xl p-5 border border-purple-200 shadow-sm">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Total Earnings</span>
                      <span className="text-[0.68rem] px-2 py-0.5 rounded-full bg-purple-200/60 text-purple-900 font-bold">💎 Payout</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#7c3aed]">₹75,000</div>
                    <div className="text-xs text-purple-700 mt-1">All-time creator payouts</div>
                  </div>
                </div>

                {/* Wins Spotlight Accolade Banner */}
                <div className="rounded-2xl p-5 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-300/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
                      🏆
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800">⭐ Top Creator Accolade</span>
                      <h4 className="text-base font-bold text-slate-900">You have won 3 brand campaigns!</h4>
                      <p className="text-xs text-slate-600">Total awarded earnings: <strong>₹75,000</strong>. Keep pitching high quality content to win more bounties!</p>
                    </div>
                  </div>
                  <button
                    onClick={triggerConfetti}
                    className="px-4 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 font-bold text-xs shadow-xs hover:bg-amber-50 cursor-pointer"
                  >
                    🎉 Confetti Burst
                  </button>
                </div>

                {/* Interactive Submission Pitch Simulator */}
                <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
                  <h4 className="text-base font-black text-[#1e1b4b] mb-1">
                    Interactive Creator Pitch Simulator
                  </h4>
                  <p className="text-xs text-slate-600 mb-4">
                    Try submitting a Drive, Loom, or YouTube video link to experience our instant submission engine.
                  </p>

                  <form onSubmit={handleSubmitPitchDemo} className="space-y-4 max-w-2xl">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Select Campaign Target
                      </label>
                      <select className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:border-purple-500">
                        <option>Summer Glow Vitamin C Serum UGC Reel (Reward: ₹25,000)</option>
                        <option>Smart Ergonomic Backpack Everyday Carry (Reward: ₹18,000)</option>
                        <option>SuperCoffee Energy Brew 30s Hook (Reward: ₹30,000)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Media or Public Drive URL
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={demoPitchUrl}
                          onChange={(e) => setDemoPitchUrl(e.target.value)}
                          placeholder="https://drive.google.com/file/d/..."
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-slate-800 bg-slate-50 focus:outline-none focus:border-purple-500"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white font-bold text-xs shadow-md hover:shadow-purple-500/30 flex items-center gap-1.5 cursor-pointer border-none"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Pitch</span>
                        </button>
                      </div>
                    </div>

                    {demoPitchSubmitted && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>🚀 Pitch concept submitted successfully to brand partner!</span>
                      </motion.div>
                    )}
                  </form>
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
      <section id="for-brands" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* For Brands Pillar */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-[0_10px_30px_rgba(139,92,246,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed]" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-bold uppercase text-purple-700 mb-4">
                <Building2 className="w-3.5 h-3.5" />
                <span>Enterprise & D2C Growth</span>
              </div>
              <h3 className="text-3xl font-black text-[#1e1b4b]">
                Built for High-Growth Brands
              </h3>
              <p className="mt-3 text-slate-600 text-base leading-relaxed">
                Say goodbye to expensive agency retainers and endless creator DMs. BrandForge gives you a streamlined UGC engine designed for ad scale.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "Custom Creative Briefs",
                    desc: "Define hooks, aspect ratios, talking points, and visual guidelines with prompt tags.",
                    icon: <FileCheck className="w-5 h-5 text-[#7c3aed]" />,
                  },
                  {
                    title: "Escrow-Protected Prize Pools",
                    desc: "Set fixed bounty rewards (₹5,000 to ₹1,00,000+) that build instant creator trust.",
                    icon: <Shield className="w-5 h-5 text-[#7c3aed]" />,
                  },
                  {
                    title: "1-Click Winner Selection",
                    desc: "Review submissions, crown winners with one click, and trigger automated payouts.",
                    icon: <Trophy className="w-5 h-5 text-[#7c3aed]" />,
                  },
                  {
                    title: "Full Commercial Ad Rights",
                    desc: "Instant download of clean uncompressed raw video files ready for Meta, TikTok & YouTube ads.",
                    icon: <TrendingUp className="w-5 h-5 text-[#7c3aed]" />,
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 border border-purple-100">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1e1b4b]">{feature.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href={REGISTER_URL}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#7c3aed] hover:text-[#6d28d9] group"
                >
                  <span>Launch your first brand campaign</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* For Creators Pillar */}
            <div id="for-creators" className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-[0_10px_30px_rgba(139,92,246,0.06)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#7c3aed] to-[#4f46e5]" />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold uppercase text-indigo-700 mb-4">
                <Palette className="w-3.5 h-3.5" />
                <span>Monetize Your Creativity</span>
              </div>
              <h3 className="text-3xl font-black text-[#1e1b4b]">
                Empowering India's Top Creators
              </h3>
              <p className="mt-3 text-slate-600 text-base leading-relaxed">
                No need to wait for sponsorships. Browse live campaigns from verified brands, pitch your video concepts, and get rewarded directly.
              </p>

              <div className="mt-8 space-y-5">
                {[
                  {
                    title: "Guaranteed Prize Pools",
                    desc: "Every live campaign has verified prize pools ready to be awarded to winning pitches.",
                    icon: <DollarSign className="w-5 h-5 text-[#4f46e5]" />,
                  },
                  {
                    title: "Frictionless URL Pitching",
                    desc: "No complicated uploads. Simply paste your Google Drive, YouTube, Loom, or Dropbox links.",
                    icon: <Video className="w-5 h-5 text-[#4f46e5]" />,
                  },
                  {
                    title: "Build Verified Accolades",
                    desc: "Showcase crowned wins on your public creator profile to unlock exclusive brand invites.",
                    icon: <Award className="w-5 h-5 text-[#4f46e5]" />,
                  },
                  {
                    title: "Prompt 24-Hour Payouts",
                    desc: "Receive your rewards directly into your bank account once crowned as winner.",
                    icon: <Zap className="w-5 h-5 text-[#4f46e5]" />,
                  },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 border border-indigo-100">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-[#1e1b4b]">{feature.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100">
                <a
                  href={REGISTER_URL}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#4f46e5] hover:text-[#4338ca] group"
                >
                  <span>Join as a creator & browse briefs</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
      <section id="campaigns-explorer" className="py-20 relative bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Live Marketplace</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b] tracking-tight">
                Featured Brand Opportunities
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Explore live campaigns from top brands open for video submissions today.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: "all", label: "All Niches" },
                { id: "tech", label: "Tech & SaaS" },
                { id: "beauty", label: "Beauty & Wellness" },
                { id: "food", label: "Food & Beverage" },
                { id: "fitness", label: "Fitness & Lifestyle" },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setMarketCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    marketCategory === cat.id
                      ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarketplace.map((campaign) => (
              <div
                key={campaign.id}
                className="bg-white rounded-2xl p-6 border border-purple-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-purple-300 hover:shadow-[0_12px_30px_rgba(139,92,246,0.1)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[0.68rem] px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 font-bold border border-purple-200">
                      {campaign.tag}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {campaign.deadline}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[#1e1b4b] group-hover:text-purple-700 transition-colors line-clamp-2">
                    {campaign.title}
                  </h4>
                  <span className="text-xs font-semibold text-slate-500 block mt-1">
                    By {campaign.brand}
                  </span>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 text-xs text-slate-600 border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-0.5">Brief Hint:</span>
                    {campaign.guidelines}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[0.68rem] font-bold text-slate-400 uppercase block">Reward Pool</span>
                    <span className="text-lg font-black text-emerald-600">{campaign.reward}</span>
                  </div>

                  <a
                    href={REGISTER_URL}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
                  >
                    <span>Pitch Concept</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
      <section id="roi-calculator" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold uppercase text-emerald-800 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Value Estimator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b] tracking-tight">
              Calculate Your Impact on BrandForge
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              See how much you save as a brand or earn as a creator.
            </p>

            {/* Role Tab */}
            <div className="mt-6 inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
              <button
                onClick={() => setCalculatorRole("brand")}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all border-none cursor-pointer ${
                  calculatorRole === "brand"
                    ? "bg-white text-purple-800 shadow-xs"
                    : "bg-transparent text-slate-500"
                }`}
              >
                🏢 For Brands (Cost Savings & Video Yield)
              </button>
              <button
                onClick={() => setCalculatorRole("creator")}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all border-none cursor-pointer ${
                  calculatorRole === "creator"
                    ? "bg-white text-purple-800 shadow-xs"
                    : "bg-transparent text-slate-500"
                }`}
              >
                🎨 For Creators (Monthly Income Projection)
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-purple-200/80 shadow-[0_16px_40px_rgba(139,92,246,0.08)]">
            {calculatorRole === "brand" ? (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-slate-800">
                        Monthly UGC Campaign Budget
                      </label>
                      <span className="text-lg font-black text-[#7c3aed]">
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
                      className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[0.68rem] text-slate-400 mt-1 font-semibold">
                      <span>₹10,000</span>
                      <span>₹2,50,000</span>
                      <span>₹5,00,000</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-slate-600 space-y-1">
                    <div className="font-bold text-purple-900">Why BrandForge Outperforms Agencies:</div>
                    <p>Traditional video production costs ~₹30,000 - ₹50,000 per video. On BrandForge, you get multiple vetted creator pitches per bounty pool.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1e1b4b] to-[#31104b] rounded-2xl p-6 sm:p-8 text-white space-y-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Estimated ROI Summary
                  </span>

                  <div>
                    <div className="text-xs text-slate-300">Estimated Video Creatives Received</div>
                    <div className="text-3xl font-black text-white mt-0.5">
                      {calculatedVideos} - {calculatedVideos * 3}+ <span className="text-base font-medium text-purple-200">Ad Concepts</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-slate-300">Traditional Agency Cost</div>
                      <div className="text-lg font-bold text-slate-300 line-through">
                        ₹{calculatedAgencyCost.toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-emerald-300 font-bold">Estimated Savings</div>
                      <div className="text-xl font-black text-emerald-400">
                        ₹{calculatedSavings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-slate-800">
                        Campaign Concepts Pitched / Month
                      </label>
                      <span className="text-lg font-black text-[#7c3aed]">
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
                      className="w-full accent-purple-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[0.68rem] text-slate-400 mt-1 font-semibold">
                      <span>1 pitch</span>
                      <span>10 pitches</span>
                      <span>20 pitches</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-slate-600 space-y-1">
                    <div className="font-bold text-indigo-900">Creator Earning Potential:</div>
                    <p>Top creators pitch 4–8 brand campaigns monthly, maintaining a 40–60% win rate with average reward sizes of ₹15,000–₹35,000.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#1e1b4b] to-[#31104b] rounded-2xl p-6 sm:p-8 text-white space-y-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                    Projected Monthly Earnings
                  </span>

                  <div>
                    <div className="text-xs text-slate-300">Estimated Monthly Creator Income</div>
                    <div className="text-3xl font-black text-emerald-400 mt-0.5">
                      ₹{calculatedCreatorEarnings.toLocaleString()} <span className="text-sm font-normal text-slate-300">/ mo</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-purple-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-xs text-slate-300">Annualized Run Rate</div>
                      <div className="text-lg font-bold text-white">
                        ₹{(calculatedCreatorEarnings * 12).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-purple-300">Payout Speed</div>
                      <div className="text-sm font-bold text-white">Within 24 Hours</div>
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
      <section id="how-it-works" className="py-20 relative bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              <span>Simple 3-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b] tracking-tight">
              How BrandForge Operates
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              A frictionless collaboration engine connecting brands with top creators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Post or Discover Briefs",
                desc: "Brands set targeted campaign rules, reward pools, and aspect ratios. Creators browse verified opportunities matching their niche.",
                badge: "Step 1: Initiation",
              },
              {
                step: "02",
                title: "Pitch & Review Videos",
                desc: "Creators submit uncompressed Google Drive, YouTube, or Dropbox video concept links. Brands review submissions in a clean dashboard.",
                badge: "Step 2: Creative Submissions",
              },
              {
                step: "03",
                title: "Crown Winner & Payout",
                desc: "Brands crown the winning creator with 1-click. Creators get instant reward payouts and brands gain full commercial ad rights.",
                badge: "Step 3: Crown & Reward",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-purple-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-purple-300 hover:shadow-lg transition-all relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8b5cf6] to-[#4f46e5]" />
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 text-[#7c3aed] font-black text-xl flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-[0.68rem] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                      {step.badge}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-[#1e1b4b] mb-2">{step.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-purple-700">
                  <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
                  <span>Verified Escrow Protected</span>
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
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#1e1b4b] tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Everything you need to know about BrandForge's creator campaign ecosystem.
            </p>
          </div>

          <div className="space-y-4">
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
                className="bg-white rounded-2xl border border-purple-100/90 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-base text-[#1e1b4b] hover:text-[#7c3aed] transition-colors border-none bg-transparent cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 transition-transform duration-200 flex-shrink-0 ${
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
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
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
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-16 text-center text-white relative overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#31104b] to-[#180d38] border border-purple-500/30 shadow-[0_20px_50px_rgba(76,29,149,0.3)]">
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-purple-200 mb-6 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-purple-300" />
                <span>Ready to Transform Your UGC Marketing?</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Launch Your Next Campaign with{" "}
                <span className="bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#a855f7] bg-clip-text text-transparent">
                  BrandForge
                </span>
              </h2>

              <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                Join over 500+ top brands and 10,000+ creators forging high-converting campaigns every day.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={REGISTER_URL}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] via-[#7c3aed] to-[#4f46e5] text-white font-bold text-base shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all"
                >
                  <Building2 className="w-5 h-5" />
                  <span>Launch Campaign</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={REGISTER_URL}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white font-bold text-base hover:bg-white/20 transition-all backdrop-blur-md"
                >
                  <Palette className="w-5 h-5 text-purple-300" />
                  <span>Join as Creator</span>
                </a>
              </div>

              <p className="mt-8 text-xs text-slate-400">
                🔒 Bank-grade Escrow Protection • 24/7 Creator Support • Instant Rights Handover
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          9. FOOTER
      ===================================================== */}
      <footer className="bg-white border-t border-purple-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <img
                src="/favi.png"
                alt="BrandForge"
                className="w-8 h-8 rounded-xl object-contain flex-shrink-0 shadow-xs"
              />
              <div className="flex flex-col">
                <span className="text-lg font-black text-[#1e1b4b] leading-tight">
                  Brand<span className="bg-gradient-to-r from-[#7C3AED] to-[#6366F1] bg-clip-text text-transparent">Forge</span>
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-600">
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

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} BrandForge Collab Hub. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
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

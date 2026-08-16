import React, { useEffect, useState } from "react";
import { motion, useAnimation, useScroll, useTransform } from "framer-motion";
import {
  ChevronRight,
  Sparkles,
  Zap,
  Trophy,
  Users,
  BarChart3,
  Shield,
  Award,
} from "lucide-react";
import Navbar from "./Navbar.jsx";
import { REGISTER_URL, LOGIN_URL } from "../config/appUrls.js";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideIn = (direction) => ({
  hidden: {
    opacity: 0,
    x: direction === "left" ? -80 : direction === "right" ? 80 : 0,
    y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

const LandingPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const controls = useAnimation();

  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const featuresY = useTransform(scrollY, [300, 800], [0, -50]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    controls.start("visible");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [controls]);

  return (
    <div className="bg-[#0a071b] text-gray-100 min-h-screen font-['Outfit'] overflow-x-hidden">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-40 overflow-hidden bg-gradient-to-br from-[#0c0824] via-[#0a071b] to-[#070514] min-h-screen flex items-center">
        {/* Animated ambient glow blobs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-gradient-to-r from-purple-500/15 to-purple-600/15 rounded-full blur-[120px] pointer-events-none"
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-[140px] pointer-events-none"
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Small floating sparkles background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-purple-400/40 rounded-full"
              initial={{
                x: Math.random() * 1200,
                y: Math.random() * 800,
                scale: 0,
              }}
              animate={{
                scale: [0, 1.2, 0],
                x: [
                  Math.random() * 1200,
                  Math.random() * 1200,
                ],
                y: [
                  Math.random() * 800,
                  Math.random() * 800,
                ],
              }}
              transition={{
                duration: Math.random() * 12 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col items-center">
          <motion.div
            className="relative max-w-5xl mx-auto text-center"
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
            style={{ y: heroY }}
          >
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-950/40 border border-purple-500/30 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold text-purple-200">
                Revolutionizing UGC Marketing
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight"
              variants={fadeUp}
            >
              <span className="relative inline-block">
                Crowdsourced
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#a855f7] to-[#6366f1]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 1 }}
                />
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
                Marketing
              </span>
              <br />
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#a855f7]">
                  Powered by Creators
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-4 -right-8 w-8 h-8"
                >
                  <Sparkles className="w-7 h-7 text-purple-400/50" />
                </motion.div>
              </span>
            </motion.h1>

            <motion.p
              className="mt-8 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              variants={fadeUp}
            >
              Launch UGC campaigns, collect powerful ad creatives, and reward{" "}
              <span className="relative mx-1 font-bold text-white">
                creators
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#a855f7]"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                />
              </span>{" "}
              — all in one dark-sky powered command dashboard.
            </motion.p>

            <motion.div
              className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
              variants={fadeUp}
            >
              <motion.a
                href={REGISTER_URL}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 15px 30px rgba(124, 58, 237, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white font-bold rounded-xl shadow-lg transition-all duration-300 overflow-hidden inline-block text-decoration-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Launch a Campaign
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9]"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>

              <motion.a
                href={REGISTER_URL}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderColor: "rgba(168, 85, 247, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-white/5 border-2 border-white/10 text-white font-bold rounded-xl transition-all duration-300 inline-block text-decoration-none"
              >
                <span className="flex cursor-pointer items-center gap-2">
                  Join as Creator
                  <Users className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors" />
                </span>
              </motion.a>
            </motion.div>

            {/* Stat Badges Grid */}
            <motion.div
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                {
                  value: "500+",
                  label: "Active Campaigns",
                  icon: <Zap className="w-5 h-5" />,
                },
                {
                  value: "10K+",
                  label: "Creators",
                  icon: <Users className="w-5 h-5" />,
                },
                {
                  value: "₹2Cr+",
                  label: "Paid to Creators",
                  icon: <Trophy className="w-5 h-5" />,
                },
                {
                  value: "95%",
                  label: "Satisfaction Rate",
                  icon: <Award className="w-5 h-5" />,
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden"
                  variants={scaleIn}
                  whileHover={{
                    y: -8,
                    borderColor: "rgba(168, 85, 247, 0.3)",
                    boxShadow: "0 20px 40px rgba(124, 58, 237, 0.12)",
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 to-indigo-500 opacity-60" />
                  <div className="flex items-center justify-center gap-2 text-purple-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-purple-200 mt-1 font-semibold tracking-wider uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-[#070514] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a071b] via-[#070514] to-[#0a071b]" />

        <div className="relative max-w-7xl mx-auto px-6 z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              className="flex flex-col items-center mb-20"
              variants={fadeUp}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-950/40 border border-purple-500/30 rounded-full mb-4">
                <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  Simple Process
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-center text-white">
                How <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-[#c084fc]">BrandForge</span> Works
              </h2>
              <p className="mt-4 text-gray-400 text-lg max-w-2xl text-center">
                A seamless process connecting brands with talented creators
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* For Brands */}
              <motion.div
                variants={slideIn("left")}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/5 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#a855f7] to-[#6366f1]" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-[#7c3aed] to-[#6d28d9] rounded-xl shadow-lg shadow-purple-950/50">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      For Brands
                    </h3>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        step: "01",
                        title: "Create Campaign",
                        desc: "Set rules, rewards, and creative guidelines",
                      },
                      {
                        step: "02",
                        title: "Receive Submissions",
                        desc: "Get multiple UGC creatives from vetted creators",
                      },
                      {
                        step: "03",
                        title: "Select Winners",
                        desc: "Choose the best content and reward creators",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-center justify-center">
                          <span className="font-extrabold text-[#c084fc]">
                            {item.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">
                            {item.title}
                          </h4>
                          <p className="text-gray-400 mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href={REGISTER_URL}
                    whileHover={{ x: 5 }}
                    className="mt-8 flex items-center gap-2 cursor-pointer text-[#c084fc] font-bold text-decoration-none"
                  >
                    Start a campaign
                    <ChevronRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>

              {/* For Creators */}
              <motion.div
                variants={slideIn("right")}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/5 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white/5 backdrop-blur-md p-10 rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#6366f1] to-purple-500" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-[#3b82f6] to-[#4f46e5] rounded-xl shadow-lg shadow-indigo-950/50">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-white">
                      For Creators
                    </h3>
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        step: "01",
                        title: "Browse Campaigns",
                        desc: "Explore live campaigns from top brands",
                      },
                      {
                        step: "02",
                        title: "Submit Content",
                        desc: "Upload videos or submit portfolio links",
                      },
                      {
                        step: "03",
                        title: "Win Rewards",
                        desc: "Get paid and build your creator portfolio",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        className="flex gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-center justify-center">
                          <span className="font-extrabold text-[#c084fc]">
                            {item.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-lg">
                            {item.title}
                          </h4>
                          <p className="text-gray-400 mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href={REGISTER_URL}
                    whileHover={{ x: 5 }}
                    className="mt-8 flex items-center cursor-pointer gap-2 text-[#c084fc] font-bold text-decoration-none"
                  >
                    Join as creator
                    <ChevronRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM FEATURES */}
      <section
        id="features"
        className="py-32 bg-gradient-to-b from-[#070514] to-[#0a071b] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <motion.div
          className="relative max-w-7xl mx-auto px-6 z-10"
          style={{ y: featuresY }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div className="text-center mb-20" variants={fadeUp}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-950/40 border border-purple-500/30 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  Platform Features
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white">
                Built for <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] to-[#c084fc]">Performance</span>
              </h2>
              <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
                Everything you need to run successful UGC campaigns at scale
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Campaign Management",
                  desc: "Create, manage, and track multiple campaigns with detailed analytics.",
                  icon: <BarChart3 className="w-6 h-6" />,
                  color: "from-[#7c3aed] to-[#6d28d9]",
                },
                {
                  title: "Secure Submissions",
                  desc: "End-to-end encrypted content submission with IP protection.",
                  icon: <Shield className="w-6 h-6" />,
                  color: "from-indigo-600 to-indigo-800",
                },
                {
                  title: "Creator Discovery",
                  desc: "AI-powered matching to find the perfect creators for your brand.",
                  icon: <Users className="w-6 h-6" />,
                  color: "from-[#7c3aed] to-[#6d28d9]",
                },
                {
                  title: "Transparent Selection",
                  desc: "Clear winner selection process with feedback for all participants.",
                  icon: <Award className="w-6 h-6" />,
                  color: "from-indigo-600 to-indigo-800",
                },
                {
                  title: "Admin Moderation",
                  desc: "Powerful moderation tools to ensure content quality and compliance.",
                  icon: <Shield className="w-6 h-6" />,
                  color: "from-[#7c3aed] to-[#6d28d9]",
                },
                {
                  title: "Scalable Architecture",
                  desc: "Built to handle thousands of campaigns and millions of submissions.",
                  icon: <Zap className="w-6 h-6" />,
                  color: "from-indigo-600 to-indigo-800",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{
                    y: -10,
                    borderColor: "rgba(168, 85, 247, 0.3)",
                    boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.15)",
                    transition: { duration: 0.3 },
                  }}
                  className="group relative"
                >
                  <div
                    className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur"
                    style={{
                      background: `linear-gradient(to right, #a855f7, #6366f1)`,
                    }}
                  />
                  <div className="relative bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/5 h-full">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-md`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.desc}
                    </p>

                    <motion.div
                      className="mt-6 h-1 w-12 bg-gradient-to-r from-purple-500 to-indigo-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: 48 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA BANNER */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0c0824] via-[#070514] to-[#0a071b]" />

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #a855f7 1px, transparent 1px),
                             linear-gradient(to bottom, #a855f7 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-white/5 to-white/0 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="relative max-w-5xl mx-auto px-6 text-center z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span className="text-sm font-semibold text-white">
                Ready to Transform Your Marketing?
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Start Your Next Campaign with
              <span className="block mt-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a855f7] via-[#c084fc] to-[#a855f7]">
                  BrandForge
                </span>
              </span>
            </h2>

            <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join thousands of brands and creators already revolutionizing
              their marketing with authentic UGC content.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-6"
            variants={fadeUp}
          >
            <motion.a
              href={REGISTER_URL}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 25px 50px -12px rgba(124, 58, 237, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-[#6d28d9] to-[#7c3aed] text-white font-bold rounded-xl shadow-2xl transition-all duration-300 overflow-hidden inline-block text-decoration-none shadow-purple-600/30"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-5 h-5 text-purple-200" />
                Launch Campaign
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#7c3aed] to-[#6d28d9]"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>

            <motion.a
              href={REGISTER_URL}
              whileHover={{
                scale: 1.08,
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                borderColor: "rgba(255, 255, 255, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-5 bg-white/5 backdrop-blur-md border-2 border-white/10 text-white font-bold rounded-xl transition-all duration-300 inline-block text-decoration-none"
            >
              <span className="flex items-center gap-3">
                <Users className="w-5 cursor-pointer h-5 text-purple-400 group-hover:text-white" />
                Join as Creator
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-16 pt-8 border-t border-white/5"
            variants={fadeUp}
          >
            <p className="text-gray-400 text-sm">
              Trusted by 500+ brands and 10,000+ creators worldwide
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;

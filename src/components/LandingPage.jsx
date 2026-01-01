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

  const mouseX = useTransform(() => mousePosition.x / 50);
  const mouseY = useTransform(() => mousePosition.y / 50);

  return (
    <>
      <Navbar />

      <section className="relative pt-32 pb-40 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen flex items-center">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-400/10 to-orange-600/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-black/5 to-black/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-400/30 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative max-w-5xl mx-auto text-center z-10"
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          style={{ y: heroY }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full mb-8"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium text-orange-700">
              Revolutionizing UGC Marketing
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight"
            variants={fadeUp}
          >
            <span className="relative">
              Crowdsourced
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1, duration: 1 }}
              />
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
              Marketing
            </span>
            <br />
            <span className="relative inline-block">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500">
                Powered by Creators
              </span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-8 h-8"
              >
                <Sparkles className="w-8 h-8 text-orange-500/50" />
              </motion.div>
            </span>
          </motion.h1>

          <motion.p
            className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            variants={fadeUp}
          >
            Launch UGC campaigns, collect powerful ad creatives, and reward
            <span className="relative mx-2 font-semibold text-gray-900">
              creators
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-300"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 0.8 }}
              />
            </span>
            — all in one platform.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-6"
            variants={fadeUp}
          >
            <motion.a
              href={REGISTER_URL}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(249, 115, 22, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden inline-block"
            >
              <span className="relative z-10 flex items-center gap-2">
                Launch a Campaign
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href={REGISTER_URL}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group px-8 py-4 bg-white border-2 border-gray-200 text-gray-800 font-semibold rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-300 inline-block"
            >
              <span className="flex cursor-pointer items-center gap-2">
                Join as Creator
                <Users className="w-5 h-5 group-hover:text-orange-500 transition-colors" />
              </span>
            </motion.a>
          </motion.div>

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
                value: "$2M+",
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
                className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 shadow-lg"
                variants={scaleIn}
                whileHover={{
                  y: -8,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
                }}
              >
                <div className="flex items-center justify-center gap-2 text-orange-500 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-orange-500 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      <section id="how-it-works" className="py-32 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full mb-4">
                <span className="text-sm font-medium text-orange-700">
                  Simple Process
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900">
                How <span className="text-orange-500">BrandForge</span> Works
              </h2>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl text-center">
                A seamless process connecting brands with talented creators
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                variants={slideIn("left")}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/5 to-orange-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white p-10 rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl">
                      <BarChart3 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
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
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl flex items-center justify-center">
                          <span className="font-bold text-orange-600">
                            {item.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href={REGISTER_URL}
                    whileHover={{ x: 5 }}
                    className="mt-8 flex items-center gap-2 cursor-pointer text-orange-600 font-semibold"
                  >
                    Start a campaign
                    <ChevronRight className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                variants={slideIn("right")}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-black/5 to-black/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative bg-white p-10 rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-900 to-gray-700" />
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-gradient-to-br from-gray-900 to-black rounded-xl">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
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
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl flex items-center justify-center">
                          <span className="font-bold text-gray-900">
                            {item.step}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 mt-1">{item.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.a
                    href={REGISTER_URL}
                    whileHover={{ x: 5 }}
                    className="mt-8 flex items-center cursor-pointer gap-2 text-gray-900 font-semibold"
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

      <section
        id="features"
        className="py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:40px_40px]" />
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
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-100 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">
                  Platform Features
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                Built for <span className="text-orange-500">Performance</span>
              </h2>
              <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                Everything you need to run successful UGC campaigns at scale
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Campaign Management",
                  desc: "Create, manage, and track multiple campaigns with detailed analytics.",
                  icon: <BarChart3 className="w-6 h-6" />,
                  color: "from-orange-500 to-orange-600",
                },
                {
                  title: "Secure Submissions",
                  desc: "End-to-end encrypted content submission with IP protection.",
                  icon: <Shield className="w-6 h-6" />,
                  color: "from-gray-900 to-gray-800",
                },
                {
                  title: "Creator Discovery",
                  desc: "AI-powered matching to find the perfect creators for your brand.",
                  icon: <Users className="w-6 h-6" />,
                  color: "from-orange-500 to-orange-600",
                },
                {
                  title: "Transparent Selection",
                  desc: "Clear winner selection process with feedback for all participants.",
                  icon: <Award className="w-6 h-6" />,
                  color: "from-gray-900 to-gray-800",
                },
                {
                  title: "Admin Moderation",
                  desc: "Powerful moderation tools to ensure content quality and compliance.",
                  icon: <Shield className="w-6 h-6" />,
                  color: "from-orange-500 to-orange-600",
                },
                {
                  title: "Scalable Architecture",
                  desc: "Built to handle thousands of campaigns and millions of submissions.",
                  icon: <Zap className="w-6 h-6" />,
                  color: "from-gray-900 to-gray-800",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
                    transition: { duration: 0.3 },
                  }}
                  className="group relative"
                >
                  <div
                    className="absolute -inset-0.5 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur"
                    style={{
                      background: `linear-gradient(to right, ${
                        feature.color.includes("orange") ? "#f97316" : "#111827"
                      }, ${
                        feature.color.includes("orange") ? "#ea580c" : "#1f2937"
                      })`,
                    }}
                  />
                  <div className="relative bg-white p-8 rounded-2xl border border-gray-100 h-full">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-6`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>

                    <motion.div
                      className="mt-6 h-1 w-12 bg-gradient-to-r from-gray-900 to-gray-900"
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

      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, #f97316 1px, transparent 1px),
                             linear-gradient(to bottom, #f97316 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-3xl"
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
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-white/10 to-white/5 rounded-full blur-3xl"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-orange-300" />
              <span className="text-sm font-medium text-white">
                Ready to Transform Your Marketing?
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Start Your Next Campaign with
              <span className="block mt-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400">
                  BrandForge
                </span>
              </span>
            </h2>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
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
                boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden inline-block"
            >
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-5 h-5" />
                Launch Campaign
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>

            <motion.a
              href={REGISTER_URL}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.15)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group px-10 py-5 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 inline-block"
            >
              <span className="flex items-center gap-3">
                <Users className="w-5 cursor-pointer h-5" />
                Join as Creator
              </span>
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-16 pt-8 border-t border-white/10"
            variants={fadeUp}
          >
            <p className="text-gray-400 text-sm">
              Trusted by 500+ brands and 10,000+ creators worldwide
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default LandingPage;

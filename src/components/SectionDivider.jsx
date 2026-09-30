import React from "react";

const SectionDivider = ({ variant = "default" }) => {
  if (variant === "dark") {
    return (
      <div className="relative flex items-center justify-center overflow-hidden py-1">
        <div className="absolute h-3 rounded-full bg-purple-500/20 blur-lg w-[85%] max-w-5xl" />
        <div className="relative h-px w-[85%] max-w-5xl bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
      </div>
    );
  }

  return (
    <div className="relative flex items-center justify-center overflow-hidden py-4">
      <div className="absolute h-3 rounded-full bg-purple-400/15 blur-lg w-[85%] max-w-5xl" />
      <div className="relative h-px w-[85%] max-w-5xl bg-gradient-to-r from-transparent via-purple-300/60 to-transparent" />
    </div>
  );
};

export default SectionDivider;
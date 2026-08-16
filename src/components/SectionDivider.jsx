const SectionDivider = () => {
  return (
    <div className="relative flex items-center justify-center overflow-hidden py-2 bg-[#0a071b]">
      <div className="absolute h-2 rounded-full bg-[#a855f7]/25 blur-md w-[90%] max-w-6xl" />
      <div className="relative h-0.5 w-[90%] max-w-6xl rounded-full bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />
    </div>
  );
};

export default SectionDivider;
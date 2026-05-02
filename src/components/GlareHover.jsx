import { useState } from "react"; // 👈 This must be here!

export default function GlareHover({
  children,
  duration = 700,
  className = "",
}) {
  const [active, setActive] = useState(false);

  const handleEnter = () => {
    setActive(false);
    setTimeout(() => {
      setActive(true);
    }, 10);
  };

  return (
    <div
      onMouseEnter={handleEnter}
      className={`relative overflow-hidden inline-flex items-center justify-center ${className}`}
    >
      {children}

      <span
        className={`pointer-events-none absolute inset-0 ${
          active ? "shine-run" : ""
        }`}
      />
    </div>
  );
}
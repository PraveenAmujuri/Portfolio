import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import GlareHover from "./GlareHover";
import { ArrowUpRight } from "lucide-react";
import rockTexture from "../assets/rock.png";
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import logoSvg from "../assets/logo.svg";


export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const PRIMARY_COLOR = "#0b0f3b";
  const CARD_COLORS = ["#1B1722", "#2F293A", "#0b0f3b"];

  // 🔹 SMOOTH SCROLL PROGRESS
  useLayoutEffect(() => {
  if (!navRef.current) return;
  gsap.set(navRef.current, { height: 46 });
}, []);
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = 150;
      const value = Math.min(window.scrollY / maxScroll, 1);
      setProgress(value);

      // Close menu if user scrolls back up significantly
      if (value < 0. && tlRef.current) {
        tlRef.current.reverse();
        setIsExpanded(false);
        setIsHamburgerOpen(false);
      }
      if (value < 0.6) {
  if (tlRef.current) {
    tlRef.current.progress(0).pause(); // 🔥 HARD RESET
  }
  setIsExpanded(false);
  setIsHamburgerOpen(false);
}
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Threshold for UI mode switching
  const isScrolled = progress > 0.6;

  // 🔹 LINEAR DYNAMIC STYLE CALCS
  // Height transitions linearly from 52px to 48px to prevent the "jump"
  const dynamicHeight = isExpanded ? undefined : `${52 - progress * 4}px`;
  const dynamicWidth = `${100 - progress * 30}%`;
  const dynamicRadius = `${progress * 24}px`;

  const links = [
    { label: "About", bgColor: CARD_COLORS[0], href: "#about" },
    { label: "Projects", bgColor: CARD_COLORS[1], href: "#projects" },
    { label: "Contact", bgColor: CARD_COLORS[2], href: "#contact" },
  ];

  // 🔥 GSAP TIMELINE (STRICTLY UNCHANGED)
  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return;
    navEl.offsetHeight; 
    gsap.set(navEl, { 
  height: 46, 
  overflow: "hidden",
});
    gsap.set(cardsRef.current, { y: 60, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
tl.to(navEl, {
  height: 180,
  duration: 0.55,
  ease: "power3.out",
});

tl.to(
  cardsRef.current,
  {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.1,
  },
  "-=0.05"
);
    return tl;
  };

  useLayoutEffect(() => {
    if (!isScrolled) return;
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [isScrolled]);

  const toggleMenu = () => {
    if (!isScrolled) return;
    const tl = tlRef.current;
    if (!tl) return;

    if (!isExpanded) {
      setIsExpanded(true);
      setIsHamburgerOpen(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  cardsRef.current = [];

  return (
    <div
  className="fixed left-0 w-full flex justify-center z-50 pointer-events-none"
  style={{
    top: `${Math.max(16 - window.scrollY, 0)}px`,
  }}
>
    <motion.div
      ref={navRef}
      className="pointer-events-auto overflow-hidden border-2 border-white relative"
      style={{
        width: dynamicWidth,
        borderRadius: dynamicRadius,
        backgroundImage: `url(${rockTexture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "contrast(0.85) brightness(0.85)",
      }}
    >
  {/* 🔥 DARK OVERLAY (important for readability) */}
  <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />

  {/* CONTENT WRAPPER */}
  <div className="relative z-10">
        {/* HEADER */}
        {/* HEADER */}
        <div className="flex items-center px-6 h-[46px] relative">
          
{/* HAMBURGER (only after scroll) */}
{isScrolled && (
  <div
    onClick={toggleMenu}
    className="cursor-pointer absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-[5px] z-20 group"
  >
    <div
      className={`w-6 h-[2px] bg-white/90 rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isHamburgerOpen ? "rotate-45 translate-y-[3.5px]" : ""
      }`}
    />
    <div
      className={`w-6 h-[2px] bg-white/90 rounded-full transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isHamburgerOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
      }`}
    />
  </div>
)}

          {/* LOGO - Fixed to prevent cropping during fast scroll */}
{/* LOGO */}
<motion.div
  className="absolute top-1/2 font-bold text-white text-sm uppercase whitespace-nowrap"
  initial={false}
  animate={{
    // We use a fixed percentage for 'left' to find the center of the PARENT
    left: isScrolled ? "50%" : "2rem",
    // We use 'x' (translateX) to shift the element back by 50% of its OWN width
    // This is the standard CSS trick for perfect centering.
    x: isScrolled ? "-50%" : "0%",
    y: "-50%", // Keep it vertically centered
  }}
  transition={{ 
    type: "tween", 
    ease: "easeInOut", 
    duration: 0.4 
  }}
>
<div
  className={`logo flex items-center uppercase overflow-hidden ${
    isScrolled ? "nav-collapsed" : ""
  }`}
  style={{ fontFamily: "Plus Jakarta Sans" }}
>
    <img
    src={logoSvg}
    alt="logo"
    className="h-[16px] w-auto object-contain shrink-0"
  />
  <span className="font-[400] italic">PRAVEEN</span>

  <span className="logo-fold font-[700]">AMUJUR</span>

  <span className="font-[700] ml-[1px]">
    {isScrolled ? "AI" : "I"}
  </span>
</div>
</motion.div>
          {/* NAV LINKS (TOP STATE ONLY) */}
          {!isScrolled && (
            <div className="hidden md:flex gap-10 mx-auto text-[11px] font-black uppercase tracking-widest text-white/80">
<a href="#about" className="nav-link" data-text="About">About</a>
<a href="#projects" className="nav-link" data-text="Projects">Projects</a>
<a href="#contact" className="nav-link" data-text="Contact">Contact</a>
            </div>
          )}

          {/* BUTTON */}
{/* BUTTON SECTION */}
{/* BUTTON SECTION */}
<div className="absolute right-6 inset-y-0 flex items-center justify-center">
  <GlareHover className="rounded-md">
    <button className="h-[28px] px-4 flex items-center justify-center bg-gray-200 text-black rounded-md text-[10px] font-bold uppercase leading-none transform -translate-y-[1px] hover:bg-gray-300 transition-colors">
      Resume
    </button>
  </GlareHover>
</div>
        </div>

        {/* CARDS (GSAP CONTROLLED - UNCHANGED) */}
        <div
          className="flex gap-3 px-3 pb-3"
          style={{
            visibility: isExpanded ? "visible" : "hidden",
            pointerEvents: isExpanded ? "auto" : "none",
          }}
        >

{links.map((item, i) => (
  <div
    key={item.label}
    ref={(el) => {
      if (el) cardsRef.current[i] = el;
    }}
    className="flex-1 min-h-[120px]"
  >
    <div
      className="card-hover p-4 rounded-lg flex flex-col justify-between h-full"
      style={{ backgroundColor: item.bgColor }}
    >
      <div className="card-label text-white/40 text-sm font-bold">
        {item.label}
      </div>

<a
  href={item.href}
  className="card-link relative text-base"
>
  <span className="card-action">
    Enter <ArrowUpRight size={16} />
  </span>
</a>
    </div>
  </div>

          ))}
        </div>
        </div> {/* content wrapper */}

      </motion.div>
    </div>
  );
}
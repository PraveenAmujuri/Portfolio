import React, { useEffect, useState, Suspense, useRef } from "react";

import profile from "../assets/profile.webp";

import TextPressure from "../components/TextPressure";
import logo from "../assets/logo/logo.svg";
import {RevealWaveImage} from "./ui/reveal-wave-image";
import { Canvas } from '@react-three/fiber';
import { useProgress, Html } from '@react-three/drei';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { Macbook } from "./Macbook";
import * as THREE from 'three';



const SHAPES = [

  "polygon(0% 0%, 85% 0%, 100% 15%, 100% 100%, 0% 100%)",

  "polygon(0% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)",

  "polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 15%)",

  "polygon(0% 0%, 100% 0%, 100% 100%, 15% 100%, 0% 85%)",

];

const ROLES = [
  "ANDROID DEV.",
  "WEB DEV.",
  "AI/ML DEV.",
  "OPEN SOURCE",
  "SYSTEM BUILDER"
];



export default function Hero() {

  const [shapeIdx, setShapeIdx] = useState(0);

  const [fading, setFading] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
const [role, setRole] = useState(ROLES[0]);
const [animKey, setAnimKey] = useState(0);
const [mainWord, suffixWord] = role.split(" ");
const controls = useRef();

const { progress } = useProgress();
  const [isFinished, setIsFinished] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // ── MOBILE-ONLY STATE ──────────────────────────────────────────────────────
  const [mobileReady, setMobileReady] = useState(false);
  const [mobileRoleIndex, setMobileRoleIndex] = useState(0);
  const [mobileAnimKey, setMobileAnimKey] = useState(0);
  // ──────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsFinished(true);
        setTimeout(() => setShowContent(true), 400);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  // ── MOBILE READY ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (isFinished) {
      const t = setTimeout(() => setMobileReady(true), 200);
      return () => clearTimeout(t);
    }
  }, [isFinished]);

  // ── MOBILE ROLE CYCLE ──────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setMobileRoleIndex((prev) => {
        const next = (prev + 1) % ROLES.length;
        setMobileAnimKey((k) => k + 1);
        return next;
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);
  // ──────────────────────────────────────────────────────────────────────────
// Inside your main App or Page component
const aboutRef = useRef(null);
const [scrollProgress, setScrollProgress] = useState(0);


// Hero.jsx
useEffect(() => {
  const handleScroll = () => {
    const target = document.getElementById('about');
    if (!target) return;
    
    const rect = target.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Laptop starts moving when the About section is 500px away from view
    const startTrigger = windowHeight + 500; 
    const endTrigger = windowHeight * 0.2; 

    const progress = THREE.MathUtils.mapLinear(
      rect.top,
      startTrigger, // Value when it should be at start of path
      endTrigger,   // Value when it should be at end of path
      0,
      1
    );
    
    setScrollProgress(THREE.MathUtils.clamp(progress, 0, 1));
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

// Pass this progress down to the Macbook component
// <Macbook scrollProgress={scrollProgress} ... />
useEffect(() => {
  const interval = setInterval(() => {
    setRoleIndex((prev) => {
      const next = (prev + 1) % ROLES.length;
      setAnimKey((k) => k + 1);
      setRole(ROLES[next]);
      return next;
    });
  }, 3200);
  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setShapeIdx((i) => (i + 1) % SHAPES.length);
        setFading(false);
      }, 400);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const emptyCells = [
    [3,3], [3,4], [3,5], [3,6], [3,7],
    [5,3], [5,4], [5,5], [5,6], [5,7],
    [7,3], [7,4]
  ];

  const baseDelay = 0.4;

  // ── MOBILE ROLE DISPLAY ────────────────────────────────────────────────────
  const currentMobileRole = ROLES[mobileRoleIndex];
  const [mobileMainWord, mobileSuffixWord] = currentMobileRole.split(" ");
  // ──────────────────────────────────────────────────────────────────────────

  return (

    <>

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&family=DM+Mono:wght@300;400&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Notable&display=swap');
        /* ─── THE 100VH 16:9 WRAPPER ─── */

.blueprint-wrapper {
  margin-top: 40px;
  height: calc(100vh - 80px);
  width: 100%;
  background: #f8f8f7 !important; 
  box-sizing: border-box;
  border-bottom: 1px solid #f8f8f7; 
  z-index: 10;
}

.grid-8x8 {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  height: 100%;
  width: 100%;
  background: #f8f8f7 !important;
  gap: 0;
  color: #222;
}

.grid-8x8 > div {
  background: #f8f8f7 !important;
  min-height: 0;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  border-right: 1px solid rgba(0, 0, 0, 0.22);
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
}

.blueprint-wrapper {
  margin-top: 40px;
  height: calc(100vh - 80px);
  width: 100%;
  background: #000;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 1);
}

.empty-grid-cell {
  background: #f8f8f7 !important;
  border-right: 1px solid rgba(0, 0, 0, 0.22);
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
}

        .cell-logo {
          grid-area: 1 / 1 / 3 / 2;
          font-size: clamp(12px, 1.2vw, 16px);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #888;
        }

        .cell-applied-ai {
          grid-area: 1 / 2 / 3 / 6;
          flex-direction: column;
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4.5vw, 64px);
          font-weight: 900;
          text-transform: uppercase;
          line-height: 1.1;
          padding-left: 24px;
          align-items: flex-start !important;
        }

.cell-in-ai-dev {
  grid-area: 1 / 6 / 2 / 9;
  display: flex;
  align-items: flex-start;
  padding-top: 32px; 
  justify-content: flex-end;
  padding-right: 40px; 
  font-family: 'Playfair Display', serif;
  font-size: clamp(14px, 1.2vw, 17px);
  color: #111;
  letter-spacing: 0.12em;
  position: relative;
  z-index: 1;
}

.first-word-italic {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
  margin-right: 6px;
}

.normal-text {
  font-family: 'Playfair Display', serif;
  font-style: normal;
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.7;
}

        .cell-projects {
          grid-area: 2 / 6 / 3 / 7;
          flex-direction: column;
          border-right: 1px solid rgba(0, 0, 0, 0.22) !important;
        }

        .cell-cgpa {
          grid-area: 2 / 7 / 3 / 8;
          flex-direction: column;
        }

.cell-projects, .cell-cgpa {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(0, 0, 0, 0.08) !important;
}

.stat-val {
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  font-size: clamp(30px, 2.8vw, 38px); 
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  letter-spacing: -0.04em;
}

.stat-plus {
  font-family: 'Inter', sans-serif;
  font-weight: 100;
  font-size: 0.5em;
  opacity: 0.3;
  margin-left: 8px;
  transform: none; 
  display: inline-block;
  line-height: 1;
}

.stat-lbl {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: clamp(8px, 0.6vw, 10px);
  text-transform: uppercase;
  color: #a0a0a0;
  margin-top: 10px;
  letter-spacing: 0.5em; 
}

        .cell-name {
          grid-area: 2 / 8 / 9 / 9;
          background: #f4f1ec;
        }

.cell-name {
  grid-area: 2 / 8 / 9 / 9;
  background: #f8f8f7 !important;
  display: flex;
  align-items: stretch;
  justify-content: center;
  overflow: hidden;
}

.upright-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  letter-spacing: -0.03em;
}

.cell-name {
  height: 100%;
  overflow: visible;
}

.upright-text {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.letter {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: min(13vh, 9vw);
  line-height: 0.75;
  letter-spacing: -0.02em;
  color: #111;
  will-change: transform, opacity;
}

.letter-wrap.structured-drop {
  opacity: 0;
  transform: translateY(-100%) scale(0.98);
  animation: gridDrop 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes gridDrop {
  0% {
    opacity: 0;
    transform: translateY(-100%) scale(0.98);
  }
  70% {
    opacity: 1;
    transform: translateY(4%) scale(1);
  }
  100% {
    opacity: 1;
    transform: translateY(0%) scale(1);
  }
}

.letter-wrap {
  position: relative;
  display: block;
  width: 100%;
  text-align: center;
}

.letter-fill {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  color: #111;
  transition: opacity 0.25s ease;
}

.letter-stroke {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 1.5px #111;
  clip-path: inset(0 0 100% 0);
}

.letter-wrap:hover .letter-stroke {
  animation: strokeReveal 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.letter-wrap:not(:hover) .letter-stroke {
  clip-path: inset(0 0 100% 0);
}

.letter-wrap:hover .letter-fill {
  opacity: 0.2;
}

@keyframes strokeReveal {
  0% { clip-path: inset(0 0 100% 0); }
  100% { clip-path: inset(0 0 0% 0); }
}

        .cell-image {
          grid-area: 3 / 1 / 8 / 3;
          padding: 0 !important;
        }

        .sketch-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          filter: grayscale(100%) contrast(1.15) brightness(0.9);
          transition: clip-path 0.4s ease, opacity 0.4s ease;
        }

        .cell-resume {
          grid-area: 8 / 1 / 9 / 3;
          font-size: clamp(12px, 1.5vw, 16px);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }

        .cell-resume:hover {
          background: #1a1a1a !important;
          color: #f8f8f7;
          transition: background 0.25s ease, color 0.25s ease;
        }

.cell-android {
  grid-area: 7 / 5 / 9 / 8;
  display: flex;
  align-items: baseline; 
  padding: 0 10px 6px 10px;
  font-family: 'Inter', sans-serif;
  text-transform: uppercase;
  overflow: hidden;
  border-right: none !important;
}

.main-wrap {
  display: inline-block;
  transform: scaleY(1.12);
  transform-origin: bottom;
}

.main {
  font-weight: 300;
  font-size: clamp(70px, 7vw, 140px);
  letter-spacing: -0.05em;
  line-height: 0.85;
  white-space: nowrap;
}

.suffix {
  font-size: clamp(24px, 2vw, 36px);
  margin-left: 10px;
  line-height: 1;
  letter-spacing: 0.08em;
  color: #333;
  opacity: 0;
  transform: translateY(24px);
  animation: riseSuffix 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.rise-letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(80%);
  will-change: transform, opacity;
  animation: riseSmooth 0.48s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes riseSmooth {
  to {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0%);
  }
}

@keyframes riseSuffix {
  0% {
    opacity: 0;
    transform: translateY(calc(24px + 40%));
  }
  100% {
    opacity: 0.85;
    transform: translateY(24px);
  }
}

.cell-cgpa {
  border-right: none !important;
}

.grid-8x8 > div[style*="grid-column: 7"], 
.grid-8x8 > div[style*="/ 8"] {
  border-right: none !important;
}

.empty-grid-cell[style*="7 / 8"] {
  border-right: none !important;
}

.cell-applied-ai {
  grid-area: 1 / 2 / 3 / 6;
  overflow: hidden; 
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #f8f8f7 !important;
  position: relative;
  z-index: 10;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
}

.text-pressure-wrapper {
  width: 100%;
  transform: scaleY(1.08); 
  transform-origin: bottom; 
  display: block;
}

.text-pressure-wrapper {
  width: 100%;
  display: block;
  overflow: hidden;
  contain: paint;
}

.text-pressure-wrapper span {
  display: inline-block;
  white-space: nowrap;
}

.cell-logo {
  grid-area: 1 / 1 / 3 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.logo-img {
  width: 100%;
  height: 100%;
  max-width: 60px;
  max-height: 60px;
  object-fit: contain;
  transition: transform 0.25s ease, opacity 0.25s ease;
}

.cell-logo:hover .logo-img {
  transform: scale(1.05);
  opacity: 0.8;
}

.three-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 30;
  pointer-events: none; 
}

.three-container canvas {
  pointer-events: auto; 
}

.cell-name, 
.cell-resume, 
.cell-image {
  position: relative;
  z-index: 40; 
  pointer-events: auto;
}

.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: #f8f8f7;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.8s ease-in-out;
}

.loading-screen.fade-out {
  opacity: 0;
  pointer-events: none;
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.loader-name {
  font-family: 'Inter', sans-serif;
  font-weight: 200;
  letter-spacing: 0.8em;
  font-size: 14px;
  color: #111;
}

.loader-bar-bg {
  width: 200px;
  height: 2px;
  background: rgba(0,0,0,0.05);
  position: relative;
}

.loader-bar-fill {
  position: absolute;
  top: 0; left: 0; height: 100%;
  background: #111;
  transition: width 0.3s ease-out;
}

.loader-status {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #888;
  text-transform: uppercase;
}


/* ═══════════════════════════════════════════════════════════════════════
   ████████████████████████████████████████████████████████████████████
   MOBILE-ONLY HERO  ·  Completely separate experience  ·  < 768px only
   Desktop hero code above this line is 100% untouched and unaffected.
   ████████████████████████████████████████████████████████████████████
   ═══════════════════════════════════════════════════════════════════════ */

/* Toggle wrappers at the root level */
.mobile-hero          { display: none; }
.desktop-hero-wrapper { display: block; }


@media (max-width: 768px) {

  /* ── Show/hide toggle ──────────────────────────────────────────── */
  .mobile-hero          { display: block; }
  .desktop-hero-wrapper { display: none !important; }

  /* ── Global overflow guard ─────────────────────────────────────── */
  html, body {
    overflow-x: hidden;
    max-width: 100vw;
  }

  /* Loading screen adjustment — prevent letter-spacing blowout */
  .loading-screen {
    background: #0a0a0a;
  }
  .loader-name {
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.26em;
    font-size: 11px;
  }
  .loader-bar-bg {
    background: rgba(255,255,255,0.06);
  }
  .loader-bar-fill {
    background: rgba(255,255,255,0.7);
  }
  .loader-status {
    color: rgba(255,255,255,0.28);
  }

  /* ════════════════════════════════════════════════════════════════
     ROOT
  ════════════════════════════════════════════════════════════════ */
  .mh-root {
    position: relative;
    width: 100vw;
    min-height: 100svh;
    background: #0a0a0a;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  /* ════════════════════════════════════════════════════════════════
     SECTION 1 — FULLSCREEN PORTRAIT COVER
     Magazine cover: full bleed photograph, cinematic overlays,
     typography anchored in the lower third.
  ════════════════════════════════════════════════════════════════ */
  .mh-cover {
    position: relative;
    width: 100vw;
    height: 100svh;
    overflow: hidden;
    background: #0a0a0a;
    flex-shrink: 0;
  }

  /* Portrait image — full bleed, desaturated, cinematic grade */
  .mh-portrait {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 10%;
    filter: grayscale(100%) contrast(1.08) brightness(0.65);
    transform: scale(1.03);
    transform-origin: center 18%;
    will-change: transform;
  }

  /* Film grain — SVG fractal noise, overlay blend */
  .mh-grain {
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    opacity: 0.28;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 160px 160px;
    mix-blend-mode: overlay;
  }

  /* Cinematic bottom gradient — lifts text out of image */
  .mh-gradient-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 72%;
    z-index: 3;
    background: linear-gradient(
      to top,
      rgba(7,7,7,1.0) 0%,
      rgba(7,7,7,0.88) 25%,
      rgba(7,7,7,0.46) 55%,
      transparent 100%
    );
    pointer-events: none;
  }

  /* Top vignette — grounds the sky/header area */
  .mh-gradient-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 26%;
    z-index: 3;
    background: linear-gradient(
      to bottom,
      rgba(7,7,7,0.62) 0%,
      transparent 100%
    );
    pointer-events: none;
  }

  /* Left edge vignette — subtle depth */
  .mh-gradient-side {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 30%;
    z-index: 3;
    background: linear-gradient(
      to right,
      rgba(7,7,7,0.35) 0%,
      transparent 100%
    );
    pointer-events: none;
  }

  /* ── NAVBAR ─────────────────────────────────────────────────────── */
  .mh-nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 24px 0 24px;
  }

  .mh-nav-logo {
    width: 30px;
    height: 30px;
    object-fit: contain;
    filter: invert(1);
    opacity: 0;
    animation: mh-fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards;
  }

  .mh-nav-right {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
    opacity: 0;
    animation: mh-fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
  }

  .mh-nav-tag {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 8.5px;
    letter-spacing: 0.44em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.38);
    line-height: 1;
  }

  .mh-nav-year {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 9px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.1em;
  }

  /* ── COVER TYPOGRAPHY — lower third ─────────────────────────────── */
  .mh-cover-text {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 20;
    padding: 0 24px 40px 24px;
  }

  /* Degree tag — italic serif, ghost */
  .mh-credential {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 10.5px;
    letter-spacing: 0.22em;
    color: rgba(255,255,255,0.38);
    text-transform: uppercase;
    display: block;
    margin-bottom: 16px;
    opacity: 0;
    animation: mh-fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.72s forwards;
  }

  /* First name — enormous, dominant, condensed weight */
  .mh-name {
    font-family: 'Inter', sans-serif;
    font-weight: 100;
    font-size: clamp(58px, 18.5vw, 84px);
    line-height: 0.86;
    letter-spacing: -0.045em;
    color: #ffffff;
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
  }

  /* Each character of PRAVEEN rises individually */
  .mh-name-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(36px);
    animation: mh-charRise 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: var(--char-delay);
    will-change: transform, opacity;
  }

  /* Surname — ghost, recessive, second layer */
  .mh-surname {
    font-family: 'Inter', sans-serif;
    font-weight: 100;
    font-size: clamp(58px, 18.5vw, 84px);
    line-height: 0.86;
    letter-spacing: -0.045em;
    color: rgba(255,255,255,0.14);
    text-transform: uppercase;
    display: block;
    margin-bottom: 30px;
    opacity: 0;
    animation: mh-fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.15s forwards;
  }

  /* Title pill — tracked caps with ruling line */
  .mh-title-line {
    display: flex;
    align-items: center;
    gap: 14px;
    opacity: 0;
    animation: mh-fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.36s forwards;
  }

  .mh-title-rule {
    display: inline-block;
    width: 24px;
    height: 1px;
    background: rgba(255,255,255,0.28);
    flex-shrink: 0;
  }

  .mh-title-text {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 9.5px;
    letter-spacing: 0.44em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.52);
  }

  /* Scroll indicator — bottom right, animated hairline */
  .mh-scroll-cue {
    position: absolute;
    bottom: 42px;
    right: 22px;
    z-index: 20;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    opacity: 0;
    animation: mh-fadeIn 1.2s ease 2s forwards;
  }

  .mh-scroll-line {
    width: 1px;
    height: 44px;
    background: rgba(255,255,255,0.12);
    position: relative;
    overflow: hidden;
  }

  .mh-scroll-line::after {
    content: '';
    position: absolute;
    top: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.6), transparent);
    animation: mh-scrollPulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) 2.5s infinite;
  }

  .mh-scroll-label {
    font-family: 'Inter', sans-serif;
    font-size: 6.5px;
    letter-spacing: 0.38em;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }

  /* ════════════════════════════════════════════════════════════════
     SECTION 2 — ROLE TICKER
     Cinematic animated role — oversized, high contrast, dark stage.
     Each role change triggers character-by-character rise animation.
  ════════════════════════════════════════════════════════════════ */
  .mh-role-section {
    position: relative;
    background: #0a0a0a;
    padding: 40px 24px 36px 24px;
    overflow: hidden;
    border-top: 1px solid rgba(255,255,255,0.055);
  }

  /* Decorative corner mark — editorial texture */
  .mh-role-section::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 48px;
    height: 48px;
    border-top: 1px solid rgba(255,255,255,0.1);
    border-right: 1px solid rgba(255,255,255,0.1);
  }

  .mh-role-eyebrow {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 8px;
    letter-spacing: 0.52em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.22);
    display: block;
    margin-bottom: 20px;
  }

  /* Ticker overflow container — clips the animation */
  .mh-role-ticker {
    overflow: hidden;
    display: flex;
    align-items: flex-end;
    min-height: clamp(52px, 14vw, 72px);
  }

  .mh-role-main {
    font-family: 'Inter', sans-serif;
    font-weight: 100;
    font-size: clamp(46px, 13vw, 66px);
    line-height: 1;
    letter-spacing: -0.04em;
    color: #ffffff;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .mh-role-suffix {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: clamp(13px, 3.8vw, 19px);
    letter-spacing: 0.16em;
    color: rgba(255,255,255,0.3);
    text-transform: uppercase;
    margin-left: 10px;
    white-space: nowrap;
    align-self: flex-end;
    margin-bottom: 3px;
  }

  /* Per-character rise animation for role */
  .mh-role-char {
    display: inline-block;
    opacity: 0;
    transform: translateY(100%);
    animation: mh-charRise 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: var(--char-delay);
    will-change: transform, opacity;
  }

  /* Suffix fade up */
  .mh-role-suffix-anim {
    opacity: 0;
    transform: translateY(14px);
    animation: mh-fadeUp 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    animation-delay: var(--suffix-delay);
  }

  /* ════════════════════════════════════════════════════════════════
     SECTION 3 — STATS
     Two columns separated by a single hairline.
     Enormous numerals, ghost labels. Pure editorial data.
  ════════════════════════════════════════════════════════════════ */
  .mh-stats {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    background: #0e0e0e;
    border-top: 1px solid rgba(255,255,255,0.055);
  }

  .mh-stat-item {
    padding: 34px 24px 30px 24px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .mh-stat-item:last-child {
    align-items: flex-end;
  }

  .mh-stat-divider {
    background: rgba(255,255,255,0.07);
    align-self: stretch;
  }

  .mh-stat-val {
    font-family: 'Inter', sans-serif;
    font-weight: 100;
    font-size: clamp(40px, 11vw, 56px);
    line-height: 1;
    letter-spacing: -0.055em;
    color: #ffffff;
    display: flex;
    align-items: flex-start;
  }

  .mh-stat-sup {
    font-size: 0.36em;
    font-weight: 200;
    opacity: 0.25;
    margin-top: 5px;
    margin-left: 3px;
    letter-spacing: 0;
  }

  .mh-stat-lbl {
    font-family: 'Inter', sans-serif;
    font-weight: 400;
    font-size: 7.5px;
    letter-spacing: 0.5em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.18);
    margin-top: 12px;
  }

  /* ════════════════════════════════════════════════════════════════
     SECTION 4 — METADATA STRIP
     Education + date in a minimal horizontal band.
     Feels like a magazine colophon.
  ════════════════════════════════════════════════════════════════ */
  .mh-info-strip {
    background: #0a0a0a;
    border-top: 1px solid rgba(255,255,255,0.045);
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mh-info-left {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-weight: 400;
    font-size: 11.5px;
    color: rgba(255,255,255,0.3);
    letter-spacing: 0.06em;
  }

  .mh-info-dot {
    width: 2px;
    height: 2px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    flex-shrink: 0;
  }

  .mh-info-right {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 8px;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.2);
  }

  /* ════════════════════════════════════════════════════════════════
     SECTION 5 — RESUME CTA
     Full-width touch target. Editorial arrow button.
     Active state: subtle fill reveal from left.
  ════════════════════════════════════════════════════════════════ */
  .mh-cta {
    background: #0a0a0a;
    border-top: 1px solid rgba(255,255,255,0.055);
  }

  .mh-cta-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 28px 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
  }

  /* Fill sweep on touch */
  .mh-cta-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.035);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .mh-cta-btn:active::before {
    transform: scaleX(1);
  }

  .mh-cta-label {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    font-size: 9.5px;
    letter-spacing: 0.54em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.58);
    position: relative;
    z-index: 1;
  }

  /* Geometric arrow box */
  .mh-cta-arrow {
    width: 34px;
    height: 34px;
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    z-index: 1;
    transition: border-color 0.3s ease;
  }

  .mh-cta-btn:active .mh-cta-arrow {
    border-color: rgba(255,255,255,0.38);
  }

  .mh-cta-arrow svg {
    width: 13px;
    height: 13px;
    stroke: rgba(255,255,255,0.44);
  }

  /* ── BOTTOM IDENTITY STRIP ────────────────────────────────────── */
  .mh-footer-strip {
    background: #070707;
    border-top: 1px solid rgba(255,255,255,0.032);
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .mh-footer-mark {
    font-family: 'Inter', sans-serif;
    font-weight: 200;
    font-size: 7.5px;
    letter-spacing: 0.58em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.1);
  }

  /* ════════════════════════════════════════════════════════════════
     MOBILE-ONLY KEYFRAMES
  ════════════════════════════════════════════════════════════════ */

  @keyframes mh-fadeUp {
    from {
      opacity: 0;
      transform: translateY(16px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes mh-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes mh-charRise {
    from {
      opacity: 0;
      transform: translateY(38px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes mh-scrollPulse {
    0%   { top: -100%; }
    100% { top: 200%; }
  }

} /* END @media (max-width: 768px) */


      `}</style>


{/* ─────────────────────────────────────────────────────────────
    SHARED LOADING SCREEN
───────────────────────────────────────────────────────────── */}
<div className={`loading-screen ${isFinished ? 'fade-out' : ''}`}>
  <div className="loader-content">
    <span className="loader-name">PRAVEEN AMUJURI</span>
    <div className="loader-bar-bg">
      <div className="loader-bar-fill" style={{ width: `${progress}%` }}></div>
    </div>
    <span className="loader-status">
      {progress < 100 ? `LOADING ASSETS ${Math.round(progress)}%` : "READY TO EXPLORE"}
    </span>
  </div>
</div>


{/* ═══════════════════════════════════════════════════════════════
    ██████████████████████████████████████████████████████████████
    MOBILE HERO — separate JSX, shows only below 768px
    ██████████████████████████████████████████████████████████████
    ═══════════════════════════════════════════════════════════════ */}
<div className="mobile-hero" aria-hidden="false">
  <div className="mh-root">

    {/* ── SECTION 1: CINEMATIC PORTRAIT COVER ─────────────────────── */}
    <div className="mh-cover">

      <img
        src={profile}
        alt="Praveen Amujuri — Applied AI Engineer"
        className="mh-portrait"
      />

      {/* Atmosphere layers */}
      <div className="mh-grain"        aria-hidden="true" />
      <div className="mh-gradient-top" aria-hidden="true" />
      <div className="mh-gradient-bottom" aria-hidden="true" />
      <div className="mh-gradient-side" aria-hidden="true" />

      {/* Navbar */}
      <nav className="mh-nav" aria-label="Primary navigation">
        <img src={logo} alt="PAS" className="mh-nav-logo" />
        <div className="mh-nav-right">
          <span className="mh-nav-tag">Portfolio</span>
          <span className="mh-nav-year">2025</span>
        </div>
      </nav>

      {/* Lower-third typography */}
      <div className="mh-cover-text">

        <span className="mh-credential">
          ANITS · B.Tech AI&amp;ML
        </span>

        {/* PRAVEEN — character-by-character rise, staggered */}
        <span className="mh-name" aria-label="PRAVEEN">
          {"PRAVEEN".split("").map((char, i) => (
            <span
              key={i}
              className="mh-name-char"
              style={{ "--char-delay": `${0.78 + i * 0.068}s` }}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
        </span>

        {/* AMUJURI — ghosted surname */}
        <span className="mh-surname">AMUJURI</span>

        {/* Role ruled line */}
        <div className="mh-title-line">
          <span className="mh-title-rule" aria-hidden="true" />
          <span className="mh-title-text">Applied AI Engineer</span>
        </div>

      </div>

      {/* Animated scroll indicator */}
      <div className="mh-scroll-cue" aria-hidden="true">
        <div className="mh-scroll-line" />
        <span className="mh-scroll-label">Scroll</span>
      </div>

    </div>
    {/* END SECTION 1 */}


    {/* ── SECTION 2: ANIMATED ROLE TICKER ─────────────────────────── */}
    <div className="mh-role-section" key={mobileAnimKey}>
      <span className="mh-role-eyebrow">Currently working as</span>
      <div className="mh-role-ticker" aria-live="polite" aria-label={currentMobileRole}>
        <span className="mh-role-main" aria-hidden="true">
          {mobileMainWord.replace(".", "").split("").map((char, i) => (
            <span
              key={`${mobileAnimKey}-${i}`}
              className="mh-role-char"
              style={{ "--char-delay": `${i * 0.052}s` }}
            >
              {char}
            </span>
          ))}
        </span>
        {mobileSuffixWord && (
          <span
            className="mh-role-suffix mh-role-suffix-anim"
            aria-hidden="true"
            style={{
              "--suffix-delay": `${mobileMainWord.replace(".", "").length * 0.052 + 0.06}s`
            }}
          >
            {mobileSuffixWord.replace(".", "")}
          </span>
        )}
      </div>
    </div>
    {/* END SECTION 2 */}


    {/* ── SECTION 3: STATS ─────────────────────────────────────────── */}
    <div className="mh-stats">
      <div className="mh-stat-item">
        <span className="mh-stat-val">
          15<span className="mh-stat-sup">+</span>
        </span>
        <span className="mh-stat-lbl">Projects</span>
      </div>
      <div className="mh-stat-divider" aria-hidden="true" />
      <div className="mh-stat-item">
        <span className="mh-stat-val">7.62</span>
        <span className="mh-stat-lbl">CGPA</span>
      </div>
    </div>
    {/* END SECTION 3 */}


    {/* ── SECTION 4: METADATA STRIP ────────────────────────────────── */}
    <div className="mh-info-strip">
      <span className="mh-info-left">Andhra University</span>
      <div className="mh-info-dot" aria-hidden="true" />
      <span className="mh-info-right">AI &amp; ML · 2022–2026</span>
    </div>
    {/* END SECTION 4 */}


    {/* ── SECTION 5: RESUME CTA ────────────────────────────────────── */}
    <div className="mh-cta">
      <button
        className="mh-cta-btn"
        onClick={() => window.open("/resume.pdf", "_blank")}
        aria-label="Open resume PDF"
      >
        <span className="mh-cta-label">Get Resume</span>
        <span className="mh-cta-arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </button>
    </div>
    {/* END SECTION 5 */}

    {/* ── BOTTOM IDENTITY MARK ─────────────────────────────────────── */}
    <div className="mh-footer-strip" aria-hidden="true">
      <span className="mh-footer-mark">Praveen Amujuri · 2025</span>
    </div>

  </div>
</div>
{/* END MOBILE HERO */}


{/* ═══════════════════════════════════════════════════════════════
    ██████████████████████████████████████████████████████████████
    DESKTOP HERO — 100% ORIGINAL CODE, COMPLETELY UNTOUCHED
    Wrapped in .desktop-hero-wrapper — hidden below 768px only.
    No CSS properties inside the wrapper are modified in any way.
    ██████████████████████████████████████████████████████████████
    ═══════════════════════════════════════════════════════════════ */}
<div className="desktop-hero-wrapper">

<div className="blueprint-wrapper" style={{ position: 'relative' }}>
      {/* 1. THE 3D LAYER (FLOATING) */}
  {/* 1. FULL SCREEN 3D LAYER */}
<div className="three-container">
<Canvas 
  camera={{ position: [0, 2, 12], fov: 35 }}
  dpr={[1, 2]} // 🔥 Limit resolution on high-dpi screens to save GPU
  gl={{ antialias: true, powerPreference: "high-performance" }} // 🔥 Request GPU power
>
<OrbitControls 
  ref={controls} 
  enableZoom={false} 
  enablePan={false} 
  // 1. HORIZONTAL LIMITS (left to right)
  // -Math.PI / 4 is 45 degrees left, Math.PI / 4 is 45 degrees right
  minAzimuthAngle={-Math.PI / 3} 
  maxAzimuthAngle={Math.PI / 3}
  
  // 2. VERTICAL LIMITS (up and down)
  // Math.PI / 2 is level with the horizon. 
  // This range prevents flipping it upside down.
  minPolarAngle={Math.PI / 2.5} 
  maxPolarAngle={Math.PI / 1.8} 
  
  // 3. SMOOTHING
  enableDamping={true}
  dampingFactor={0.05}
/>

  <ambientLight intensity={1.5} />

  <Suspense fallback={null}>
    <Macbook 
      scale={12} 
      position={[1.5, -0.5, 0]} 
      controls={controls}
      startAnimation={showContent}
      scrollProgress={scrollProgress} 
    />
    <ContactShadows
  position={[0, -1.4, 0]}
  opacity={0.18}
  scale={10}
  blur={2.5}
  far={4}
/>
    <Environment preset="studio" background={false} frames={1} />
  </Suspense>
</Canvas>
</div>

        <section className="grid-8x8">

         

<div className="cell-logo">
  <img src={logo} alt="PAS Logo" className="logo-img" />
</div>

         

<div className="cell-applied-ai">

  <div className="text-pressure-wrapper">

<TextPressure
  text="APPLIED AI ENGINEER"
  fontFamily="Compressa VF"
  fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
  textColor="#111111"
  
  minFontSize={58} // Increased for "trapping"
  style={{ letterSpacing: '-0.06em' }} // The "Crunch"
  weight={true}
  width={true}
  flex={true}
/>

  </div>

</div>

         

 <div className="cell-in-ai-dev">
  <span className="first-word-italic">ANITS</span>
  <span className="normal-text">, B.TECH, AI&ML</span>
</div>

         
<div className="cell-projects">
  <span className="stat-val">
    15<span className="stat-plus">+</span>
  </span>
  <span className="stat-lbl">Projects</span>
</div>

<div className="cell-cgpa">
  <span className="stat-val">7.62</span>
  <span className="stat-lbl">CGPA</span>
</div>

         



<div className="cell-name">
  <div className="upright-text">
{"PRAVEEN".split("").map((char, index) => (
  <span
    key={index}
    className={`letter-wrap ${isFinished ? "structured-drop" : ""}`}
    style={{ "--delay": `${index * 0.1}s` }}
  >
    <span className="letter letter-fill">{char}</span>
    <span className="letter letter-stroke">{char}</span>
  </span>
))}
  </div>
</div>
         
<div className="cell-image" style={{ position: 'relative' }}>
  <RevealWaveImage
    src={profile}
    waveSpeed={0.2}         // Slower for better professional feel
    waveFrequency={1.5}     // Less "busy"
    waveAmplitude={0.15}    // Subtle distortion
    revealRadius={0.4}     // Large enough to see the face on hover
    revealSoftness={0.8}    // Very smooth transition
    pixelSize={1}
  />
</div>
         

          <div

            className="cell-resume"

            onClick={() => window.open("/resume.pdf", "_blank")}

          >

            Get Resume

          </div>

         

<div className="cell-android" key={animKey}>
  <span className="main-wrap">
    <span className="main">
      {mainWord.split("").map((char, i) => (
        <span
          key={i}
          className={isFinished ? "rise-letter" : ""}
          style={{
            "--delay": `${baseDelay + i * 0.085}s`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  </span>

  {suffixWord && (
    <span
      className={isFinished ? "suffix" : ""}
      style={{
        animationDelay: `${baseDelay + mainWord.length * 0.085 + 0.05}s`,
      }}
    >
      {suffixWord}
    </span>
  )}
</div>




          {/* THE FIX: Render the empty cells to span 2 math rows (pos[0] + 2)

              This perfectly removes the horizontal half-lines while keeping vertical structure */}

          {emptyCells.map((pos, index) => (

            <div

              key={`empty-${index}`}

              className="empty-grid-cell"

              style={{ gridArea: `${pos[0]} / ${pos[1]} / ${pos[0] + 2} / ${pos[1] + 1}` }}

            ></div>

          ))}



        </section>

      </div>
       <div
    id="path-start"
    className="absolute left-[58%] top-[58%] w-2 h-2 opcity-0 pointer-events-none z-[50]"
  />

  <div
    id="path-mid"
    className="absolute left-[42%] top-[78%] w-4 h-4 rounded-full opcity-0 pointer-events-none z-[50]"
  />
  

      

</div>
{/* END DESKTOP HERO */}

    </>

  );

}
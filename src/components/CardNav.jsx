import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { GoArrowUpRight } from 'react-icons/go';
import './CardNav.css';

const CardNav = ({
  open = false,
  hideHeader = false, // CHANGE 1: Added prop to hide duplicate header
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor,
  buttonTextColor
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);
  const hasMounted = useRef(false);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    // CHANGE 2: If header is hidden, we only care about the content height
    const topBarHeight = hideHeader ? 0 : 60; 
    
    const contentEl = navEl.querySelector('.card-nav-content');
    if (contentEl) {
      const wasVisible = contentEl.style.visibility;
      const wasPosition = contentEl.style.position;
      const wasHeight = contentEl.style.height;

      contentEl.style.visibility = 'visible';
      contentEl.style.position = 'static';
      contentEl.style.height = 'auto';

      const padding = 16;
      const contentHeight = contentEl.scrollHeight;

      contentEl.style.visibility = wasVisible;
      contentEl.style.position = wasPosition;
      contentEl.style.height = wasHeight;

      return topBarHeight + contentHeight + padding;
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Start height at 0 if header is hidden, otherwise 60
    const startHeight = hideHeader ? 0 : 60;
    gsap.set(navEl, { height: startHeight, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease
    });

    tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => tl?.kill();
  }, [ease, items, hideHeader]); // CHANGE 3: Re-run if hideHeader changes

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  // Sync with 'open' prop from scroll/parent
  useLayoutEffect(() => {
    const tl = tlRef.current;
    if (!tl) return;

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (open && !isExpanded) {
      setIsExpanded(true);
      setIsHamburgerOpen(true);
      tl.play();
    }

    if (!open && isExpanded) {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  }, [open]);

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav 
        ref={navRef} 
        className={`card-nav ${isExpanded ? 'open' : ''}`} 
        style={{ 
          backgroundColor: baseColor,
          boxShadow: hideHeader ? 'none' : undefined, // Remove nested shadows
          border: hideHeader ? 'none' : undefined    // Remove nested borders
        }}
      >
        {/* CHANGE 4: Only show top bar if NOT hidden */}
        {!hideHeader && (
          <div className="card-nav-top">
            <div
              className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
              onClick={toggleMenu}
              role="button"
              style={{ color: menuColor || '#000' }}
            >
              <div className="hamburger-line" />
              <div className="hamburger-line" />
            </div>

            <div className="logo-container">
              <img src={logo} alt={logoAlt} className="logo" />
            </div>

            <button
              type="button"
              className="card-nav-cta-button"
              style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
            >
              Get Started
            </button>
          </div>
        )}

        <div 
          className="card-nav-content" 
          aria-hidden={!isExpanded}
          style={{ paddingTop: hideHeader ? '0px' : '20px' }} // Tweak spacing
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <a key={`${lnk.label}-${i}`} className="nav-card-link" href={lnk.href}>
                    <GoArrowUpRight className="nav-card-link-icon" />
                    {lnk.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
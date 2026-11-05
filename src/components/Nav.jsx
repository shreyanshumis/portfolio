import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GITHUB_USERNAME } from "../constants";
import { useLang } from "../hooks/useLang";

const LINKS = [
  { to: "/",         en: "home",     },
  { to: "/about",    en: "about",    },
  { to: "/projects", en: "projects", },
  { to: "/contact",  en: "contact",  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, switchLang, t } = useLang();
  const isOdia = lang === "or";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0 36px", height: 64,
      background: "#000000",
      borderBottom: "1px solid #1c1c1c",
      boxShadow: scrolled ? "0 2px 32px rgba(0,0,0,0.8)" : "none",
      transition: "box-shadow 0.3s",
    }}>

      {/* Logo */}
      <NavLink to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 2 }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#555" }}>~/</span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "var(--yellow)", fontWeight: 600 }}>shreyanshu</span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "#555" }}> $</span>
        <span style={{ display: "inline-block", width: 8, height: 15, background: "var(--yellow)", marginLeft: 5, animation: "blink 1s step-end infinite", verticalAlign: "text-bottom" }} />
      </NavLink>

      {/* Right side */}
      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>

        {/* Nav links */}
        {LINKS.map(({ to, en }) => (
          <NavLink key={to} to={to} end={to === "/"}
            style={({ isActive }) => ({
              fontFamily:     isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace",
              fontSize:       isOdia ? 14 : 13,
              letterSpacing:  isOdia ? 0 : "0.05em",
              textDecoration: "none",
              color:          isActive ? "#ffffff" : "#888888",
              padding:        "6px 14px",
              borderBottom:   isActive ? "1px solid var(--yellow)" : "1px solid transparent",
              transition:     "color 0.2s",
            })}
            onMouseEnter={e => { e.currentTarget.style.color = "#cccccc"; }}
            onMouseLeave={e => { if (!e.currentTarget.getAttribute("aria-current")) e.currentTarget.style.color = "#888888"; }}>
            {isOdia ? t(en) : `./${en}`}
          </NavLink>
        ))}

        {/* GitHub */}
        <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "#aaaaaa", border: "1px solid #333", padding: "5px 14px", textDecoration: "none", marginLeft: 6, transition: "color 0.2s, border-color 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#666"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#aaaaaa"; e.currentTarget.style.borderColor = "#333"; }}>
          gh ↗
        </a>

        {/* Language switcher */}
        <button
          onClick={() => switchLang(isOdia ? "en" : "or")}
          title={isOdia ? "Switch to English" : "ଓଡ଼ିଆ ଭାଷାକୁ ବଦଳାନ୍ତୁ"}
          style={{
            display:       "flex",
            alignItems:    "center",
            gap:           6,
            fontFamily:    isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace",
            fontSize:      12,
            color:         isOdia ? "var(--yellow)" : "#888",
            background:    "transparent",
            border:        `1px solid ${isOdia ? "var(--yellow)" : "#2e2e2e"}`,
            padding:       "5px 12px",
            marginLeft:    8,
            letterSpacing: "0.03em",
            transition:    "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--yellow)"; e.currentTarget.style.color = "var(--yellow)"; }}
          onMouseLeave={e => { if (!isOdia) { e.currentTarget.style.borderColor = "#2e2e2e"; e.currentTarget.style.color = "#888"; } }}>
          {/* Globe icon */}
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M8 1C8 1 5.5 4 5.5 8C5.5 12 8 15 8 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M8 1C8 1 10.5 4 10.5 8C10.5 12 8 15 8 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M1.5 8H14.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M2.5 5H13.5M2.5 11H13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {isOdia ? "EN" : "ଓଡ଼ିଆ"}
        </button>
      </div>
    </nav>
  );
}

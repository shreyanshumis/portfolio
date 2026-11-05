import { NavLink } from "react-router-dom";
import { GITHUB_USERNAME } from "../constants";
import { useLang } from "../hooks/useLang";
import AsciiS from "./AsciiS";

const LINKS = ["/", "/about", "/projects", "/contact"];
const LABEL = { "/": "home", "/about": "about", "/projects": "projects", "/contact": "contact" };

export default function Footer() {
  const { lang, t } = useLang();
  const isOdia = lang === "or";
  const f = isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace";

  return (
    <footer style={{ borderTop: "1px solid var(--bg3)", background: "#0a0a0a", padding: "56px 36px 40px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
        <AsciiS cellSize={20} />
      </div>
      <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray3)" }}>
          <span style={{ color: "var(--yellow)" }}>©</span> {new Date().getFullYear()} shreyanshu m.
        </span>
        <div style={{ display: "flex", gap: 24 }}>
          {LINKS.map(to => (
            <NavLink key={to} to={to} end={to === "/"}
              style={({ isActive }) => ({ fontFamily: f, fontSize: 13, textDecoration: "none", letterSpacing: isOdia ? 0 : "0.06em", color: isActive ? "var(--yellow)" : "var(--gray3)", transition: "color 0.2s" })}>
              {isOdia ? t(LABEL[to]) : `./${LABEL[to]}`}
            </NavLink>
          ))}
        </div>
        <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer"
          style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray2)", letterSpacing: "0.08em" }}>
          GITHUB ↗
        </a>
      </div>
    </footer>
  );
}

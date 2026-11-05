import { useState } from "react";
import { LANG_COLOR } from "../constants";
import CornerBorders from "./CornerBorders";

export default function RepoCard({ repo, index = 0 }) {
  const [hov, setHov] = useState(false);
  const dot  = LANG_COLOR[repo.language] || "#444";
  const date = new Date(repo.updated_at).toLocaleDateString("en-GB", { month: "short", year: "numeric" });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      data-cursor="magnetic"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        "block",
        background:     hov ? "var(--bg2)" : "var(--bg)",
        border:         `1px solid ${hov ? "var(--yellow)" : "var(--border)"}`,
        padding:        "22px 24px",
        textDecoration: "none",
        transition:     "border-color 0.2s, background 0.2s, transform 0.2s",
        position:       "relative",
        transform:      hov ? "translateY(-2px)" : "none",
        height:         "100%",
      }}
    >
      <CornerBorders color={hov ? "var(--yellow)" : "var(--border2)"} size={10} thickness={1} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: hov ? "var(--yellow)" : "transparent", transition: "background 0.2s" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
        <span style={{ color: hov ? "var(--white)" : "var(--gray1)", fontSize: 14, fontWeight: 600, fontFamily: "JetBrains Mono, monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1, transition: "color 0.2s" }}>
          <span style={{ color: "var(--yellow)" }}>▸ </span>{repo.name}
        </span>
        {repo.fork && (
          <span style={{ fontSize: 10, color: "var(--gray3)", border: "1px solid var(--border2)", padding: "2px 7px", whiteSpace: "nowrap", flexShrink: 0 }}>FORK</span>
        )}
      </div>

      <p style={{ color: "var(--gray2)", fontSize: 13, fontFamily: "JetBrains Mono, monospace", lineHeight: 1.7, marginBottom: 18, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", minHeight: 40 }}>
        {repo.description || "// no description"}
      </p>

      <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        {repo.language && (
          <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--gray2)", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: dot, flexShrink: 0, display: "inline-block" }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && <span style={{ color: "var(--gray3)", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>★ {repo.stargazers_count}</span>}
        {repo.forks_count > 0    && <span style={{ color: "var(--gray3)", fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}>⑂ {repo.forks_count}</span>}
        <span style={{ color: "var(--gray4)", fontSize: 11, fontFamily: "JetBrains Mono, monospace", marginLeft: "auto" }}>{date}</span>
      </div>
    </a>
  );
}

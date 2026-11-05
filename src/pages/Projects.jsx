import { useState, useMemo } from "react";
import PageShell      from "../components/PageShell";
import RepoCard       from "../components/RepoCard";
import MagneticButton from "../components/MagneticButton";
import { useGitHub }  from "../hooks/useGitHub";
import { useT }       from "../hooks/useT";
import { useLang }    from "../hooks/useLang";
import { GITHUB_USERNAME } from "../constants";

export default function Projects() {
  const { repos, loading, error } = useGitHub();
  const { lang } = useLang();
  const t = useT();
  const isOdia = lang === "or";
  const f = isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace";
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const languages = useMemo(() => {
    if (!repos) return [];
    const set = new Set(repos.map(r => r.language).filter(Boolean));
    return ["all", ...Array.from(set).sort()];
  }, [repos]);

  const filtered = useMemo(() => {
    if (!repos) return [];
    return repos.filter(r => {
      const matchLang   = filter === "all" || r.language === filter;
      const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || (r.description || "").toLowerCase().includes(search.toLowerCase());
      return matchLang && matchSearch;
    });
  }, [repos, filter, search]);

  return (
    <PageShell>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 36px 88px" }}>

        <div style={{ marginBottom: 52, borderBottom: "1px solid var(--bg3)", paddingBottom: 36 }}>
          <div style={{ fontFamily: f, fontSize: 12, color: "var(--gray3)", marginBottom: 14, letterSpacing: isOdia ? 0 : "0.12em" }}>
            {t("// public repositories")}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 14 }}>
            <h1 style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: "clamp(36px,6vw,62px)", margin: 0, color: "var(--white)", letterSpacing: "-0.02em" }}>
              {isOdia ? "ପ୍ରକଳ୍ପ" : "projects"}<span style={{ color: "var(--yellow)" }}>.</span>
            </h1>
            <MagneticButton as="a" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" accentColor="var(--yellow)"
              style={{ fontFamily: f, fontSize: 13, color: "var(--yellow)", border: "1px solid var(--yellow-dim)", padding: "10px 20px", textDecoration: "none", background: "transparent" }}>
              {t("VIEW ON GITHUB ↗")}
            </MagneticButton>
          </div>
        </div>

        <div style={{ marginBottom: 36, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray3)", pointerEvents: "none" }}>❯</span>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder={t("search repos...")}
              style={{ width: "100%", background: "var(--bg2)", border: "1px solid var(--border)", color: "var(--white)", fontFamily: f, fontSize: 13, padding: "12px 14px 12px 32px", outline: "none", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = "var(--yellow)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"} />
          </div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {languages.map(lang => (
              <MagneticButton key={lang} as="button" onClick={() => setFilter(lang)} accentColor="var(--yellow)"
                style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, background: filter === lang ? "var(--yellow)" : "transparent", color: filter === lang ? "#000" : "var(--gray2)", border: `1px solid ${filter === lang ? "var(--yellow)" : "var(--border2)"}`, padding: "6px 14px", letterSpacing: "0.06em" }}>
                {lang === "all" ? t("all") : lang}
              </MagneticButton>
            ))}
          </div>
        </div>

        {!loading && (
          <div style={{ fontFamily: f, fontSize: 12, color: "var(--gray3)", marginBottom: 22 }}>
            <span style={{ color: "var(--yellow)" }}>//</span>{" "}
            {filtered.length} {filter === "all" ? t("repositories") : `${filter} ${t("repositories")}`}
            {search ? ` matching "${search}"` : ""}
          </div>
        )}

        {loading && <div style={{ textAlign: "center", padding: "88px 0", fontFamily: f, fontSize: 15, color: "var(--gray3)" }}><span style={{ color: "var(--yellow)" }}>⟳ </span>{t("fetching repositories...")}</div>}
        {error   && <div style={{ border: "1px solid var(--yellow)", padding: 22, fontFamily: f, fontSize: 14, color: "var(--yellow)" }}>⚠ {error}</div>}
        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "72px 0", fontFamily: f, fontSize: 14, color: "var(--gray3)" }}>
            <div style={{ fontSize: 28, marginBottom: 14, opacity: 0.3 }}>⟨/⟩</div>{t("no repositories found")}
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 14 }}>
            {filtered.map((repo, i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
          </div>
        )}
      </div>
    </PageShell>
  );
}

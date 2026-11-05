import { Link } from "react-router-dom";
import PageShell      from "../components/PageShell";
import RepoCard       from "../components/RepoCard";
import MagneticButton from "../components/MagneticButton";
import CornerBorders  from "../components/CornerBorders";
import { useGitHub }  from "../hooks/useGitHub";
import { useT }       from "../hooks/useT";
import { useLang }    from "../hooks/useLang";
import { GITHUB_USERNAME, SKILLS } from "../constants";

function Pill({ label }) {
  return (
    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--gray1)", background: "var(--bg2)", border: "1px solid var(--border2)", padding: "5px 13px", letterSpacing: "0.04em" }}>
      {label}
    </span>
  );
}

export default function Home() {
  const { repos, profile, loading } = useGitHub();
  const { lang } = useLang();
  const t = useT();
  const isOdia = lang === "or";
  const orFont = { fontFamily: "'Noto Sans Odia', sans-serif" };
  const topRepos = repos ? repos.slice(0, 3) : [];

  return (
    <PageShell>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 36px" }}>

        {/* HERO */}
        <section style={{ minHeight: "calc(100vh - 64px)", display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 60 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 36 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--yellow)", boxShadow: "0 0 8px var(--yellow)", display: "inline-block" }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--gray3)", letterSpacing: "0.14em", ...(isOdia ? orFont : {}) }}>
              {t("AVAILABLE FOR OPPORTUNITIES")}
            </span>
          </div>

          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray3)", marginBottom: 18 }}>
            <span style={{ color: "var(--yellow)" }}>// </span>
            <span style={isOdia ? orFont : {}}>{isOdia ? "ନମସ୍କାର, ଦୁନିଆ" : "hello, world"}</span>
          </div>

          <h1 style={{ margin: "0 0 8px", lineHeight: 1.05 }}>
            <span style={{ display: "block", fontFamily: "var(--serif)", fontWeight: 700, fontSize: "clamp(52px, 9vw, 100px)", color: "var(--white)", letterSpacing: "-0.02em" }}>
              {isOdia ? "ଶ୍ରେୟାଂଶୁ" : "Shreyanshu"}
            </span>
            <span style={{ display: "block", fontFamily: "var(--serif)", fontWeight: 700, fontSize: "clamp(52px, 9vw, 100px)", color: "var(--yellow)", letterSpacing: "-0.02em" }}>
              M.
            </span>
          </h1>

          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 14, color: "var(--gray3)", margin: "24px 0 36px", lineHeight: 2.1 }}>
            <span style={{ color: "var(--gray4)" }}>const </span>
            <span style={{ color: "var(--gray2)" }}>role </span>
            <span style={{ color: "var(--gray4)" }}>= </span>
            <span style={{ color: "var(--yellow)", ...(isOdia ? orFont : {}) }}>"{t("MCA Student · Systems Builder · Open Source")}"</span>
            <span style={{ color: "var(--gray4)" }}>;</span>
            <br />
            <span style={{ color: "var(--gray4)" }}>const </span>
            <span style={{ color: "var(--gray2)" }}>location </span>
            <span style={{ color: "var(--gray4)" }}>= </span>
            <span style={{ color: "var(--white)", ...(isOdia ? orFont : {}) }}>"{t("VIT Vellore, India")}"</span>
            <span style={{ color: "var(--gray4)" }}>;</span>
          </div>

          <div style={{ display: "flex", gap: 9, flexWrap: "wrap", marginBottom: 52 }}>
            {SKILLS.map(s => <Pill key={s.name} label={s.name} />)}
          </div>

          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 72 }}>
            <MagneticButton as={Link} to="/projects" accentColor="var(--yellow)"
              style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 13, fontWeight: 600, background: "var(--yellow)", color: "#000", border: "1px solid var(--yellow)", padding: "14px 32px", letterSpacing: isOdia ? 0 : "0.1em", textDecoration: "none" }}>
              {t("VIEW PROJECTS →")}
            </MagneticButton>
            <MagneticButton as={Link} to="/about" accentColor="var(--gray2)"
              style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 13, background: "transparent", color: "var(--gray1)", border: "1px solid var(--border2)", padding: "14px 32px", letterSpacing: isOdia ? 0 : "0.1em", textDecoration: "none" }}>
              {t("ABOUT ME")}
            </MagneticButton>
            <MagneticButton as="a" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" accentColor="var(--gray2)"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, background: "transparent", color: "var(--gray2)", border: "1px solid var(--border)", padding: "14px 32px", letterSpacing: "0.1em", textDecoration: "none" }}>
              GITHUB ↗
            </MagneticButton>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ height: 1, width: 40, background: "var(--yellow)" }} />
            <span style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 11, color: "var(--gray3)", letterSpacing: isOdia ? 0 : "0.14em" }}>
              {t("SCROLL")}
            </span>
          </div>
        </section>

        {/* STATS */}
        {profile && (
          <section style={{ marginBottom: 88 }}>
            <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray3)", marginBottom: 22 }}>
              <span style={{ color: "var(--yellow)" }}>❯ </span>{t("gh profile stats")}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)", border: "1px solid var(--border2)", position: "relative" }}>
              <CornerBorders color="var(--yellow)" size={12} thickness={1.5} />
              {[
                { labelKey: "REPOS",     val: profile.public_repos },
                { labelKey: "FOLLOWERS", val: profile.followers },
                { labelKey: "FOLLOWING", val: profile.following },
                { labelKey: "MEMBER",    val: new Date(profile.created_at).getFullYear() },
              ].map(({ labelKey, val }, i) => (
                <div key={i} style={{ textAlign: "center", padding: "26px 12px", background: "var(--bg)" }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "clamp(22px,3vw,32px)", fontWeight: 700, color: "var(--yellow)", marginBottom: 7 }}>{val}</div>
                  <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 11, color: "var(--gray3)", letterSpacing: isOdia ? 0 : "0.12em" }}>{t(labelKey)}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* TOP REPOS */}
        <section style={{ marginBottom: 88 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
            <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray3)" }}>
              <span style={{ color: "var(--yellow)" }}>❯ </span>{t("gh repo list --limit 3")}
            </div>
            <MagneticButton as={Link} to="/projects" accentColor="var(--yellow)"
              style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 12, color: "var(--yellow)", textDecoration: "none", border: "1px solid var(--yellow-dim)", padding: "5px 14px", background: "transparent" }}>
              {t("VIEW ALL →")}
            </MagneticButton>
          </div>
          {loading ? (
            <div style={{ textAlign: "center", padding: "48px 0", fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 14, color: "var(--gray3)" }}>
              <span style={{ color: "var(--yellow)" }}>⟳ </span>{t("fetching...")}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 12 }}>
              {topRepos.map((r, i) => <RepoCard key={r.id} repo={r} index={i} />)}
            </div>
          )}
        </section>
      </div>
    </PageShell>
  );
}

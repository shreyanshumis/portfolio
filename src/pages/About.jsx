import { useEffect, useRef, useState } from "react";
import PageShell     from "../components/PageShell";
import CupReflow     from "../components/CupReflow";
import CornerBorders from "../components/CornerBorders";
import { useGitHub } from "../hooks/useGitHub";
import { useT }      from "../hooks/useT";
import { useLang }   from "../hooks/useLang";
import { ABOUT_TEXT, SKILLS } from "../constants";

function SLabel({ cmd, sub, isOdia }) {
  const f = isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace";
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray3)", marginBottom: 5 }}>
        <span style={{ color: "var(--yellow)" }}>❯ </span>
        <span style={{ color: "var(--white)", fontFamily: f }}>{cmd}</span>
      </div>
      {sub && <div style={{ fontFamily: f, fontSize: 12, color: "var(--gray3)" }}>// {sub}</div>}
    </div>
  );
}

function SkillBar({ name, level }) {
  const [filled, setFilled] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setFilled(level); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [level]);
  return (
    <div ref={ref} style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray1)" }}>{name}</span>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--gray3)" }}>{level}%</span>
      </div>
      <div style={{ height: 2, background: "var(--bg3)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${filled}%`, background: "var(--yellow)", transition: "width 1.1s cubic-bezier(0.4,0,0.2,1)", boxShadow: "0 0 8px var(--yellow)" }} />
      </div>
    </div>
  );
}

export default function About() {
  const { profile } = useGitHub();
  const { lang } = useLang();
  const t = useT();
  const isOdia = lang === "or";
  const orFont = { fontFamily: "'Noto Sans Odia', sans-serif" };
  const [aboutW, setAboutW] = useState(0);
  const aboutRef = useRef(null);

  useEffect(() => {
    const el = aboutRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setAboutW(e.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const aboutText = t(ABOUT_TEXT);

  return (
    <PageShell>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 36px 88px" }}>

        <div style={{ marginBottom: 60, borderBottom: "1px solid var(--bg3)", paddingBottom: 36 }}>
          <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 12, color: "var(--gray3)", marginBottom: 14, letterSpacing: isOdia ? 0 : "0.12em" }}>
            {t("// who am i")}
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: "clamp(36px,6vw,62px)", margin: 0, color: "var(--white)", letterSpacing: "-0.02em" }}>
            {isOdia ? "ବିଷୟ" : "about"}<span style={{ color: "var(--yellow)" }}>.</span>{isOdia ? "md" : "md"}
          </h1>
        </div>

        <section style={{ marginBottom: 80 }}>
          <SLabel cmd={t("cat about.md")} sub={t("drag the cursor — text reflows around its silhouette")} isOdia={isOdia} />
          <div ref={aboutRef} style={{ width: "100%" }}>
            {aboutW > 0 && <CupReflow text={aboutText} containerW={aboutW} />}
          </div>
        </section>

        <section style={{ marginBottom: 80 }}>
          <SLabel cmd={t("skills --list")} sub={t("proficiency levels")} isOdia={isOdia} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "0 52px" }}>
            {SKILLS.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
          </div>
        </section>

        {profile && (
          <section style={{ marginBottom: 80 }}>
            <SLabel cmd={t("gh profile view")} isOdia={isOdia} />
            <div style={{ border: "1px solid var(--border2)", display: "flex", flexWrap: "wrap", overflow: "hidden", position: "relative" }}>
              <CornerBorders color="var(--yellow)" size={12} thickness={1.5} />
              <div style={{ background: "var(--bg2)", borderRight: "1px solid var(--bg3)", padding: "32px 28px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, minWidth: 150 }}>
                <img src={profile.avatar_url} alt="avatar" style={{ width: 80, height: 80, borderRadius: "50%", border: "2px solid var(--yellow)", display: "block" }} />
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--gray2)", textAlign: "center" }}>{profile.login}</span>
              </div>
              <div style={{ flex: 1, padding: "32px 28px", minWidth: 200 }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 16, fontWeight: 600, color: "var(--white)", marginBottom: 10 }}>{profile.name}</div>
                <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray2)", lineHeight: 1.8, marginBottom: 18 }}>
                  {profile.bio || t("I aspire to create systems which benefit everyone.")}
                </div>
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  {[
                    { labelKey: "repositories", val: profile.public_repos },
                    { labelKey: "followers",    val: profile.followers },
                    { labelKey: "following",    val: profile.following },
                  ].map(({ labelKey, val }) => (
                    <div key={labelKey}>
                      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 20, fontWeight: 700, color: "var(--yellow)" }}>{val}</span>
                      <span style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 12, color: "var(--gray3)", marginLeft: 6 }}>{t(labelKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section>
          <SLabel cmd={t("education --history")} isOdia={isOdia} />
          <div style={{ borderLeft: "1px solid var(--yellow)", paddingLeft: 28, display: "flex", flexDirection: "column", gap: 32 }}>
            {[
              { degreeKey: "Master of Computer Applications (MCA)", schoolKey: "VIT Vellore", year: "2024 – 2026", noteKey: "Currently enrolled" },
              { degreeKey: "Bachelor of Computer Applications (BCA)", schoolKey: "Previous Institution", year: "2021 – 2024", noteKey: "Graduated" },
            ].map((e, i) => (
              <div key={i} style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -33, top: 5, width: 9, height: 9, borderRadius: "50%", background: "var(--yellow)", boxShadow: "0 0 6px var(--yellow)", border: "2px solid var(--bg)" }} />
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "var(--yellow)", marginBottom: 5, letterSpacing: "0.08em" }}>{e.year}</div>
                <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 15, color: "var(--white)", fontWeight: 600, marginBottom: 5 }}>{t(e.degreeKey)}</div>
                <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 13, color: "var(--gray2)" }}>{t(e.schoolKey)}</div>
                <div style={{ fontFamily: isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace", fontSize: 12, color: "var(--gray3)", marginTop: 5 }}>{t(e.noteKey)}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </PageShell>
  );
}

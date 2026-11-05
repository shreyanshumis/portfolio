import { useState } from "react";
import PageShell      from "../components/PageShell";
import MagneticButton from "../components/MagneticButton";
import CornerBorders  from "../components/CornerBorders";
import { useT }       from "../hooks/useT";
import { useLang }    from "../hooks/useLang";
import { GITHUB_USERNAME } from "../constants";

function ContactRow({ label, val, href, i }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display: "flex", textDecoration: "none", background: hov ? "var(--bg2)" : "var(--bg)", borderTop: i > 0 ? "1px solid var(--bg3)" : "none", transition: "background 0.2s" }}>
      <span style={{ background: hov ? "var(--bg3)" : "var(--bg2)", color: "var(--yellow)", padding: "18px 22px", minWidth: 120, borderRight: "1px solid var(--bg3)", fontSize: 13, fontFamily: "JetBrains Mono, monospace", flexShrink: 0, transition: "background 0.2s" }}>
        {label}
      </span>
      <span style={{ color: hov ? "var(--white)" : "var(--gray2)", padding: "18px 22px", fontSize: 13, fontFamily: "JetBrains Mono, monospace", transition: "color 0.2s", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {val}
      </span>
      <span style={{ color: "var(--gray3)", padding: "18px 22px", marginLeft: "auto", fontSize: 13, fontFamily: "JetBrains Mono, monospace", flexShrink: 0 }}>↗</span>
    </a>
  );
}

export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [sending, setSending] = useState(false);
  const { lang } = useLang();
  const t = useT();
  const isOdia = lang === "or";
  const f = isOdia ? "'Noto Sans Odia', sans-serif" : "JetBrains Mono, monospace";

  const inputStyle = {
    width: "100%", background: "var(--bg2)", border: "1px solid var(--border)",
    color: "var(--white)", fontFamily: f, fontSize: 14,
    padding: "14px 16px", outline: "none", resize: "vertical",
    transition: "border-color 0.2s",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    // Uncomment and add your Formspree ID:
    // await fetch("https://formspree.io/f/YOUR_FORM_ID", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    await new Promise(r => setTimeout(r, 800));
    setSent(true);
  };

  return (
    <PageShell>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 36px 88px" }}>

        <div style={{ marginBottom: 60, borderBottom: "1px solid var(--bg3)", paddingBottom: 36 }}>
          <div style={{ fontFamily: f, fontSize: 12, color: "var(--gray3)", marginBottom: 14, letterSpacing: isOdia ? 0 : "0.12em" }}>
            {t("// get in touch")}
          </div>
          <h1 style={{ fontFamily: "var(--serif)", fontWeight: 700, fontSize: "clamp(36px,6vw,62px)", margin: 0, color: "var(--white)", letterSpacing: "-0.02em" }}>
            {isOdia ? "ଯୋଗାଯୋଗ" : "contact"}<span style={{ color: "var(--yellow)" }}>.</span>
          </h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 56, alignItems: "start" }}>

          {/* LEFT */}
          <div>
            <div style={{ fontFamily: f, fontSize: 13, color: "var(--gray3)", marginBottom: 22 }}>
              <span style={{ color: "var(--yellow)" }}>❯ </span>{t("// find me online")}
            </div>
            <div style={{ border: "1px solid var(--border2)", overflow: "hidden", marginBottom: 36, position: "relative" }}>
              <CornerBorders color="var(--yellow)" size={10} thickness={1.5} />
              {[
                { label: "github",   val: `github.com/${GITHUB_USERNAME}`,      href: `https://github.com/${GITHUB_USERNAME}` },
                { label: "email",    val: "shreyanshumishra.work@gmail.com",     href: "mailto:shreyanshumishra.work@gmail.com" },
                { label: "linkedin", val: "linkedin.com/in/shreyanshumishra",    href: "https://www.linkedin.com/in/shreyanshumishra/" },
                { label: "twitter",  val: "@the_serpentis",                      href: "https://twitter.com/the_serpentis" },
              ].map((r, i) => <ContactRow key={r.label} {...r} i={i} />)}
            </div>
            <p style={{ fontFamily: f, fontSize: 13, color: "var(--gray2)", lineHeight: 2, marginBottom: 32 }}>
              {t("I'm open to internships, collaborations, and interesting side projects. Response time is usually within 24 hours.")}
            </p>
            <MagneticButton as="a" href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer" accentColor="var(--yellow)"
              style={{ fontFamily: f, fontSize: 13, fontWeight: 600, background: "var(--white)", color: "#000", border: "1px solid var(--white)", padding: "15px 32px", letterSpacing: isOdia ? 0 : "0.1em", textDecoration: "none", display: "inline-block" }}>
              {t("SEE ALL WORK ON GITHUB ↗")}
            </MagneticButton>
          </div>

          {/* RIGHT */}
          <div>
            <div style={{ fontFamily: f, fontSize: 13, color: "var(--gray3)", marginBottom: 22 }}>
              <span style={{ color: "var(--yellow)" }}>❯ </span>{t("// send a message")}
            </div>
            {sent ? (
              <div style={{ border: "1px solid var(--yellow)", padding: 32, fontFamily: f, position: "relative" }}>
                <CornerBorders color="var(--yellow)" size={10} thickness={1.5} />
                <div style={{ fontSize: 24, color: "var(--yellow)", marginBottom: 14 }}>✓</div>
                <div style={{ fontSize: 15, color: "var(--white)", marginBottom: 8 }}>{t("Message sent.")}</div>
                <div style={{ fontSize: 13, color: "var(--gray2)" }}>{t("// I'll get back to you soon.")}</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { key: "name",    labelKey: "NAME",    type: "text",  placeholderKey: "your name" },
                  { key: "email",   labelKey: "EMAIL",   type: "email", placeholderKey: "your@email.com" },
                ].map(({ key, labelKey, type, placeholderKey }) => (
                  <div key={key}>
                    <label style={{ fontFamily: f, fontSize: 11, color: "var(--gray3)", display: "block", marginBottom: 7, letterSpacing: isOdia ? 0 : "0.1em" }}>{t(labelKey)}</label>
                    <input required type={type} value={form[key]}
                      onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))}
                      placeholder={t(placeholderKey)} style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--yellow)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: f, fontSize: 11, color: "var(--gray3)", display: "block", marginBottom: 7, letterSpacing: isOdia ? 0 : "0.1em" }}>{t("MESSAGE")}</label>
                  <textarea required rows={6} value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder={t("// what's on your mind?")}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "var(--yellow)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <MagneticButton as="button" type="submit" disabled={sending} accentColor="var(--yellow)"
                  style={{ background: "var(--yellow)", color: "#000", border: "1px solid var(--yellow)", fontFamily: f, fontSize: 13, fontWeight: 600, padding: "15px", letterSpacing: isOdia ? 0 : "0.1em", opacity: sending ? 0.7 : 1, width: "100%" }}>
                  {sending ? t("SENDING...") : t("SEND MESSAGE →")}
                </MagneticButton>
                <div style={{ fontFamily: f, fontSize: 11, color: "var(--gray3)" }}>
                  <span style={{ color: "var(--yellow)" }}>// </span>
                  {t("// wire up: add your Formspree ID to handleSubmit")}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

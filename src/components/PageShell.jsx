import { useEffect, useRef } from "react";
import Nav    from "./Nav";
import Footer from "./Footer";

export default function PageShell({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const el = ref.current;
    if (!el) return;
    el.style.opacity   = "0";
    el.style.transform = "translateY(14px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
      el.style.opacity    = "1";
      el.style.transform  = "translateY(0)";
    });
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--white)", display: "flex", flexDirection: "column" }}>
      <Nav />
      <main ref={ref} style={{ flex: 1, paddingTop: 72 }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

import { useRef, useState } from "react";

export default function MagneticButton({ children, as: Tag = "button", style = {}, accentColor = "var(--yellow)", ...props }) {
  const [hov, setHov] = useState(false);
  return (
    <Tag
      data-cursor="magnetic"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:       "relative",
        overflow:       "hidden",
        display:        "inline-flex",
        alignItems:     "center",
        justifyContent: "center",
        transform:      hov ? "scale(1.05)" : "scale(1)",
        transition:     "transform 0.22s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.22s",
        boxShadow:      hov ? `0 0 0 1px ${accentColor}, 0 6px 24px rgba(0,0,0,0.5)` : "none",
        ...style,
      }}
      {...props}
    >
      <span style={{ position: "absolute", inset: 0, background: accentColor, opacity: hov ? 0.07 : 0, transition: "opacity 0.22s", pointerEvents: "none" }} />
      {children}
    </Tag>
  );
}

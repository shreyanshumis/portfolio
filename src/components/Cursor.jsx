import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef  = useRef(null);
  const trailerRef = useRef(null);
  const pos        = useRef({ x: -100, y: -100 });
  const trailer    = useRef({ x: -100, y: -100 });
  const raf        = useRef(null);
  const angle      = useRef(0);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY };
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isClickable = el && (
        el.closest("a, button, [data-cursor]") !== null ||
        el.tagName === "INPUT" || el.tagName === "TEXTAREA"
      );
      setHovering(!!isClickable);
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mousedown",  onDown);
    window.addEventListener("mouseup",    onUp);

    const animate = () => {
      trailer.current.x += (pos.current.x - trailer.current.x) * 0.10;
      trailer.current.y += (pos.current.y - trailer.current.y) * 0.10;
      angle.current = (angle.current + 2.4) % 360;

      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + "px";
        cursorRef.current.style.top  = pos.current.y + "px";
        cursorRef.current.style.transform = `translate(-50%, -50%) scale(${clicking ? 0.75 : 1})`;
      }
      if (trailerRef.current) {
        trailerRef.current.style.left = trailer.current.x + "px";
        trailerRef.current.style.top  = trailer.current.y + "px";
        // Rotate the conic-gradient border by updating the angle
        const a = angle.current;
        // We fake a rotating rainbow border using a conic-gradient on a pseudo wrapper
        trailerRef.current.style.setProperty("--ca", `${a}deg`);
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const tSize = hovering ? 44 : 22;

  return (
    <>
      {/* Main white triangular cursor */}
      <div ref={cursorRef} style={{
        position:      "fixed",
        pointerEvents: "none",
        zIndex:        9999,
        transition:    "transform 0.1s ease",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16"
          style={{ display: "block", filter: "drop-shadow(0 0 3px rgba(255,255,255,0.6))" }}>
          <polygon points="8,1 15,14 1,14"
            fill="white" stroke="rgba(0,0,0,0.4)" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Trailing ring with rotating rainbow border */}
      <div ref={trailerRef} style={{
        position:      "fixed",
        pointerEvents: "none",
        zIndex:        9998,
        width:         tSize,
        height:        tSize,
        borderRadius:  hovering ? "3px" : "50%",
        transform:     "translate(-50%, -50%)",
        transition:    "width 0.3s ease, height 0.3s ease, border-radius 0.3s ease",
        // Rainbow border via outline trick + conic pseudo
        "--ca":        "0deg",
      }}>
        {/* Inner canvas for the rotating rainbow ring */}
        <RainbowRing size={tSize} hovering={hovering} />
      </div>
    </>
  );
}

// Renders a rotating conic-gradient ring via a canvas updated every frame
function RainbowRing({ size, hovering }) {
  const cvRef = useRef(null);
  const raf   = useRef(null);
  const angle = useRef(0);

  useEffect(() => {
    const cv  = cvRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const s   = size * window.devicePixelRatio;
    cv.width  = s;
    cv.height = s;
    cv.style.width  = size + "px";
    cv.style.height = size + "px";

    const draw = () => {
      angle.current = (angle.current + 2.5) % 360;
      const cx = s / 2, cy = s / 2, r = s / 2 - 1;
      const thickness = window.devicePixelRatio * (hovering ? 2 : 1.5);

      ctx.clearRect(0, 0, s, s);

      // Draw rainbow arc
      const steps = 360;
      for (let i = 0; i < steps; i++) {
        const startAngle = ((i + angle.current) * Math.PI) / 180;
        const endAngle   = ((i + angle.current + 1.5) * Math.PI) / 180;
        const hue = (i / steps) * 360;
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle);
        ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.lineWidth   = thickness;
        ctx.stroke();
      }
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf.current);
  }, [size, hovering]);

  return (
    <canvas ref={cvRef} style={{
      position:     "absolute",
      inset:        0,
      borderRadius: hovering ? "3px" : "50%",
      overflow:     "hidden",
    }} />
  );
}

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { CUP_VW, CUP_VH, CUP_PATH } from "../constants";

export const CUP_RW = 120;
export const CUP_RH = 160;

const FONT_PX  = 14;
const FONT_STR = `${FONT_PX}px JetBrains Mono, monospace`;
const LINE_H   = 24;
const TEXT_PAD = 26;

function buildSiloMap() {
  const cv  = document.createElement("canvas");
  cv.width  = CUP_VW; cv.height = CUP_VH;
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#000"; ctx.fillRect(0, 0, CUP_VW, CUP_VH);
  ctx.fillStyle = "#fff"; ctx.fill(new Path2D(CUP_PATH));
  const { data } = ctx.getImageData(0, 0, CUP_VW, CUP_VH);
  return Array.from({ length: CUP_VH }, (_, y) => {
    let l = -1, r = -1;
    for (let x = 0; x < CUP_VW; x++) {
      if (data[(y * CUP_VW + x) * 4] > 128) { if (l < 0) l = x; r = x; }
    }
    return l < 0 ? null : { left: l, right: r };
  });
}

export function prepareChars(text) {
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");
  ctx.font = FONT_STR;
  return [...text].map(ch => ({ ch, w: ctx.measureText(ch).width }));
}

export function layoutChars(chars, containerW, cupX, cupY, siloMap) {
  const sx = CUP_RW / CUP_VW, sy = CUP_RH / CUP_VH;
  const glyphs = [];
  let ci = 0, y = LINE_H;
  while (ci < chars.length) {
    const vbRow = Math.round((y - LINE_H / 2 - cupY) / sy);
    const inY   = vbRow >= 0 && vbRow < CUP_VH;
    let segs;
    if (!inY || !siloMap[vbRow]) {
      segs = [{ x: 0, maxW: containerW }];
    } else {
      const { left: vL, right: vR } = siloMap[vbRow];
      const eL = cupX + vL * sx - TEXT_PAD, eR = cupX + vR * sx + TEXT_PAD;
      segs = [];
      if (eL > 36)              segs.push({ x: 0,  maxW: eL });
      if (containerW - eR > 36) segs.push({ x: eR, maxW: containerW - eR });
      if (!segs.length) { y += LINE_H; continue; }
    }
    let placed = false;
    for (const seg of segs) {
      let cx = seg.x;
      while (ci < chars.length) {
        const { ch, w } = chars[ci];
        if (cx + w > seg.x + seg.maxW + 0.5) break;
        glyphs.push({ ch, x: cx, y });
        cx += w; ci++; placed = true;
      }
    }
    if (!placed && ci < chars.length) { glyphs.push({ ch: chars[ci].ch, x: segs[0].x, y }); ci++; }
    y += LINE_H;
    if (y > 3000) break;
  }
  return glyphs;
}

export function CoffeeCupSVG({ width, height }) {
  return (
    <svg viewBox="0 0 100 133" width={width} height={height}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", filter: "drop-shadow(2px 3px 6px rgba(0,0,0,0.7)) drop-shadow(0 0 12px rgba(245,197,24,0.15))" }}>

      {/* Thick dark outer stroke for contrast against any background */}
      <polygon
        points="0,0 0,116 32,85 50,130 65,124 47,79 87,79"
        fill="white"
        stroke="#111111"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Yellow accent stroke — sits on top, thinner */}
      <polygon
        points="0,0 0,116 32,85 50,130 65,124 47,79 87,79"
        fill="white"
        stroke="#f5c518"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Inner shadow triangle — subtle depth at the tip */}
      <polygon
        points="0,0 0,116 32,85 50,130 65,124 47,79 87,79"
        fill="rgba(0,0,0,0.04)"
        stroke="none"
      />
    </svg>
  );
}

export default function CupReflow({ text, containerW }) {
  const [pos, setPos] = useState({ x: containerW - CUP_RW - 20, y: 10 });
  const dragging = useRef(false);
  const offset   = useRef({ x: 0, y: 0 });
  const ref      = useRef(null);

  const siloMap = useMemo(buildSiloMap, []);
  const chars   = useMemo(() => prepareChars(text), [text]);
  const glyphs  = useMemo(
    () => containerW > 0 ? layoutChars(chars, containerW, pos.x, pos.y, siloMap) : [],
    [chars, containerW, pos, siloMap]
  );

  const textH    = glyphs.length ? glyphs[glyphs.length - 1].y + LINE_H + 28 : 300;
  const contentH = Math.min(Math.max(textH, pos.y + CUP_RH + 32), 520);

  const startDrag = useCallback((cx, cy, rect) => {
    dragging.current = true;
    offset.current   = { x: cx - rect.left, y: cy - rect.top };
  }, []);

  useEffect(() => {
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
    const move = (cx, cy) => {
      if (!dragging.current || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      setPos({ x: clamp(cx - r.left - offset.current.x, 0, containerW - CUP_RW), y: clamp(cy - r.top - offset.current.y, 0, contentH - CUP_RH) });
    };
    const mm = e => move(e.clientX, e.clientY);
    const tm = e => { e.preventDefault(); move(e.touches[0].clientX, e.touches[0].clientY); };
    const up = () => { dragging.current = false; };
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseup",   up);
    window.addEventListener("touchmove", tm, { passive: false });
    window.addEventListener("touchend",  up);
    return () => {
      window.removeEventListener("mousemove", mm);
      window.removeEventListener("mouseup",   up);
      window.removeEventListener("touchmove", tm);
      window.removeEventListener("touchend",  up);
    };
  }, [containerW, contentH]);

  useEffect(() => {
    if (containerW) setPos(p => ({ ...p, x: Math.min(p.x, containerW - CUP_RW) }));
  }, [containerW]);

  return (
    <div ref={ref} style={{ position: "relative", width: "100%", height: contentH, userSelect: "none" }}>
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }}>
        {glyphs.map((g, i) => (
          <text key={i} x={g.x} y={g.y} fontFamily="JetBrains Mono, monospace" fontSize={FONT_PX} fill="var(--gray2)">{g.ch}</text>
        ))}
      </svg>
      <div
        onMouseDown={e => { e.preventDefault(); startDrag(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect()); }}
        onTouchStart={e => startDrag(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget.getBoundingClientRect())}
        style={{ position: "absolute", left: pos.x, top: pos.y, width: CUP_RW, height: CUP_RH, cursor: "none", zIndex: 10, touchAction: "none", willChange: "left, top" }}>
        <CoffeeCupSVG width={CUP_RW} height={CUP_RH} />
        <p style={{ textAlign: "center", fontSize: 10, color: "var(--gray3)", fontFamily: "JetBrains Mono, monospace", marginTop: 4, letterSpacing: "0.08em" }}>drag me</p>
      </div>
    </div>
  );
}

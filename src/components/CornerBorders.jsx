export default function CornerBorders({ color = "var(--yellow)", size = 14, thickness = 1.5, gap = 0 }) {
  const c = (top, left, right, bottom) => ({
    position: "absolute",
    width: size, height: size,
    borderColor: color, borderStyle: "solid", borderWidth: 0,
    borderTopWidth:    top    ? thickness : 0,
    borderLeftWidth:   left   ? thickness : 0,
    borderRightWidth:  right  ? thickness : 0,
    borderBottomWidth: bottom ? thickness : 0,
    top:    top    ? gap : undefined,
    bottom: bottom ? gap : undefined,
    left:   left   ? gap : undefined,
    right:  right  ? gap : undefined,
    pointerEvents: "none",
  });
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }}>
      <div style={c(true,  true,  false, false)} />
      <div style={c(true,  false, true,  false)} />
      <div style={c(false, true,  false, true )} />
      <div style={c(false, false, true,  true )} />
    </div>
  );
}

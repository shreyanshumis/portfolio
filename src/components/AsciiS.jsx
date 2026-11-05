const CHARS = "01{}[]<>/\\|=+-*#@!?;:.,~`アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)];
}

const S_GRID = [
  [0,1,1,1,1,1,1,1,0],
  [1,1,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,0,0],
  [1,1,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,0,0],
  [0,0,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,1,1],
  [1,1,0,0,0,0,0,1,1],
  [0,1,1,1,1,1,1,1,0],
];

export default function AsciiS({ cellSize = 20 }) {
  return (
    <div style={{ display: "inline-block", lineHeight: 1, userSelect: "none" }}>
      {S_GRID.map((row, ri) => (
        <div key={ri} style={{ display: "flex" }}>
          {row.map((filled, ci) => (
            <span key={ci} style={{
              display:    "inline-block",
              width:      cellSize,
              height:     cellSize,
              fontSize:   Math.round(cellSize * 0.62),
              fontFamily: "JetBrains Mono, monospace",
              fontWeight: 500,
              textAlign:  "center",
              lineHeight: `${cellSize}px`,
              color:      filled ? "#ffffff" : "transparent",
              textShadow: filled ? "0 0 6px rgba(255,255,255,0.5)" : "none",
            }}>
              {filled ? randChar() : " "}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

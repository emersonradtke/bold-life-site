import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

// Brain SVG path that forms the "road" - stylized brain outline as a single continuous path
// ViewBox: 0 0 400 500
const BRAIN_PATH = `
  M 200 30
  C 240 30, 310 50, 330 100
  C 355 155, 340 200, 310 230
  C 350 245, 370 280, 360 320
  C 350 360, 315 385, 280 390
  C 295 420, 285 455, 260 470
  C 240 480, 220 475, 200 470
  C 180 475, 160 480, 140 470
  C 115 455, 105 420, 120 390
  C 85 385, 50 360, 40 320
  C 30 280, 50 245, 90 230
  C 60 200, 45 155, 70 100
  C 90 50, 160 30, 200 30
  Z
`;

// The actual road path following brain gyri (folds)
const ROAD_PATH = `
  M 200 45
  C 230 45 280 60 300 95
  C 325 140 310 180 285 208
  C 320 222 345 258 338 298
  C 330 338 298 362 268 368
  C 280 395 272 428 252 440
  C 236 450 218 448 200 445
  C 182 448 164 450 148 440
  C 128 428 120 395 132 368
  C 102 362 70 338 62 298
  C 55 258 80 222 115 208
  C 90 180 75 140 100 95
  C 120 60 170 45 200 45
`;

export default function BrainRoad({ items, renderNode }) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [nodePositions, setNodePositions] = useState([]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end end'] });
  const rawDash = useTransform(scrollYProgress, [0, 1], [0, pathLength]);
  const animatedDash = useSpring(rawDash, { stiffness: 50, damping: 18 });

  useEffect(() => {
    const pathEl = svgRef.current?.querySelector('#road-path');
    if (!pathEl) return;
    const len = pathEl.getTotalLength();
    setPathLength(len);

    if (items.length > 0) {
      const positions = items.map((_, i) => {
        const t = i / Math.max(items.length - 1, 1);
        const pt = pathEl.getPointAtLength(t * len);
        return { x: pt.x, y: pt.y };
      });
      setNodePositions(positions);
    }
  }, [items]);

  return (
    <div ref={containerRef} className="relative w-full flex justify-center">
      <div className="relative" style={{ width: 400, height: 500 }}>
        <svg
          ref={svgRef}
          viewBox="0 0 400 500"
          width="400"
          height="500"
          className="absolute inset-0"
          style={{ overflow: 'visible' }}
        >
          {/* Brain outline glow */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="nodeGlow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Brain background fill */}
          <path d={BRAIN_PATH} fill="hsl(228 60% 13% / 0.6)" stroke="hsl(205 73% 54% / 0.15)" strokeWidth="1" />

          {/* Road track (dim) */}
          <path
            id="road-path"
            d={ROAD_PATH}
            fill="none"
            stroke="hsl(228 40% 22%)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Animated road fill */}
          {pathLength > 0 && (
            <motion.path
              d={ROAD_PATH}
              fill="none"
              stroke="hsl(205 73% 54%)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: animatedDash,
              }}
            />
          )}

          {/* Brain gyri lines (decorative) */}
          <path d="M 200 45 C 200 90 170 110 155 140" fill="none" stroke="hsl(205 73% 54% / 0.08)" strokeWidth="2" />
          <path d="M 200 45 C 200 90 230 110 245 140" fill="none" stroke="hsl(205 73% 54% / 0.08)" strokeWidth="2" />
          <path d="M 115 208 C 140 195 165 200 180 220" fill="none" stroke="hsl(205 73% 54% / 0.08)" strokeWidth="2" />
          <path d="M 285 208 C 260 195 235 200 220 220" fill="none" stroke="hsl(205 73% 54% / 0.08)" strokeWidth="2" />
          <path d="M 62 298 C 100 275 130 285 145 310" fill="none" stroke="hsl(205 73% 54% / 0.08)" strokeWidth="2" />
          <path d="M 338 298 C 300 275 270 285 255 310" fill="none" stroke="hsl(205 73% 54% / 0.08)" strokeWidth="2" />
        </svg>

        {/* Render nodes on top of SVG */}
        {nodePositions.map((pos, i) => (
          <div
            key={items[i]?.id || i}
            className="absolute"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          >
            {renderNode(items[i], i, pos)}
          </div>
        ))}
      </div>
    </div>
  );
}
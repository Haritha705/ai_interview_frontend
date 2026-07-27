'use client';

import React from 'react';

interface RadarPoint {
  label: string;
  score: number; // 0 - 100
}

interface RadarChartProps {
  data?: RadarPoint[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data = [
    { label: 'Technical Depth', score: 88 },
    { label: 'Communication', score: 92 },
    { label: 'Confidence', score: 85 },
    { label: 'Architecture', score: 82 },
    { label: 'Problem Solving', score: 90 },
  ],
  size = 280,
}) => {
  const center = size / 2;
  const radius = size * 0.38;
  const totalSides = data.length;

  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (Math.PI * 2 / totalSides) * index - Math.PI / 2;
    const x = center + radius * valueRatio * Math.cos(angle);
    const y = center + radius * valueRatio * Math.sin(angle);
    return { x, y };
  };

  // Build grid web levels (20%, 40%, 60%, 80%, 100%)
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Polygon points for score shape
  const scorePoints = data
    .map((d, idx) => {
      const { x, y } = getCoordinates(idx, d.score / 100);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <linearGradient id="radarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Concentric Grid Web */}
        {levels.map((lvl, lIdx) => {
          const points = data
            .map((_, idx) => {
              const { x, y } = getCoordinates(idx, lvl);
              return `${x},${y}`;
            })
            .join(' ');
          return (
            <polygon
              key={lIdx}
              points={points}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis Lines */}
        {data.map((_, idx) => {
          const { x, y } = getCoordinates(idx, 1);
          return (
            <line
              key={idx}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Filled Score Area */}
        <polygon
          points={scorePoints}
          fill="url(#radarGrad)"
          stroke="#8B5CF6"
          strokeWidth="2"
          className="transition-all duration-700 ease-out"
        />

        {/* Data Vertices & Metric Labels */}
        {data.map((d, idx) => {
          const { x, y } = getCoordinates(idx, d.score / 100);
          const labelCoords = getCoordinates(idx, 1.22);
          return (
            <g key={idx}>
              <circle
                cx={x}
                cy={y}
                r="4"
                fill="#60A5FA"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
              />
              <text
                x={labelCoords.x}
                y={labelCoords.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#E5E7EB"
                fontSize="11"
                fontWeight="600"
                className="font-sans select-none"
              >
                {d.label} ({d.score}%)
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

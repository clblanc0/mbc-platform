import React from 'react';

export interface ChartDataPoint {
  date: string;
  value: number;
}

interface SummaryChartProps {
  data: ChartDataPoint[];
  title: string;
  unit: string;
  color?: string;
}

export const SummaryChart: React.FC<SummaryChartProps> = ({ 
  data, 
  title, 
  unit,
  color = "#3b82f6" // Default blue
}) => {
  if (data.length === 0) return <div className="text-gray-500 text-sm">No data available.</div>;

  // Chart dimensions
  const height = 200;
  const width = 600;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // Calculate Scale
  const values = data.map(d => d.value);
  // Add some padding to min/max so the line isn't hugging the edge
  const minVal = Math.floor(Math.min(...values) * 0.95); 
  const maxVal = Math.ceil(Math.max(...values) * 1.05);
  const range = maxVal - minVal || 1; // avoid divide by zero

  const getX = (index: number) => {
    if (data.length <= 1) return padding + chartWidth / 2;
    return padding + (index / (data.length - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    // Invert Y axis (SVG 0 is top)
    return height - padding - ((val - minVal) / range) * chartHeight;
  };

  // Generate path for the line
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`).join(" ");

  // Generate Y-axis ticks (5 ticks)
  const tickCount = 5;
  const ticks = Array.from({ length: tickCount }, (_, i) => {
    const val = minVal + (range * i) / (tickCount - 1);
    return Math.round(val);
  });

  return (
    <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-slate-600">{title}</h3>
        <span className="text-xs font-medium text-slate-400 uppercase">{unit}</span>
      </div>
      
      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
          {/* Grid Lines & Y-Axis Labels */}
          {ticks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={tick}>
                <line 
                  x1={padding} 
                  y1={y} 
                  x2={width - padding} 
                  y2={y} 
                  stroke="#f1f5f9" 
                  strokeWidth="1" 
                />
                <text 
                  x={padding - 10} 
                  y={y + 4} 
                  textAnchor="end" 
                  fontSize="10" 
                  fill="#94a3b8"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Line */}
          <polyline
            points={points}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points */}
          {data.map((d, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(d.value)}
                r="4"
                fill="white"
                stroke={color}
                strokeWidth="2"
              />
              {/* Only show date for first, middle, last to avoid clutter */}
              {(i === 0 || i === data.length - 1 || i === Math.floor(data.length / 2)) && (
                  <text
                    x={getX(i)}
                    y={height - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fill="#94a3b8"
                  >
                    {new Date(d.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric' })}
                  </text>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

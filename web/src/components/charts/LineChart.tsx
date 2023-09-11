import React, { useEffect, useRef, useState } from 'react';

const DEFAULT_PATH_COLOR: string = "gray"

interface DataPoint {
  x: number;
  y: number;
}

interface LineChartProps {
  data: DataPoint[];
  width?: number | string;
  height?: number;
  xAxisTitle?: string;
  yAxisTitle?: string;
  fillColor?: string;
  opacity?: number;
  tickDistancePercentage?: number;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  width = '100%', 
  height = 350, 
  xAxisTitle = 'X', 
  yAxisTitle = 'Y', 
  fillColor = '#1e55a5',
  opacity = .25,
  tickDistancePercentage = 10
 }) => {

  const childRef = useRef<HTMLDivElement | null>(null);
  const [parentWidth, setParentWidth] = useState<number>(500);
  const [parentHeight, setParentHeight] = useState<number>(500);

  useEffect(() => {
    function handleResize() {
      if (childRef.current && childRef.current.parentElement) {
        setParentWidth(childRef.current.clientWidth);
        setParentHeight(childRef.current.clientHeight);
      }
    }

    window.addEventListener('resize', handleResize);

    // Make sure to clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (data.length === 0) {
    return null;
  }
    
  const numericWidth = typeof width === 'number' ? width : parentWidth; // Default to 500 if width is not a number
  const numericHeight = typeof height === 'number' ? height : parentHeight; // Default to 500 if height is not a number

  // Calculate the number of tickers and their respective positions
  const tickCount = Math.floor(100 / tickDistancePercentage);
  const tickers = Array.from({ length: tickCount }, (_, i) => {
    const percentage = i * tickDistancePercentage;
    const xPos = (percentage / 100) * Number(numericWidth);
    const correspondingDataIndex = Math.floor((percentage / 100) * data.length);
    return { 
      xPos,
      label: data[correspondingDataIndex] ? data[correspondingDataIndex].x : ''
    };
  });

  // Get the minimum and maximum values for scaling
  const xMin = Math.min(...data.map(d => d.x));
  const xMax = Math.max(...data.map(d => d.x));
  const yMin = Math.min(...data.map(d => d.y));
  const yMax = Math.max(...data.map(d => d.y));

  // Chart margins
  const margin = { left: 40, right: 20, top: 20, bottom: 40 };

  // Scale the data points to fit within the SVG dimensions
  const scaleX = (d: DataPoint) => margin.left + ((d.x - xMin) / (xMax - xMin)) * (numericWidth - margin.left - margin.right);
  const scaleY = (d: DataPoint) => (numericHeight - margin.bottom) - ((d.y - yMin) / (yMax - yMin)) * (height - margin.top - margin.bottom);
  
  // Generate the path data for the line and area
  const lineData = data.map(d => `${scaleX(d)},${scaleY(d)}`).join(' L ');
  const areaData = `M${scaleX(data[0])},${numericHeight} L ${lineData} L${scaleX(data[data.length - 1])},${numericHeight} Z`;

  return (
    <div ref={childRef}>
      <svg 
        width={numericWidth - margin.left - margin.right} 
        height={numericHeight + margin.top + margin.bottom}>
        <g>
          <path d={`M${lineData}`} stroke={fillColor && DEFAULT_PATH_COLOR} fill="none" />
          {fillColor && <path d={areaData} fill={fillColor} opacity={opacity} />}
        </g>
        <g transform={`translate(0,${numericHeight})`}>
          <line x1="0" y1="0" x2={numericWidth} y2="0" stroke={DEFAULT_PATH_COLOR} />
          <text x={numericWidth / 2} y="30" textAnchor="middle">{xAxisTitle}</text>
        </g>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <line x1="0" y1="0" x2="0" y2={numericHeight} stroke={DEFAULT_PATH_COLOR} />
          <text x="30" y={numericHeight / 2} textAnchor="middle" transform="rotate(-90,30,100)">{yAxisTitle}</text>
        </g>
        <g transform={`translate(0,${numericHeight})`}>
          {tickers.map((ticker, index) => (
            <g key={index} transform={`translate(${ticker.xPos},0)`}>
              <line x1="0" y1="0" x2="0" y2="5" stroke={DEFAULT_PATH_COLOR} />
              <text x="0" y="16" textAnchor="middle" fontSize="12">{ticker.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default LineChart;

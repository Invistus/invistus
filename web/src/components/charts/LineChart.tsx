import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { formatNumber } from 'utils/stringUtils';
import { 
  DEFAULT_PATH_COLOR, 
  DEFAULT_AREA_COLOR,
  DEFAULT_TICKER_DISTANCE, 
  DEFAULT_TICKER_FONT_SIZE, 
  X_AXIS_TITLE_GAP, 
  Y_AXIS_TITLE_GAP, 
  measureText, 
  LEGEND_GAP
} from 'components/charts/chartUtils';

interface Data {
  x: number;
  y: number[];
}

interface DataPoint {
  x: number;
  y: number;
}

interface ChartMargin {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

type Transformer = (input: number) => string;

interface LineChartProps {
  data: Data[];
  width?: number | string;
  height?: number;
  xAxisTitle?: string;
  yAxisTitle?: string;
  yLabels?: string[];
  colors?: string[];
  opacity?: number;
  tickerFontSize?: number,
  yTransformer?: Transformer,
  xTransformer?: Transformer,
  margin?: ChartMargin
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  width = '100%', 
  height = 350, 
  xAxisTitle = 'X', 
  yAxisTitle = 'Y', 
  yLabels = [],
  colors = [DEFAULT_AREA_COLOR],
  opacity = 1,
  xTransformer = formatNumber,
  yTransformer = formatNumber,
  tickerFontSize = DEFAULT_TICKER_FONT_SIZE,
  margin = { left: 40, right: 20, top: 20, bottom: 40 }
 }) => {

  const childRef = useRef<HTMLDivElement | null>(null);
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

  const sizeChart = useCallback(() => {
    if (childRef.current) {
      setElementSize({
        width: childRef.current.clientWidth,
        height: childRef.current.clientHeight,
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', sizeChart);
    sizeChart();
    return () => {
      window.removeEventListener('resize', sizeChart);
    };
  }, [sizeChart]);
    
  const chartTotalWidth = typeof width === 'number' ? width : elementSize.width;
  const chartTotalHeight = typeof height === 'number' ? height : elementSize.height;

  // Get the minimum and maximum values for scaling
  const { xMin, xMax, yMin, yMax } = useMemo(() => {
    const allYValues = data.flatMap(d => d.y);
    return {
      xMin: Math.min(...data.map(d => d.x)),
      xMax: Math.max(...data.map(d => d.x)),
      yMin: Math.min(...allYValues),
      yMax: Math.max(...allYValues),
    };
}, [data]);
  
  // Actual chart area
  // Add the Y ticker labels to left margin with an extra margin
  const result = yLabels.reduce((acc, current, index) => {
    return current.length > acc.str.length ? { str: current, index } : acc;
  }, { str: '', index: -1 });
  margin.left += (measureText(yTransformer(yMax)) + Y_AXIS_TITLE_GAP); 
  margin.right += (measureText(result.str) + LEGEND_GAP); 
  const chartArealWidth = chartTotalWidth - margin.left - margin.right;
  const chartArealHeight = chartTotalHeight - margin.top - margin.bottom;

  // Scale the data points to fit within the SVG dimensions
  const scaleX = useMemo(() => {
    return (d: DataPoint) => margin.left + ((d.x - xMin) / (xMax - xMin)) * (chartTotalWidth - margin.left - margin.right);
  }, [xMin, xMax, chartTotalWidth, margin]);
  
  const scaleY = useMemo(() => {
    return (d: DataPoint) => (chartTotalHeight - margin.bottom) - ((d.y - yMin) / (yMax - yMin)) * chartArealHeight;
  }, [yMin, yMax, chartTotalHeight, chartArealHeight, margin]);
  
  // Generate the path data for the line and area
  const lineData = useMemo(() => {
    const r: string[] = [];
    const maxYLength = Math.max(...data.map(d => d.y.length));
    for (let col = 0; col < maxYLength; col++) {
      r.push(
        data.map(d => {
            return `${scaleX({ x: d.x, y: d.y[col] })},${scaleY({ x: d.x, y: d.y[col] })}`;
          }).join(' L ')
        );
    };
    return r;
  }, [data, scaleX, scaleY]);

  
  const areaData = useMemo(() => {
    const r: string[] = [];
    const maxYLength = Math.max(...data.map(d => d.y.length));  
    for (let col = 0; col < maxYLength; col++) {
      const columnData = data.map(d => {
        return `${scaleX({ x: d.x, y: d.y[col] })},${scaleY({ x: d.x, y: d.y[col] })}`;
      }).join(' L ');
  
      r.push(
        `M${scaleX({ x: data[0].x, y: data[0].y[col] })},${chartTotalHeight - margin.bottom} L ${columnData} L${scaleX({ x: data[data.length - 1].x, y: data[data.length - 1].y[col] })},${chartTotalHeight - margin.bottom} Z`
      );
    }
  
    return r;
  }, [data, scaleX, scaleY, chartTotalHeight, margin]);
    
  // Create the tickers based on the calculated interval
  const minTickerDistanceX = DEFAULT_TICKER_DISTANCE;
  const minTickerDistanceY = DEFAULT_TICKER_DISTANCE;

  const xTickers = useMemo(() => {
    let previousTickerPosition = 0;
    return data.reduce<{ xPos: number, label: string }[]>((acc, _, i) => {
      const xPos = scaleX({ x: i, y: 0 });
      if (xPos > minTickerDistanceX + previousTickerPosition) {
        acc.push({ xPos, label: xTransformer(i) });
        previousTickerPosition = xPos;
      }
      return acc;
    }, []);
  }, [data, scaleX, xTransformer, minTickerDistanceX]);

  const mergedYSorted = useMemo(() => {
        return data.flatMap(d => d.y).sort((a, b) => a - b);
    }, [data]);


    const yTickers = useMemo(() => {
      const uniqueYValues = [...new Set(mergedYSorted)]; // removing duplicates
      const tickers = [];
    
      let previousYTickerPosition = chartTotalHeight;
      for (let i = 0; i < uniqueYValues.length; i++) {
        const yPos = scaleY({ x: i, y: uniqueYValues[i] }) ?? chartTotalHeight;
        if (yPos < previousYTickerPosition - minTickerDistanceY) {
          tickers.push({ yPos, label: yTransformer(uniqueYValues[i]) });
          previousYTickerPosition = yPos;
        }
      }
      return tickers;
    }, [mergedYSorted, scaleY, yTransformer, chartTotalHeight, minTickerDistanceY]);

  return (
    <div ref={childRef}>
      <svg 
        width={chartTotalWidth} 
        height={chartTotalHeight}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          {yLabels.map((label, index) => (
            <g key={index} transform={`translate(0,${index * 20})`}>
              <rect x={chartArealWidth + 10} y={-10} width={10} height={10} fill={colors[index] ?? DEFAULT_PATH_COLOR} />
              <text x={chartArealWidth + 25} y={0} fontSize={tickerFontSize}>{label}</text>
            </g>
          ))}
        </g>
        <g>
          {lineData.map((line, i) => <path key={i} d={`M${line}`} stroke={colors[i] ?? DEFAULT_PATH_COLOR} fill="none" />)}
          {areaData.map((d, i) => (
            <path key={i} d={d} fill={colors[i] ?? DEFAULT_AREA_COLOR} opacity={opacity} />
          ))}
        </g>
        <g transform={`translate(0,${chartTotalHeight - margin.bottom})`}>
          <line x1={margin.left} y1="0" x2={chartTotalWidth - margin.right} y2="0" stroke={DEFAULT_PATH_COLOR} />
          <text x={chartArealWidth / 2 + margin.left} y={X_AXIS_TITLE_GAP} textAnchor="middle">{xAxisTitle}</text>
        </g>
        <g transform={`translate(${margin.left},0)`}>
          <line x1="0" y1={margin.top} x2="0" y2={chartTotalHeight - margin.bottom} stroke={DEFAULT_PATH_COLOR} />
          <line x1={chartArealWidth} y1={margin.top} x2={chartArealWidth} y2={chartTotalHeight - margin.bottom} stroke={DEFAULT_PATH_COLOR} />
          <text x={-(chartArealHeight/2)} y={25-margin.left} textAnchor="middle" transform="rotate(-90,0,0)">{yAxisTitle}</text>
        </g>
        <g transform={`translate(0,${chartTotalHeight - margin.bottom})`}>
          {xTickers.map((ticker, index) => (
            <g key={index} transform={`translate(${ticker.xPos},0)`}>
              <line x1="0" y1="0" x2="0" y2="5" stroke={DEFAULT_PATH_COLOR} />
              <text x="0" y="18" textAnchor="middle" fontSize={tickerFontSize}>{ticker.label}</text>
            </g>
          ))}
        </g>
        <g transform={`translate(${margin.left},${margin.top})`}>
          {yTickers.map((ticker, index) => (
            <g key={index} transform={`translate(0,${ticker.yPos - margin.top})`}>
              <line x1="-5" y1="0" x2="0" y2="0" stroke={DEFAULT_PATH_COLOR} />
              <text x="-10" y="5" textAnchor="end" fontSize={tickerFontSize}>{ticker.label}</text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default LineChart;
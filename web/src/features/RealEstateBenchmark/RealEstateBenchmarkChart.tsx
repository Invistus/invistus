import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Strategy, StrategyOutput, StrategyPeriod } from './RealEstateBenchmark';
import { formatCurrency } from 'utils/stringUtils';
import useTranslation from 'language/useTranslation';

type Props = {
  strategyData: StrategyOutput;
};


const RealEstateBenchmarkChart: React.FC<Props> = ({ strategyData }) => {
  const { buyStrategy, mortgageStrategy, rentStrategy } = strategyData.strategies;

    const { t } = useTranslation();
   
    const getTotalWealth = (strategy: StrategyPeriod[], index: number) => {
      return strategy[index]?.totalWealth === undefined ? null : strategy[index].totalWealth;
    }

    const data = [];
    const maxLenth = Math.max(buyStrategy.length, mortgageStrategy.length, rentStrategy.length);
    for (let i = 0; i < maxLenth; i++) {
      data.push({
        period: i,
        Buy: getTotalWealth(buyStrategy, i),
        Mortgage: getTotalWealth(mortgageStrategy, i),
        Rent:  getTotalWealth(rentStrategy, i)
      });      
    }

  const getMaxTotalWealth = () => {
    const allTotalWealths = [
      ...buyStrategy.map(item => item.totalWealth),
      ...mortgageStrategy.map(item => item.totalWealth),
      ...rentStrategy.map(item => item.totalWealth)
    ];
    return Math.max(...allTotalWealths);
  };

  const maxLength = getMaxTotalWealth().toString().length;
  const yAxisWidth = maxLength * 8;  // Assuming each character takes approx. 10 pixels

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
  }, []);

  return (
    <div className="real-estate-benchmark-chart" ref={childRef}>
        <LineChart width={elementSize.width} height={elementSize.height} data={data}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="period" />
          <YAxis width={yAxisWidth} tickFormatter={(value) => formatCurrency(value)}/>
          <Tooltip formatter={(value) => formatCurrency(value as number)} />
          <Legend />
          <Line type="monotone" dataKey="Buy" name={t('realEstateBenchmark.buy')} stroke="#2089C9" dot={false}/>
          <Line type="monotone" dataKey="Mortgage" name={t('realEstateBenchmark.mortage')} stroke="#1aa365" dot={false}/>
          <Line type="monotone" dataKey="Rent" name={t('realEstateBenchmark.rent')} stroke="#725FEB" dot={false}/>
        </LineChart>
    </div>
  );
};

export default RealEstateBenchmarkChart;

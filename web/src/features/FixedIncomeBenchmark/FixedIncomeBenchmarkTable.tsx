import React from 'react';
import { formatPercentage } from 'utils/stringUtils';
import useTranslation from 'language/useTranslation';
import { Result } from './FixedIncomeBenchmark';

interface FixedIncomeBenchmarkTableProps {
  data: Result;
}

export const FixedIncomeBenchmarkTable: React.FC<FixedIncomeBenchmarkTableProps> = ({ data }) => {

  const { t } = useTranslation();

  return (
      <div className="container table">
        <div className="row">
            <div className="col-2">{t('fixedIncomeBenchmark.investmentType')}</div>
            <div className="col-2">{t('fixedIncomeBenchmark.investmentCategory')}</div>
            <div className="col-2">{t('fixedIncomeBenchmark.dividendYield')}</div>
            <div className="col-2">{t('fixedIncomeBenchmark.tax_table')}</div>
            <div className="col-2">{t('fixedIncomeBenchmark.tax')}</div>
            <div className="col-2">{t('fixedIncomeBenchmark.netReturn')}</div>
          </div>
          <div className="row">
            <div className="col-2">{data.source.investmentType}</div>
            <div className="col-2">{t(`fixedIncomeBenchmark.${data.source.investmentCategory}`)}</div>
            <div className="col-2 number">{formatPercentage(data.source.grossReturnPercentage)}</div>
            <div className="col-2 center">{data.source.tax_range && t(`fixedIncomeBenchmark.tax_${data.source.tax_range}`)}</div>
            <div className="col-2 number">{data.source.tax_rate && formatPercentage(data.source.tax_rate)}</div>
            <div className="col-2 number">{formatPercentage(data.source.netReturn)}</div>
          </div>
          {data.benchmark.map((benchmark, index) => 
            <div className="row" key={index}>
              <div className="col-2">{benchmark.investmentType}</div>
              <div className="col-2">{t(`fixedIncomeBenchmark.${benchmark.investmentCategory}`)}</div>
              <div className="col-2 number">{formatPercentage(benchmark.grossReturnPercentage)}</div>
              <div className="col-2 center">{benchmark.tax_range ? t(`fixedIncomeBenchmark.tax_${benchmark.tax_range}`) : '-'}</div>
              <div className="col-2 number">{benchmark.tax_rate ? formatPercentage(benchmark.tax_rate) : '-'}</div>
              <div className="col-2 number">{formatPercentage(benchmark.netReturn)}</div>
            </div>                 
          )}   
    </div>
  );
};
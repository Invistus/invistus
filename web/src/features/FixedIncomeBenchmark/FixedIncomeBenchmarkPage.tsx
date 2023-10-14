import React, { useState } from 'react';
import FixedIncomeBenchmarkForm from 'features/FixedIncomeBenchmark/FixedIncomeBenchmarkForm';
import { Result, calculateBenchmark } from 'features/FixedIncomeBenchmark/FixedIncomeBenchmark';
import { formatPercentage } from 'utils/stringUtils';
import { IFixedIncomeBenchmark } from 'features/FixedIncomeBenchmark/FixedIncomeBenchmark';
import Panel from 'components/panels/Panel';
import Page from 'components/pages/Page';
import useTranslation from 'language/useTranslation';
import { FixedIncomeTutorial } from '../Tutorials/FixedIncomeTutorial';
import TutorialPanel from 'features/Tutorials/TutorialPanel';


export const FixedIncomeBenchmarkPage: React.FC = () => {

  const { t } = useTranslation();
  const [result, setResult] = useState<Result>();

  const handleFormSubmit = async (data: IFixedIncomeBenchmark) => {
    const r = await calculateBenchmark(data);
    setResult(r);
  };

  return (
    <Page>
      <Panel  title={t('fixedIncomeBenchmark.label')} 
              subTitle={t('fixedIncomeBenchmark.description')} 
              image="/images/assets/fixed_income_benchmark.png">
        <FixedIncomeBenchmarkForm onSubmit={handleFormSubmit} />
      </Panel>
      {result && 
        <>
          <Panel>
            <h3>{t('fixedIncomeBenchmark.resultLabel').replace('[durationDays]', result.source.durationDays.toString())}</h3>
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
                  <div className="col-2">{result.source.investmentType}</div>
                  <div className="col-2">{t(`fixedIncomeBenchmark.${result.source.investmentCategory}`)}</div>
                  <div className="col-2 number">{formatPercentage(result.source.grossReturnPercentage)}</div>
                  <div className="col-2 center">{result.source.tax_range && t(`fixedIncomeBenchmark.tax_${result.source.tax_range}`)}</div>
                  <div className="col-2 number">{result.source.tax_rate && formatPercentage(result.source.tax_rate)}</div>
                  <div className="col-2 number">{formatPercentage(result.source.netReturn)}</div>
                </div>
                {result.benchmark.map((benchmark, index) => 
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
        </Panel>
        <div className="more_about">{t('common.more_about')}</div>
        <TutorialPanel tutorial={<FixedIncomeTutorial />} />
      </>
      }
    </Page>
  );
};
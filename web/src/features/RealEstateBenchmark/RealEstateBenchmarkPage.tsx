import React, { useState } from 'react';
import RealEstateBenchmarkForm from './RealEstateBenchmarkForm';
import { RealEstateStrategyInput, StrategyOutput, realEstateStrategy } from './RealEstateBenchmark';
import useTranslation from 'language/useTranslation';
import Page from 'components/pages/Page';
import Panel from 'components/panels/Panel';
import RealEstateBenchmarkResult from './RealEstateBenchmarkResult';
import './RealEstateBenchmark.css';
import { useFocus } from 'utils/focus';

export const RealEstateBenchmarkPage: React.FC = () => {
  const { t } = useTranslation();
  const [decision, setDecision] = useState<StrategyOutput | null>(null);
  const [ref, setFocus] = useFocus<HTMLDivElement>();

  const handleFormSubmit = (data: RealEstateStrategyInput) => {
    const result = realEstateStrategy(data);
    setDecision(result);
    setFocus();
  };

  return (
    <Page>
      <Panel  title={t('realEstateBenchmark.label')} 
              subTitle={t('realEstateBenchmark.description')} 
              image="/images/assets/real_estate_benchmark.png">
        <RealEstateBenchmarkForm onSubmit={handleFormSubmit} />
      </Panel>
      {decision && <RealEstateBenchmarkResult {...decision} ref={ref}/>}
    </Page>
  );
};

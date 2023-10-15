import React, { useState, forwardRef } from 'react';
import FixedIncomeBenchmarkForm from 'features/FixedIncomeBenchmark/FixedIncomeBenchmarkForm';
import { Result, calculateBenchmark } from 'features/FixedIncomeBenchmark/FixedIncomeBenchmark';
import { IFixedIncomeBenchmark } from 'features/FixedIncomeBenchmark/FixedIncomeBenchmark';
import Panel from 'components/panels/Panel';
import Page from 'components/pages/Page';
import useTranslation from 'language/useTranslation';
import { FixedIncomeTutorial } from '../Tutorials/FixedIncomeTutorial';
import TutorialPanel from 'features/Tutorials/TutorialPanel';
import { FixedIncomeBenchmarkTable } from './FixedIncomeBenchmarkTable';
import { useFocus } from 'utils/focus';


export const FixedIncomeBenchmarkPage: React.FC = () => {

  const { t } = useTranslation();
  const [result, setResult] = useState<Result | null>();
  const [ref, setFocus] = useFocus<HTMLDivElement>();

  const handleFormSubmit = async (data: IFixedIncomeBenchmark) => {
    const newResult = await calculateBenchmark(data);
    setResult(newResult);
    setFocus();
  };

  return (
    <Page>
      <FixedIncomeBenchmarkFormPanel onSubmit={handleFormSubmit}/>
      {result && <FixedIncomeBenchmarkResultPanel result={result} ref={ref} />}
    </Page>
  );
};

const FixedIncomeBenchmarkFormPanel: React.FC<{ onSubmit: (data: IFixedIncomeBenchmark) => void }> = ({ onSubmit }) => {
  const { t } = useTranslation();

  return (
    <Panel 
      title={t('fixedIncomeBenchmark.label')}
      subTitle={t('fixedIncomeBenchmark.description')}
      image="/images/assets/fixed_income_benchmark.png">
      <FixedIncomeBenchmarkForm onSubmit={onSubmit} />
    </Panel>
  );
};

const FixedIncomeBenchmarkResultPanel = forwardRef<HTMLDivElement, { result: Result}>(({ result }, ref) => {
  const { t } = useTranslation();
  return (
    <>
      <Panel ref={ref}>
        <h3> 
          {t('fixedIncomeBenchmark.resultLabel').replace('[durationDays]', result.source.durationDays?.toString() || '')}
        </h3>
        <FixedIncomeBenchmarkTable data={result} />
      </Panel>
      <div className="more_about">{t('common.more_about')}</div>
      <TutorialPanel tutorial={<FixedIncomeTutorial />} />
    </>
  );
});
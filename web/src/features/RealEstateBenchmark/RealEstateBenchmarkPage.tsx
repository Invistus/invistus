import React, { useState } from 'react';
import RealEstateBenchmarkForm from './RealEstateBenchmarkForm';
import { RealEstateStrategyInput, StrategyOutput, realEstateStrategy } from './RealEstateBenchmark';
import useTranslation from 'language/useTranslation';
import Page from 'components/pages/Page';
import Panel from 'components/panels/Panel';
import { formatErrorMessage } from 'utils/stringUtils';
import ErrorMessages from 'components/forms/errors/ErrorMessages';
import { FieldErrors } from 'react-hook-form';
import { RealEstateBenchmarkResult } from './RealEstateBenchmarkResult';
import './RealEstateBenchmark.css';

export const RealEstateBenchmarkPage: React.FC = () => {
  const { t } = useTranslation();
  const [decision, setDecision] = useState<StrategyOutput | null>(null);
  const [errors, setErrors] = useState<FieldErrors>();

  const handleFormSubmit = async (data: RealEstateStrategyInput) => {
    try {
      setErrors({});
      const result = await realEstateStrategy(data);
      setDecision(result);
    } catch(e: any) {
      const fieldErros: FieldErrors = {};
      fieldErros.mortgageRate = {
        type: "manual",
        message: formatErrorMessage(t(`realEstateBenchmark.errors.${e.message}`), e.cause)
      };   
      setErrors(fieldErros);
    }
  };

  return (
    <Page>
      <Panel title={t('realEstateBenchmark.label')} image="/images/assets/real_estate_benchmark.png">
        {errors && <ErrorMessages errors={errors} />}
        <RealEstateBenchmarkForm onSubmit={handleFormSubmit} />
      </Panel>
      {decision && <RealEstateBenchmarkResult {...decision} />}
    </Page>
  );
};

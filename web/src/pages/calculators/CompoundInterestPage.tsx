import { useState } from 'react';
import Page from 'pages/Page';
import Panel from 'pages/Panel';
import { CalculationResult, calculateCompoundInterest } from 'services/interestCalculator';
import CompoundInterestForm, { CompoundInterestFormData } from 'components/calculators/CompoundInterestForm';
import useTranslation from 'language/useTranslation';
import { formatCurrency } from 'components/utils/stringUtils';
import LineChart from 'components/charts/LineChart';


const CompoundInterestPage = () => {

  const [result, setResult] = useState<CalculationResult>();
  const { t } = useTranslation();

  const handleCalculation = (data: CompoundInterestFormData) => {
    const compoundInterest = calculateCompoundInterest({
      principal: data.principal,
      contribution: data.contribution,
      rate: data.rate,
      calculationPeriod: data.calculationPeriod,
      contributionPeriod: data.contributionPeriod,
      ratePeriod: data.ratePeriod,
      periodRange: data.periodRange,
    });   
    setResult(compoundInterest);
  };

  return (
    <Page title="Juros Compostos">
        <Panel title={t('compoundInterest.title')}>
          <CompoundInterestForm onCalculate={handleCalculation}/>
        </Panel>
        {result && (
            <div>
              <Panel>
                  <h3>Resultado:</h3>
                  <p>O montante será: {formatCurrency(result.totalAmount)}</p>
              </Panel>
              <Panel>
                <h3>Chart</h3>
                  <LineChart 
                    data={result.periodAmount.map((value, index) => ({ x: index, y: value }))}
                    xAxisTitle="Meses"
                    yAxisTitle="Valor"
                  />
              </Panel>
            </div>
          )}
    </Page>
  );
}

export default CompoundInterestPage;

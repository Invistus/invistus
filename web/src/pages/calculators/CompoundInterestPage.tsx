import { useState } from 'react';
import Page from 'pages/Page';
import Panel from 'pages/Panel';
import { CalculationResult, calculateCompoundInterest } from 'services/interestCalculator';
import CompoundInterestForm, { CompoundInterestFormData } from 'components/calculators/CompoundInterestForm';
import useTranslation from 'language/useTranslation';
import { formatCurrency, formatNumber } from 'components/utils/stringUtils';
import LineChart from 'components/charts/LineChart';
import 'pages/calculators/CompoundInterestPage.css';


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
    <Page>
        <Panel title={t('compoundInterest.title')}>
          <CompoundInterestForm onCalculate={handleCalculation}/>
        </Panel>
        {result && (
            <>
              <Panel>
                  <h3>Resultado</h3>
                  <div className="result-compound-interest-panel">
                    <div className="total-amount">
                      <p className="label">Valor total final</p>
                      <p className="value">{formatCurrency(result.totalAmount)}</p>
                    </div>
                    <div className="principal">
                      <p className="label">Valor total investido</p>
                      <p className="value">{formatCurrency(result.totalAmount - result.interestAmount)}</p>
                    </div>
                    <div className="interest">
                      <p className="label">Total em juros</p>
                      <p className="value">{formatCurrency(result.interestAmount)}</p>
                    </div>
                  </div>
              </Panel>
              <Panel>
                <h3>Gráfico</h3>
                  <LineChart 
                    data={result.periodAmount.map((value, index) => ({ x: index, y: [value.amount + value.interest, value.amount] }))}
                    xAxisTitle="Meses"
                    yAxisTitle="Valor"
                    xTransformer={(i) => formatNumber(i, 0)}
                    yTransformer={formatCurrency}
                    yLabels={["Juros", "Aportes"]}
                    colors={['#1FBF78', '#2089C9']}
                  />
              </Panel>
            </>
          )}
    </Page>
  );
}

export default CompoundInterestPage;

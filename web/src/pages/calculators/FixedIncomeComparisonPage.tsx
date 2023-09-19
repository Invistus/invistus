import React from 'react';
import Page from 'pages/Page';
import Panel from 'pages/Panel';
import FixedIncomeComparisonForm from 'components/calculators/FixedIncomeComparisonForm';
import calculateNetReturn, { IFixedIncomeComparison } from 'services/fixedIncomeComparison';
import { formatCurrency } from 'components/utils/stringUtils';


const FixedIncomeComparisonPage: React.FC = () => {
  const handleFormSubmit = async (data: IFixedIncomeComparison) => {
    const results = await calculateNetReturn(data);
    console.log(results);
  };

  return (
    <Page>
      <Panel title="CDB x LCA/LCI">
        <FixedIncomeComparisonForm onSubmit={handleFormSubmit} />
      </Panel>
      <Panel>
        <h3>Resgate no final do período de 120 dias</h3>
        <div className="result-fixed-income-comparison-panel">
          <div className="total-amount">
            <p className="label">CDB</p>
            <p className="label">0 à 120 dias</p>
            <p className="label">Faixa IR: 22,5%</p>
            <p className="value">{formatCurrency(100.0)}</p>
          </div>
          <div className="principal">
            <p className="label">LCA/LCI</p>
            <p className="label">Isenção IR</p>
            <p className="value">{formatCurrency(100.0)}</p>
          </div>
        </div>        
      </Panel>
    </Page>
  );
};

export default FixedIncomeComparisonPage;

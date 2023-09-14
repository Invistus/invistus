import React from 'react';
import Page from 'pages/Page';
import Panel from 'pages/Panel';
import InvestmentComparisonForm from 'components/calculators/FixedIncomeComparisonForm';


const FixedIncomeComparisonPage: React.FC = () => {
  const handleFormSubmit = async (formData: any) => {
    // const results = await calculateNetReturn(formData);
    // TODO Process results and display them in a suitable format (you might want to set state and render results in JSX below)
  };

  return (
    <Page>
      <Panel title="CDB x LCA/LCI">
        <InvestmentComparisonForm onSubmit={handleFormSubmit} />
        {/* Render results here in a suitable format */}
      </Panel>
    </Page>
  );
};

export default FixedIncomeComparisonPage;

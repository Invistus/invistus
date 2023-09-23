import React, { useState } from 'react';
import FixedIncomeBenchmarckForm from 'features/FixedIncomeBenchmarck/FixedIncomeBenchmarckForm';
import { Result, calculateBenchmark } from 'features/FixedIncomeBenchmarck/fixedIncomeBenchmarck';
import { formatPercentage } from 'utils/stringUtils';
import { IFixedIncomeBenchmarck } from 'features/FixedIncomeBenchmarck/IFixedIncomeBenchmarck';
import Panel from 'components/panels/Panel';
import Page from 'components/pages/Page';


export const FixedIncomeBenchmarckPage: React.FC = () => {
  const [result, setResult] = useState<Result>();

  const handleFormSubmit = async (data: IFixedIncomeBenchmarck) => {
    setResult(await calculateBenchmark(data));
    console.log(result);
  };

  return (
    <Page>
      <Panel title="CDB x LCA/LCI">
        <FixedIncomeBenchmarckForm onSubmit={handleFormSubmit} />
      </Panel>
      {result && 
        <Panel>
          <h3>Benchmark período de {result.source.durationDays} dias</h3>
          <div className="container table">
            <div className="row">
                <div className="col">Tipo</div>
                <div className="col">Categoria</div>
                <div className="col">D.Y.</div>
                <div className="col">Tabela IR</div>
                <div className="col">IR</div>
                <div className="col">Retorno</div>
              </div>
              <div className="row">
                <div className="col">{result.source.investmentType}</div>
                <div className="col">{result.source.investmentCategory}</div>
                <div className="col number">{formatPercentage(result.source.grossReturnPercentage)}</div>
                <div className="col center">{result.source.tax_range && result.source.tax_range}</div>
                <div className="col number">{result.source.tax_rate && formatPercentage(result.source.tax_rate)}</div>
                <div className="col number">{formatPercentage(result.source.totalReturn)}</div>
              </div>
              {result.benchmark.map((benchmark) => 
                <div className="row">
                  <div className="col">{benchmark.investmentType}</div>
                  <div className="col">{benchmark.investmentCategory}</div>
                  <div className="col number">{formatPercentage(benchmark.grossReturnPercentage)}</div>
                  <div className="col center">{benchmark.tax_range ? benchmark.tax_range : '-'}</div>
                  <div className="col number">{benchmark.tax_rate ? formatPercentage(benchmark.tax_rate) : '-'}</div>
                  <div className="col number">{formatPercentage(benchmark.totalReturn)}</div>
                </div>                 
              )}   
        </div>
      </Panel>      
      }
    </Page>
  );
};
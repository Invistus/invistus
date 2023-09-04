import React, { useState } from 'react';
import CurrencyInput from 'components/form/CurrencyInput';
import PercentageInput from 'components/form/PercentageInput';
import NumberInput from 'components/form/NumberInput';
import { useForm, Resolver } from 'react-hook-form';

import './CompoundInterestForm.css';
import 'components/form/form.css';

type CompoundInterestValues = {
    principal: number;
    contribution: number;
    rate: number;
    calculationPeriod: number;
  };
  
  const resolver: Resolver<CompoundInterestValues> = async (values) => {
    const errors = {};

    if (!values.principal && !values.contribution) {
      errors.principal = {
        type: "manual",
        message: "Either Principal or Contribution must be filled."
      };
      errors.contribution = {
        type: "manual",
        message: "Either Principal or Contribution must be filled."
      };
    }
  
    return {
      values: errors ? {} : values,
      errors: errors,
    };
  };

const CompoundInterestForm = () => {

    const [principal, setPrincipal] = useState(0);
    const [rate, setRate] = useState(0);
    const [ratePeriod, setRatePeriod] = useState<'year' | 'month'>('year');
    const [months, setMonths] = useState(1);
    const [calculationPeriod, setCalculationPeriod] = useState<'year' | 'month'>('year');
    const [contribution, setContribution] = useState(0);
    const [contributionPeriod, setContributionPeriod] = useState<'year' | 'month'>('year');
    const [result, setResult] = useState<number | null>(null);

    const calculateInterest = (event: React.SyntheticEvent) => {
        event.preventDefault();

        let r = rate / 100; // Convert percentage to a decimal
        let t = months;
        let PMT = contribution;
    
        if (ratePeriod === 'year') {
            r = Math.pow((1 + r), 1/12) - 1;
        }
    
        if (calculationPeriod === 'year') {
            t = t * 12;
        }
    
        if (contributionPeriod === 'year') {
            PMT = PMT / 12;
        }
    
        const compoundInterest = Array.from({ length: t }, (v, i) => i).reduce((previous) => (previous * (1 + r)) + PMT, principal)
        
        setResult(compoundInterest);
    };

    const { register, handleSubmit, errors } = useForm<CompoundInterestValues>({
        resolver: resolver
    });
    


    return (
        <div className="CompoundInterestForm">
            <form onSubmit={handleSubmit(calculateInterest)}>
                <div className="form-group row">
                    <div className="col-6">
                        <label>Valor inicial</label>
                            </div>
                    <div className="col-6">
                        <CurrencyInput 
                            {...register("principal")}  
                            onValueChange={setPrincipal} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6">
                        <label>Aportes periódicos</label>
                    </div>
                    <div className="col-6">
                        <div className="input-group">
                            <CurrencyInput
                                {...register("contribution")}
                                onValueChange={setContribution} />
                            <select value={contributionPeriod} onChange={e => setContributionPeriod(e.target.value as 'year' | 'month')}>
                                <option value="year">Anual</option>
                                <option value="month">Mensal</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6">
                        <label>Taxa de juros</label>
                    </div>
                    <div className="col-6">
                        <div className="input-group">
                            <PercentageInput 
                                {...register("rate")}
                                onValueChange={setRate} />
                            <select value={ratePeriod} onChange={e => setRatePeriod(e.target.value as 'year' | 'month')}>
                                <option value="year">Anual</option>
                                <option value="month">Mensal</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6">
                        <label>Período</label>
                    </div>
                    <div className="col-6">
                        <div className="input-group">
                            <NumberInput 
                                {...register("calculationPeriod")}
                                onValueChange={setMonths} />
                            <select value={calculationPeriod} onChange={e => setCalculationPeriod(e.target.value as 'year' | 'month')}>
                                <option value="year">Anos</option>
                                <option value="month">Meses</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group form-group-btn">
                    <button type="submit" className="btn-primary box-shadow">Calcular</button>
                </div>
                {result !== null && (
                    <div>
                        <h3>Resultado:</h3>
                        <p>O montante será: {result.toFixed(2)}</p>
                    </div>
                )}
            </form>
        </div>
    );
}

export default CompoundInterestForm;

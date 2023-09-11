import React, { useState } from 'react';
import CurrencyInput from 'components/form/CurrencyInput';
import PercentageInput from 'components/form/PercentageInput';
import NumberInput from 'components/form/NumberInput';
import { useForm, Resolver, FieldValues, FieldErrors, Controller, SubmitHandler } from 'react-hook-form';
import { parseCurrency, parsePercentage } from 'components/utils/stringUtils';
import useTranslation from 'language/useTranslation';
import { isNotEmpty } from 'components/utils/objectUtils';


interface CompoundInterestFormProps {
    onCalculate: (data: CompoundInterestFormData) => void;
  }

interface CompoundInterestInputValues extends FieldValues {
    principal: string;
    contribution: string;
    rate: string;
    period: string,
    calculationPeriod: string;
    ratePeriod: 'year' | 'month';
    periodRange: 'year' | 'month';
  };
  
export interface CompoundInterestFormData extends FieldValues {
    principal: number;
    contribution: number;
    rate: number;
    calculationPeriod: number;
    ratePeriod: 'year' | 'month';
    periodRange: 'year' | 'month';
  };


const CompoundInterestForm: React.FC<CompoundInterestFormProps> = ({ onCalculate }) => {

    const { t } = useTranslation();

    const calculateInterest: SubmitHandler<CompoundInterestFormData> = async(data) => onCalculate(data);

    const resolver: Resolver<CompoundInterestInputValues, CompoundInterestFormData> = async (formData) => {

        const errors: FieldErrors<CompoundInterestInputValues> = {};
        const values: CompoundInterestFormData = {
            ...formData,
            principal: parseCurrency(formData.principal)  ?? 0.0,
            contribution: parseCurrency(formData.contribution)  ?? 0.0,
            rate: parsePercentage(formData.rate) ?? 0.0,
            calculationPeriod: parseInt(formData.calculationPeriod) ?? 0.0,
        };
        
        const { principal, contribution, rate } = values;

        if (principal === 0.0 && contribution === 0.0) {
          errors.principal = {
            type: "manual",
            message: t('errors.eitherPrincipalOrContribution')
          };
        }
    
        if (rate <= 0) {
            errors.rate = {
                type: "manual",
                message: t('errors.rateGreaterThanZero')
              };    
        }   
      
        return {
          values: isNotEmpty(errors) ? {} : values,
          errors: errors,
        };
      };

    const { control, register, handleSubmit, formState: { errors } } = useForm<CompoundInterestInputValues, any, CompoundInterestFormData>({
        resolver: resolver
    });
    
    return (
        <div className="CompoundInterestForm">
            {errors.principal && <div className="errorValidation alert alert-warning">{errors.principal.message}</div>}
            <form onSubmit={handleSubmit(calculateInterest)}>
                <div className="form-group row">
                    <div className="col-6">
                        <label>Valor inicial</label>
                    </div>
                    <div className="col-6">
                        <Controller
                            name="principal"
                            control={control}
                            render={({ field }) => (
                                <CurrencyInput value={field.value} onChange={field.onChange} />
                            )}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-6">
                        <label>Aportes periódicos</label>
                    </div>
                    <div className="col-6">
                        <div className="input-group">
                            <Controller
                                name="contribution"
                                control={control}
                                render={({ field }) => (
                                    <CurrencyInput value={field.value} onChange={field.onChange} />
                                )}
                            />
                            <select {...register("contributionPeriod")} className="input-side-button">
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
                            <Controller
                                name="rate"
                                control={control}
                                render={({ field }) => (
                                    <PercentageInput value={field.value} onChange={field.onChange} />
                                )}
                            />                           
                            <select {...register("ratePeriod")} className="input-side-button">
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
                            <Controller
                                name="calculationPeriod"
                                control={control}
                                render={({ field }) => (
                                    <NumberInput value={field.value} onChange={field.onChange} />
                                )}
                            />     
                            <select {...register("periodRange")} className="input-side-button" >
                                <option value="year">Anos</option>
                                <option value="month">Meses</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group form-group-btn">
                    <button type="submit" className="btn-primary box-shadow">Calcular</button>
                </div>
            </form>
        </div>
    );
}

export default CompoundInterestForm;

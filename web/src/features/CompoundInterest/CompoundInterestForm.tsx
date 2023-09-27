import React from 'react';
import { useForm, Resolver, FieldErrors, SubmitHandler } from 'react-hook-form';
import { parseCurrency, parsePercentage } from 'utils/stringUtils';
import useTranslation from 'language/useTranslation';
import { isNotEmpty } from 'utils/objectUtils';
import { CompoundInterestFormProps, CompoundInterestFormData, CompoundInterestInputValues, defaultCompoundInterestInputValues } from './ICompoundInterest';
import ButtonGroup from 'components/forms/groups/ButtonGroup';
import Submit from 'components/forms/inputs/Submit';
import CurrencyField from 'components/forms/fields/CurrencyField';
import CurrencyPeriodField from 'components/forms/fields/CurrencyPeriodField';
import PercentagePeriodField from 'components/forms/fields/PercentagePeriodField';
import NumberPeriodField from 'components/forms/fields/NumberPeriodField';
import Form from 'components/forms/Form';


export const CompoundInterestForm: React.FC<CompoundInterestFormProps> = ({ onCalculate }) => {

    const { t } = useTranslation();

    const calculateInterest: SubmitHandler<CompoundInterestFormData> = async(data) => onCalculate(data);

    const resolver: Resolver<CompoundInterestInputValues, CompoundInterestFormData> = async (formData) => {

        const errors: FieldErrors<CompoundInterestInputValues> = {};
        const values: CompoundInterestFormData = {
            principal: parseCurrency(formData.principal)  ?? 0.0,
            contribution: {
                value: parseCurrency(formData.contribution.value)  ?? 0.0,
                period: formData.contribution.period
            },
            rate: {
                value: parsePercentage(formData.rate.value) ?? 0.0,
                period: formData.contribution.period
            },
            period: {
                value: parseInt(formData.period.value) ?? 0.0,
                period: formData.period.period
            }    
        };
        
        const { principal, contribution, rate, period } = values;

        if (principal === 0.0 && contribution.value === 0.0) {
          errors.principal = {
            type: "manual",
            message: t('compoundInterest.errors.eitherPrincipalOrContribution')
          };
        }
    
        if (rate.value <= 0) {
            errors.rate = {
                type: "manual",
                message: t('common.errors.rateGreaterThanZero')
              };    
        }   

        if (period.value <= 0) {
            errors.rate = {
                type: "manual",
                message: t('compoundInterest.errors.calculationPeriodGreaterThanZero')
              };    
        }   
      
        return {
          values: isNotEmpty(errors) ? {} : values,
          errors: errors,
        };
      };

    const { control, handleSubmit, formState: { errors } } = useForm<CompoundInterestInputValues, any, CompoundInterestFormData>({
        defaultValues: defaultCompoundInterestInputValues,
        resolver: resolver
    });
    
    return (
        <Form onSubmit={handleSubmit(calculateInterest)} errors={errors}>

            <CurrencyField 
                label={t('compoundInterest.principal')}
                name="principal"
                control={control}
                />

            <CurrencyPeriodField 
                label={t('compoundInterest.contribution')}
                name="contribution"
                control={control}
                />

            <PercentagePeriodField 
                label={t('compoundInterest.rate')}
                name="rate"
                control={control}
                />

            <NumberPeriodField 
                label={t('compoundInterest.period')}
                name="period"
                control={control}
                />
                
            <ButtonGroup>
                <Submit label={t('compoundInterest.submit')} />
            </ButtonGroup>

        </Form>
    );
}
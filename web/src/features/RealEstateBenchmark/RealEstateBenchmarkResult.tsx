import Panel from "components/panels/Panel";
import React from "react";
import { formatCurrency } from "utils/stringUtils";
import RealEstateBenchmarkChart from "./RealEstateBenchmarkChart";
import useTranslation from "language/useTranslation";
import { StrategyPeriod, StrategyOutput } from "./RealEstateBenchmark";

const getTotalWealth = (strategyValues: StrategyPeriod[]): number => {
    return strategyValues[strategyValues.length - 1].totalWealth;
  }

  const getInvestmentAmount = (strategyValues: StrategyPeriod[]): number | undefined => {
    return strategyValues[strategyValues.length - 1].investmentAmount;
  }

  const getHomeAmount = (strategyValues: StrategyPeriod[]): number | undefined => {
    return strategyValues[strategyValues.length - 1].homeAmount;
  }

  const getMortgageAmount = (strategyValues: StrategyPeriod[]): number | undefined => {
    return strategyValues[strategyValues.length - 1].mortgageAmount;
  }

  const getRentAmount = (strategyValues: StrategyPeriod[]): number | undefined => {
    return strategyValues[strategyValues.length - 1].rentAmount;
  }

export const RealEstateBenchmarkResult: React.FC<StrategyOutput> = (strategy: StrategyOutput) => {

    const { t } = useTranslation();

    return (
        <div>
            <Panel title={`${t('realEstateBenchmark.bestStrategy')} ${t(`realEstateBenchmark.${strategy.bestStrategy.toLocaleLowerCase()}`)}`}>
                <div className="real-estate-benchmark-panel">
                    <div className="buy-strategy">
                      <p className="label buy strategy">{t(`realEstateBenchmark.buy`)}</p>
                      {getTotalWealth(strategy.strategies.buyStrategy) > 0 ? 
                        <>
                          <p className="label">{t(`realEstateBenchmark.assets`)}</p>
                          <p className="value break-words">{formatCurrency(getTotalWealth(strategy.strategies.buyStrategy) || 0)}</p>
                          <p className="label symbol">=</p>
                          <p className="label">{t(`realEstateBenchmark.homePrice`)}</p>
                          <p className="value break-words">{formatCurrency(getHomeAmount(strategy.strategies.buyStrategy) || 0)}</p>
                          <p className="label symbol">+</p>
                          <p className="label">{t(`realEstateBenchmark.investment`)}</p>
                          <p className="value break-words">{formatCurrency(getInvestmentAmount(strategy.strategies.buyStrategy) || 0)}</p>                       
                        </>:
                        <p>{t(`realEstateBenchmark.errors.noFundsToBuy`)}</p>
                      }
                    </div>
                    <div className="mortage-strategy">
                      <p className="label mortage strategy">{t(`realEstateBenchmark.mortage`)}</p>
                      {getTotalWealth(strategy.strategies.mortgageStrategy) > 0 ?
                        <>
                            <p className="label">{t(`realEstateBenchmark.assets`)}</p>
                            <p className="value break-words"> {formatCurrency(getTotalWealth(strategy.strategies.mortgageStrategy) || 0)}</p>
                            <p className="label symbol">=</p>
                            <p className="label">{t(`realEstateBenchmark.homePrice`)}</p>
                            <p className="value break-words">{formatCurrency(getHomeAmount(strategy.strategies.mortgageStrategy) || 0)}</p>
                            <p className="label symbol">+</p>
                            <p className="label">{t(`realEstateBenchmark.investment`)}</p>
                            <p className="value break-words">{formatCurrency(getInvestmentAmount(strategy.strategies.mortgageStrategy) || 0)}</p>
                            <p className="label symbol">-</p>
                            <p className="label">{t(`realEstateBenchmark.mortage`)}</p>
                            <p className="value break-words">{formatCurrency(getMortgageAmount(strategy.strategies.mortgageStrategy) || 0)}</p>
                        </>:
                        <p>{t(`realEstateBenchmark.errors.noFundsToMortage`)}</p>
                      }
                    </div>
                    <div className="rent-strategy">
                      <p className="label rent strategy">{t(`realEstateBenchmark.rent`)}</p>
                      <p className="label">{t(`realEstateBenchmark.assets`)}</p>
                      <p className="value break-words">{formatCurrency(getTotalWealth(strategy.strategies.rentStrategy))}</p>
                      <p className="label symbol">=</p>
                      <p className="label">{t(`realEstateBenchmark.investment`)}</p>
                      <p className="value break-words">{formatCurrency(getInvestmentAmount(strategy.strategies.rentStrategy) || 0)}</p>
                      <p className="label symbol">-</p>
                      <p className="label">{t(`realEstateBenchmark.rent`)}</p>
                      <p className="value break-words">{formatCurrency(getRentAmount(strategy.strategies.rentStrategy) || 0)}</p>
                    </div>
                  </div>
            </Panel>
            <Panel title={t('realEstateBenchmark.assetsProgression')}>
                <RealEstateBenchmarkChart strategyData={strategy} />
            </Panel>
          </div>
    )
}
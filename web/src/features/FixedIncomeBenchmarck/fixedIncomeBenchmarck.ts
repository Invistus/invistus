import { InvestmentType, InvestmentCategory, IFixedIncomeBenchmarck } from "./IFixedIncomeBenchmarck";

export type SourceResult = {
  investmentType: InvestmentType;
  investmentCategory: InvestmentCategory;
  grossReturnPercentage: number;
  durationDays: number;
  tax_range?: string;
  tax_rate?: number;
  totalReturn: number;
};

export type BenchmarkResult = {
  investmentType: InvestmentType;
  investmentCategory: InvestmentCategory;
  investmentCategoryIndexPostFixed?: number;
  investmentCategoryIndexIPCA?: number;
  grossReturnPercentage: number;
  durationDays: number;
  tax_range?: string;
  tax_rate?: number;
  totalReturn: number;
};

export type Result = {
  source: SourceResult;
  benchmark: BenchmarkResult[];
};

export function calculateBenchmark(data: IFixedIncomeBenchmarck): Result {
  const calculateTaxRate = (days: number): [string, number] => {
    if (days <= 180) return ['0_180_days', 0.225];
    if (days <= 360) return ['181_360_days', 0.20];
    if (days <= 720) return ['361_720_days', 0.175];
    return ['above_720_days', 0.15];
  };

  const calculateTotalReturn = (type: InvestmentType, category: InvestmentCategory, grossReturn: number): number => {
    if (type === 'CDB') {
      const tax = calculateTaxRate(data.durationDays)[1];
      return grossReturn * (1 - tax);
    }
    return grossReturn;
  };

  const calculateGrossReturnForSameNetReturn = (type: InvestmentType, category: InvestmentCategory, netReturn: number): number => {
    if (type === 'CDB') {
      const tax = calculateTaxRate(data.durationDays)[1];
      netReturn = netReturn / (1 - tax);
    }
  
    switch (category) {
      case 'pre-fixed':
        return netReturn;
      case 'inflation-linked':
        return netReturn - data.investmentCategoryIndexIPCA;
      case 'post-fixed':
        if (data.investmentCategoryIndexPostFixed !== 0) {
          return netReturn / data.investmentCategoryIndexPostFixed;
        }
        return 0; // Handle division by zero
    }
  };
  

  // Calculate source total return
  let sourceGrossReturn = 0;
  switch (data.investmentCategory) {
    case 'pre-fixed':
      sourceGrossReturn = data.grossReturnPercentage;
      break;
    case 'inflation-linked':
      sourceGrossReturn = data.investmentCategoryIndexIPCA + data.grossReturnPercentage;
      break;
    case 'post-fixed':
      sourceGrossReturn = data.investmentCategoryIndexPostFixed * data.grossReturnPercentage;
      break;
  }

  const sourceTotalReturn = calculateTotalReturn(data.investmentType, data.investmentCategory, sourceGrossReturn);

  const [taxRange, taxRate] = calculateTaxRate(data.durationDays);

  const sourceResult: SourceResult = {
    investmentType: data.investmentType,
    investmentCategory: data.investmentCategory,
    grossReturnPercentage: data.grossReturnPercentage,
    durationDays: data.durationDays,
    totalReturn: sourceTotalReturn
  };

  if (data.investmentType === 'CDB') {
    sourceResult.tax_range = taxRange;
    sourceResult.tax_rate = taxRate;
  }

  const allTypes: InvestmentType[] = ['CDB', 'LCA/LCI'];
  const allCategories: InvestmentCategory[] = ['pre-fixed', 'inflation-linked', 'post-fixed'];

  // Calculate benchmark
  const benchmarks: BenchmarkResult[] = [];

  for (const type of allTypes) {
    for (const category of allCategories) {
      if (type === data.investmentType && category === data.investmentCategory) continue; // Skip the source combination

      const benchmarkGrossReturn = calculateGrossReturnForSameNetReturn(type, category, sourceTotalReturn);

      const benchmark: BenchmarkResult = {
        investmentType: type,
        investmentCategory: category,
        grossReturnPercentage: benchmarkGrossReturn,
        durationDays: data.durationDays,
        totalReturn: sourceTotalReturn
      };

      if (category === 'post-fixed') {
        benchmark.investmentCategoryIndexPostFixed = data.investmentCategoryIndexPostFixed;
      }

      if (category === 'inflation-linked') {
        benchmark.investmentCategoryIndexIPCA = data.investmentCategoryIndexIPCA;
      }

      if (type === 'CDB') {
        benchmark.tax_range = taxRange;
        benchmark.tax_rate = taxRate;
      }

      benchmarks.push(benchmark);
    }
  }

  return {
    source: sourceResult,
    benchmark: benchmarks
  };
}

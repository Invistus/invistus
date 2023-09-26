export type InvestmentType = 'CDB' | 'LCA/LCI';
export type InvestmentCategory = 'pre_fixed' | 'inflation_linked' | 'post_fixed';

export interface IFixedIncomeBenchmark {
  investmentType: InvestmentType,
  investmentCategory: InvestmentCategory,
  investmentCategoryIndexPostFixed: number,
  investmentCategoryIndexIPCA: number,
  grossReturnPercentage: number,
  durationDays: number,
  dueDate?: Date
};

export type SourceResult = {
  investmentType: InvestmentType;
  investmentCategory: InvestmentCategory;
  grossReturnPercentage: number;
  durationDays: number;
  tax_range?: string;
  tax_rate?: number;
  netReturn: number;
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
  netReturn: number;
};

export type Result = {
  source: SourceResult;
  benchmark: BenchmarkResult[];
};

const calculateTaxRate = (days: number): [string, number] => {
  if (days <= 180) return ['0_180_days', 0.225];
  if (days <= 360) return ['181_360_days', 0.20];
  if (days <= 720) return ['361_720_days', 0.175];
  return ['above_720_days', 0.15];
};

const calculateNetReturn = (type: InvestmentType, category: InvestmentCategory, grossReturn: number, durationDays: number): number => {
  if (type === 'CDB') {
    const tax = calculateTaxRate(durationDays)[1];
    return grossReturn * (1 - tax);
  }
  return grossReturn;
};

const calculateGrossReturnForSameNetReturn = (type: InvestmentType, category: InvestmentCategory, netReturn: number, data: IFixedIncomeBenchmark): number => {
  if (type === 'CDB') {
    const tax = calculateTaxRate(data.durationDays)[1];
    netReturn = netReturn / (1 - tax);
  }

  switch (category) {
    case 'pre_fixed':
      return netReturn;
    case 'inflation_linked':
      return netReturn - data.investmentCategoryIndexIPCA;
    case 'post_fixed':
      if (data.investmentCategoryIndexPostFixed !== 0) {
        return netReturn / data.investmentCategoryIndexPostFixed;
      }
      return 0; // Handle division by zero
  }
};

const calculateSourceGrossReturn = (data: IFixedIncomeBenchmark): number => {
  switch (data.investmentCategory) {
    case 'pre_fixed':
      return data.grossReturnPercentage;
    case 'inflation_linked':
      return data.investmentCategoryIndexIPCA + data.grossReturnPercentage;
    case 'post_fixed':
      return data.investmentCategoryIndexPostFixed * data.grossReturnPercentage;
  }
}

export function calculateBenchmark(data: IFixedIncomeBenchmark): Result {
  // Calculate source total return
  const sourceGrossReturn = calculateSourceGrossReturn(data);
  const sourceNetReturn = calculateNetReturn(data.investmentType, data.investmentCategory, sourceGrossReturn, data.durationDays);
  const [taxRange, taxRate] = calculateTaxRate(data.durationDays);

  const sourceResult: SourceResult = {
    investmentType: data.investmentType,
    investmentCategory: data.investmentCategory,
    grossReturnPercentage: data.grossReturnPercentage,
    durationDays: data.durationDays,
    netReturn: sourceNetReturn
  };

  if (data.investmentType === 'CDB') {
    sourceResult.tax_range = taxRange;
    sourceResult.tax_rate = taxRate;
  }

  const allTypes: InvestmentType[] = ['CDB', 'LCA/LCI'];
  const allCategories: InvestmentCategory[] = ['pre_fixed', 'inflation_linked', 'post_fixed'];

  // Calculate benchmark
  const benchmarks: BenchmarkResult[] = allTypes.flatMap(type => 
    allCategories.filter(category => !(type === data.investmentType && category === data.investmentCategory))
    .map(category => {
      const benchmarkGrossReturn = calculateGrossReturnForSameNetReturn(type, category, sourceNetReturn, data);

      const benchmark: BenchmarkResult = {
        investmentType: type,
        investmentCategory: category,
        grossReturnPercentage: benchmarkGrossReturn,
        durationDays: data.durationDays,
        netReturn: sourceNetReturn
      };

      if (category === 'post_fixed') {
        benchmark.investmentCategoryIndexPostFixed = data.investmentCategoryIndexPostFixed;
      }

      if (category === 'inflation_linked') {
        benchmark.investmentCategoryIndexIPCA = data.investmentCategoryIndexIPCA;
      }

      if (type === 'CDB') {
        benchmark.tax_range = taxRange;
        benchmark.tax_rate = taxRate;
      }

      return benchmark;
    })
  );

  return {
    source: sourceResult,
    benchmark: benchmarks
  };
}

import { calculateBenchmark, IFixedIncomeBenchmark, Result } from './FixedIncomeBenchmark';  // Adjust path accordingly
import { formatPercentage } from '../../utils/stringUtils';

describe('FixedIncomeBenchmark', () => {

    describe('calculateBenchmark', () => {

        const baseData = {
            investmentCategoryIndexPostFixed: .1275,
            investmentCategoryIndexIPCA: .06,
        };

        it('should calculate source and benchmarks correctly for CDB with pre_fixed category', () => {
            const sampleData: IFixedIncomeBenchmark = {
                investmentType: 'CDB',
                investmentCategory: 'pre_fixed',
                grossReturnPercentage: .0927,
                durationDays: 731,
                ...baseData
            };

            const result: Result = calculateBenchmark(sampleData);

            const expectedSourceResult = {
                "source": {
                    "investmentType": "CDB",
                    "investmentCategory": "pre_fixed",
                    "grossReturnPercentage": 0.0927,
                    "durationDays": 731,
                    "netReturn": 0.0788,
                    "tax_range": "above_720_days",
                    "tax_rate": 0.15
                },
                "benchmark": [
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": 0.0327,
                        "durationDays": 731,
                        "netReturn": 0.0788,
                        "investmentCategoryIndexIPCA": 0.06,
                        "tax_range": "above_720_days",
                        "tax_rate": 0.15
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 0.7271,
                        "durationDays": 731,
                        "netReturn": 0.0788,
                        "investmentCategoryIndexPostFixed": 0.1275,
                        "tax_range": "above_720_days",
                        "tax_rate": 0.15
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.0788,
                        "durationDays": 731,
                        "netReturn": 0.0788
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": 0.0188,
                        "durationDays": 731,
                        "netReturn": 0.0788,
                        "investmentCategoryIndexIPCA": 0.06
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 0.618,
                        "durationDays": 731,
                        "netReturn": 0.0788,
                        "investmentCategoryIndexPostFixed": 0.1275
                    }
                ]
            };

            expect(result).toEqual(expectedSourceResult);
        });

        it('should calculate source and benchmarks correctly for CDB with inflation_linked category', () => {
            const sampleData: IFixedIncomeBenchmark = {
                investmentType: 'CDB',
                investmentCategory: 'inflation_linked',
                grossReturnPercentage: .0927,
                durationDays: 280,
                ...baseData
            };

            const result: Result = calculateBenchmark(sampleData);
            
            const expectedSourceResult = {
                "source": {
                    "investmentType": "CDB",
                    "investmentCategory": "inflation_linked",
                    "grossReturnPercentage": 0.0927,
                    "durationDays": 280,
                    "netReturn": 0.1222,
                    "tax_range": "181_360_days",
                    "tax_rate": 0.2
                },
                "benchmark": [
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.1527,
                        "durationDays": 280,
                        "netReturn": 0.1222,
                        "tax_range": "181_360_days",
                        "tax_rate": 0.2
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 1.1976,
                        "durationDays": 280,
                        "netReturn": 0.1222,
                        "investmentCategoryIndexPostFixed": 0.1275,
                        "tax_range": "181_360_days",
                        "tax_rate": 0.2
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.1222,
                        "durationDays": 280,
                        "netReturn": 0.1222
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": 0.0622,
                        "durationDays": 280,
                        "netReturn": 0.1222,
                        "investmentCategoryIndexIPCA": 0.06
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 0.9581,
                        "durationDays": 280,
                        "netReturn": 0.1222,
                        "investmentCategoryIndexPostFixed": 0.1275
                    }
                ]
            };

            expect(result).toEqual(expectedSourceResult);
        });

        it('should calculate source and benchmarks correctly for CDB with post_fixed category', () => {
            const sampleData: IFixedIncomeBenchmark = {
                investmentType: 'CDB',
                investmentCategory: 'post_fixed',
                grossReturnPercentage: .0927,
                durationDays: 120,
                ...baseData
            };

            const result: Result = calculateBenchmark(sampleData);
            
            const expectedSourceResult = {
                "source": {
                    "investmentType": "CDB",
                    "investmentCategory": "post_fixed",
                    "grossReturnPercentage": 0.0927,
                    "durationDays": 120,
                    "netReturn": 0.0092,
                    "tax_range": "0_180_days",
                    "tax_rate": 0.225
                },
                "benchmark": [
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.0118,
                        "durationDays": 120,
                        "netReturn": 0.0092,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": -0.0482,
                        "durationDays": 120,
                        "netReturn": 0.0092,
                        "investmentCategoryIndexIPCA": 0.06,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.0092,
                        "durationDays": 120,
                        "netReturn": 0.0092
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": -0.0508,
                        "durationDays": 120,
                        "netReturn": 0.0092,
                        "investmentCategoryIndexIPCA": 0.06
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 0.0718,
                        "durationDays": 120,
                        "netReturn": 0.0092,
                        "investmentCategoryIndexPostFixed": 0.1275
                    }
                ]
            };

            expect(result).toEqual(expectedSourceResult);

        });

        it('should calculate source and benchmarks correctly for LCA/LCI with pre_fixed category', () => {
            const sampleData: IFixedIncomeBenchmark = {
                investmentType: 'LCA/LCI',
                investmentCategory: 'pre_fixed',
                grossReturnPercentage: .0927,
                durationDays: 60,
                ...baseData
            };

            const result: Result = calculateBenchmark(sampleData);
            
            const expectedSourceResult = {
                "source": {
                    "investmentType": "LCA/LCI",
                    "investmentCategory": "pre_fixed",
                    "grossReturnPercentage": 0.0927,
                    "durationDays": 60,
                    "netReturn": 0.0927
                },
                "benchmark": [
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.1196,
                        "durationDays": 60,
                        "netReturn": 0.0927,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": 0.0596,
                        "durationDays": 60,
                        "netReturn": 0.0927,
                        "investmentCategoryIndexIPCA": 0.06,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 0.9381,
                        "durationDays": 60,
                        "netReturn": 0.0927,
                        "investmentCategoryIndexPostFixed": 0.1275,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": 0.0327,
                        "durationDays": 60,
                        "netReturn": 0.0927,
                        "investmentCategoryIndexIPCA": 0.06
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 0.7271,
                        "durationDays": 60,
                        "netReturn": 0.0927,
                        "investmentCategoryIndexPostFixed": 0.1275
                    }
                ]
            };

            expect(result).toEqual(expectedSourceResult);

        });

        it('should calculate source and benchmarks correctly for LCA/LCI with inflation_linked category', () => {
            const sampleData: IFixedIncomeBenchmark = {
                investmentType: 'LCA/LCI',
                investmentCategory: 'inflation_linked',
                grossReturnPercentage: .0927,
                durationDays: 60,
                ...baseData
            };

            const result: Result = calculateBenchmark(sampleData);
            
            const expectedSourceResult = {
                "source": {
                    "investmentType": "LCA/LCI",
                    "investmentCategory": "inflation_linked",
                    "grossReturnPercentage": 0.0927,
                    "durationDays": 60,
                    "netReturn": 0.1527
                },
                "benchmark": [
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.197,
                        "durationDays": 60,
                        "netReturn": 0.1527,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": 0.137,
                        "durationDays": 60,
                        "netReturn": 0.1527,
                        "investmentCategoryIndexIPCA": 0.06,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 1.5454,
                        "durationDays": 60,
                        "netReturn": 0.1527,
                        "investmentCategoryIndexPostFixed": 0.1275,
                        "tax_range": "0_180_days",
                        "tax_rate": 0.225
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.1527,
                        "durationDays": 60,
                        "netReturn": 0.1527
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 1.1976,
                        "durationDays": 60,
                        "netReturn": 0.1527,
                        "investmentCategoryIndexPostFixed": 0.1275
                    }
                ]
            };

            expect(result).toEqual(expectedSourceResult);

        });

        it('should calculate source and benchmarks correctly for LCA/LCI with post_fixed category', () => {
            const sampleData: IFixedIncomeBenchmark = {
                investmentType: 'LCA/LCI',
                investmentCategory: 'post_fixed',
                grossReturnPercentage: .0927,
                durationDays: 500,
                ...baseData
            };
            const result: Result = calculateBenchmark(sampleData);
            
            const expectedSourceResult = {
                "source": {
                    "investmentType": "LCA/LCI",
                    "investmentCategory": "post_fixed",
                    "grossReturnPercentage": 0.0927,
                    "durationDays": 500,
                    "netReturn": 0.0118
                },
                "benchmark": [
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.0143,
                        "durationDays": 500,
                        "netReturn": 0.0118,
                        "tax_range": "361_720_days",
                        "tax_rate": 0.175
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": -0.0457,
                        "durationDays": 500,
                        "netReturn": 0.0118,
                        "investmentCategoryIndexIPCA": 0.06,
                        "tax_range": "361_720_days",
                        "tax_rate": 0.175
                    },
                    {
                        "investmentType": "CDB",
                        "investmentCategory": "post_fixed",
                        "grossReturnPercentage": 0.1124,
                        "durationDays": 500,
                        "netReturn": 0.0118,
                        "investmentCategoryIndexPostFixed": 0.1275,
                        "tax_range": "361_720_days",
                        "tax_rate": 0.175
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "pre_fixed",
                        "grossReturnPercentage": 0.0118,
                        "durationDays": 500,
                        "netReturn": 0.0118
                    },
                    {
                        "investmentType": "LCA/LCI",
                        "investmentCategory": "inflation_linked",
                        "grossReturnPercentage": -0.0482,
                        "durationDays": 500,
                        "netReturn": 0.0118,
                        "investmentCategoryIndexIPCA": 0.06
                    }
                ]
            };

            expect(result).toEqual(expectedSourceResult);

        });

        const errorBaseData: IFixedIncomeBenchmark = {
            investmentType: 'LCA/LCI',
            investmentCategory: 'post_fixed',
            investmentCategoryIndexPostFixed: .1275,
            investmentCategoryIndexIPCA: .06,
            grossReturnPercentage: .0927,
            durationDays: 500,
        };

        it('should throw an error for negative grossReturnPercentage', () => {
            const sampleData: IFixedIncomeBenchmark = {
                ...errorBaseData,
                grossReturnPercentage: -.0927,
            };

            expect(() => calculateBenchmark(sampleData)).toThrowErrorMatchingSnapshot();
        });

        it('should throw an error for negative durationDays', () => {
            const testData: IFixedIncomeBenchmark = {
                ...errorBaseData,
                durationDays: -180,
            };

            expect(() => calculateBenchmark(testData)).toThrowErrorMatchingSnapshot();
        });

        it('should throw an error for negative investmentCategoryIndexPostFixed', () => {
            const testData: IFixedIncomeBenchmark = {
                ...errorBaseData,
                investmentCategoryIndexPostFixed: -1.2,
            };

            expect(() => calculateBenchmark(testData)).toThrowErrorMatchingSnapshot(); 
        });

        it('should throw an error for negative investmentCategoryIndexIPCA', () => {
            const testData: IFixedIncomeBenchmark = {
                ...errorBaseData,
                investmentCategoryIndexIPCA: -4.5,
            };

            expect(() => calculateBenchmark(testData)).toThrowErrorMatchingSnapshot();
        });

    });

});


module.exports = {
    roots: ["<rootDir>/src"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js$": "babel-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
      "^components/(.*)": "<rootDir>/src/components/$1",
      "^services/(.*)": "<rootDir>/src/services/$1",
      "^utils/(.*)": "<rootDir>/src/utils/$1",
    }
  };
  
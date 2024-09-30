
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',  // Transpile JS and JSX files
  },
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'], 
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}",
    "!src/index.js", 
    "!src/reportWebVitals.js", 
    "!src/setupTests.js"
  ],
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy' // Mock CSS imports
  }
};

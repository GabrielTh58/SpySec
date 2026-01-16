module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/**/index.ts"
    ],
    roots: ['<rootDir>/core/src', '<rootDir>/core/test'],   
}

export default {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/domain/(.*)$": "<rootDir>/src/domain/$1",
        "^@/infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
        "^@/presentation/(.*)$": "<rootDir>/src/presentation/$1",
        "^@/tests/(.*)$": "<rootDir>/tests/$1",
    },
};

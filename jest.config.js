const config = {
    testRegex: "((\\.|/*.)(spec))\\.js$",
    watchPathIgnorePatterns: ['<rootDir>/.*/__test__/\w+\\.json'],
    clearMocks: true,
    roots: ['<rootDir>/src/'],
}

module.exports = config;
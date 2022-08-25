// const { timeout } = require('./setup')

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-expo',
  rootDir: '../../',
  setupFilesAfterEnv: ['./test/jest/setup.js'], // Setup life-cycle for jest tests.
  testTimeout: 2 /*min*/ * 60 /*sec*/ * 1000 /*ms*/, // long timeout since docker is slow
  automock: false, // it means it will not run the __mocks__ folder by default (so we have to manually mock it in each test or in the setup.js file)
  clearMocks: true, // https://marek-rozmus.medium.com/jest-mock-and-spy-mockclear-vs-mockreset-vs-mockrestore-f52395581950
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: ['<rootDir>/.fttemplates/*'],
  moduleNameMapper: {
    // scape out non-supported NodeJS files
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/jest/assetsTransformer.js',
    '\\.(css|scss|less)$': '<rootDir>/test/jest/assetsTransformer.js',
    '^asap$': '<rootDir>/test/jest/asap.js',
    '^asap/raw$': '<rootDir>/test/jest/asap.js',
  },
  transformIgnorePatterns: [
    // transpiling non-transpiled packages
    'node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@nordinvestments/nord-storybook/.*|moti)',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    // Don't include the following
    '!.*.{js,jsx,ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
    '!**/.fttemplates/**',
    '!**/babel.config.{js,ts}',
    '!**/jest.config.{js,ts}',
    '!**/jest.setup.{js,ts}',
    '!**/prettier.config.{js,ts}',
  ],
}

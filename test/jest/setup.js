require('@testing-library/jest-native/extend-expect')
require('~/test/jest/extend-expect')
require('react-native-reanimated/lib/reanimated2/jestUtils').setUpTests()

global.__DEV__ = false

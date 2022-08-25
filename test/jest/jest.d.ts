// inspired from https://github.com/testing-library/jest-native/blob/main/extend-expect.d.ts
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable unused-imports/no-unused-vars */
import { ReactTestInstance } from 'react-test-renderer'

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveZeroOpacity(): R
    }
  }
}

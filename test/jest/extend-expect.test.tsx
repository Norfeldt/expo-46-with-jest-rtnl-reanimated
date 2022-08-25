import { render } from '@testing-library/react-native'
import * as React from 'react'
import { View, Text } from 'react-native'

describe('extended `expect` methods', () => {
  describe('.toHaveZeroOpacity', () => {
    it('should pass when element is has zero opacity', () => {
      const utils = render(<View style={{ opacity: 0 }} testID="TestId__VIEW" />)
      expect(utils.getByTestId('TestId__VIEW')).toHaveZeroOpacity()
    })

    it('should NOT pass when element is has non-zero opacity', () => {
      const utils = render(<View style={{ opacity: 0.001 }} testID="TestId__VIEW" />)
      expect(utils.getByTestId('TestId__VIEW')).not.toHaveZeroOpacity()
    })

    it('should pass when some parent element is has zero opacity', () => {
      const utils = render(
        <View style={{ opacity: 0 }}>
          <View>
            <Text>invisible</Text>
          </View>
        </View>
      )
      expect(utils.getByText(/invisible/i)).toHaveZeroOpacity()
    })

    it('should pass when NO parent elements has zero opacity', () => {
      const utils = render(
        <View>
          <View>
            <Text>invisible</Text>
          </View>
        </View>
      )
      expect(utils.getByText(/invisible/i)).not.toHaveZeroOpacity()
    })
  })
})

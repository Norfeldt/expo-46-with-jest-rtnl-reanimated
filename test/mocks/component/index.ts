import { jest } from '@jest/globals'
import * as React from 'react'
import * as ReactNative from 'react-native'

// https://learn.reactnativeschool.com/courses/781007/lectures/14173979
export function mockComponent(moduleName: string, propOverrideFn = (_props: Record<string, any>) => ({})) {
  const RealComponent = jest.requireActual(moduleName) as React.ComponentType<keyof typeof ReactNative>
  const CustomizedComponent = (props: Record<string, any>) => {
    return React.createElement(
      'CustomizedComponent',
      {
        ...props,
        ...propOverrideFn(props),
      },
      props.children
    )
  }
  CustomizedComponent.propTypes = RealComponent.propTypes

  return CustomizedComponent
}

/*
Example usage:
jest.mock('react-native/Libraries/Components/Touchable/TouchableOpacity', () => {
  return mockComponent('react-native/Libraries/Components/Touchable/TouchableOpacity', (props) => {
    return {
      onPress: props.disabled ? () => {} : props.onPress
    }
  })
})
*/

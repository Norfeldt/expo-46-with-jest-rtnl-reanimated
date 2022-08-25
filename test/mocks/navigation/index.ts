import { ParamListBase } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type MockStackNavigationProp<
  ParamList extends ParamListBase = any,
  RouteName extends keyof ParamList = string
> = Record<keyof NativeStackNavigationProp<ParamList, RouteName>, ReturnType<typeof jest.fn>>

export const useNavigationMock: Partial<MockStackNavigationProp> = {
  navigate: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  goBack: jest.fn(),
}

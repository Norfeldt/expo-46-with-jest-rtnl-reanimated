import { render } from '@testing-library/react-native'
import App from './App'

describe(App, () => {
  it('shows welcome message', () => {
    const utils = render(<App />)

    expect(utils.queryByText('Open up App.tsx to start working on your app!')).not.toBeNull()
  })
})

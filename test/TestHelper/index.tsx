import * as ReactNativeTestingLibrary from '@testing-library/react-native'
import flatMapDeep from 'lodash/flatMapDeep'
import * as React from 'react'
import { QueryClient, QueryClientConfig, QueryClientProvider } from 'react-query'
import type { ReactTestInstance } from 'react-test-renderer'

import { userCredentials } from '../mocks/user/userSeedsHelpers'

import * as api from '~/api'
import { CredentialsContextProvider } from '~/context/credentials'
import { CurrentPortfolioContextProvider, useCurrentPortfolioContext } from '~/context/currentPortfolio'
import { timeout } from '~/test/jest/setup'

export function createTestReactQueryClient(
  config: QueryClientConfig = {
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }
) {
  return new QueryClient(config)
}

export function renderWithProviders(ui: React.ReactElement) {
  const testQueryClient = createTestReactQueryClient()

  const AppProviders = ({ ui }: { ui: React.ReactElement }) => (
    <QueryClientProvider client={testQueryClient}>
      <CredentialsContextProvider>
        <CurrentPortfolioContextProvider>{ui}</CurrentPortfolioContextProvider>
      </CredentialsContextProvider>
    </QueryClientProvider>
  )

  const { rerender, ...result } = ReactNativeTestingLibrary.render(<AppProviders ui={ui} />)
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) => rerender(<AppProviders ui={rerenderUi} />),
  }
}

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

export async function getSession(email: keyof typeof userCredentials, sleepTime?: number) {
  await api.signOut() // allows avoiding to clean-up session after each test
  let sigInResponse = await api.signIn(userCredentials[email])
  while (sigInResponse.email !== email) {
    await sleep(sleepTime ?? 400)
    await api.signOut()
    sigInResponse = await api.signIn(userCredentials[email])
  }

  return sigInResponse
}

export async function renderWithUser(Element: JSX.Element, email: keyof typeof userCredentials) {
  await api.signOut() // allows avoiding to clean-up session after each test
  const user = await getSession(email)
  const utils = renderWithProviders(Element)

  return { utils, user }
}

export async function renderWithPortfolio(
  Element: JSX.Element,
  portfolioAppState: Portfolio['appState'],
  email: keyof typeof userCredentials,
  awaitPortfolioTitle: boolean = true
) {
  await api.signOut() // allows avoiding to clean-up session after each test
  const user = await getSession(email)
  const portfolios = await api.fetchPortfolios({ full: true, filterState: 'ready_to_onboard' })
  const portfolio = portfolios.find((portfolio) => portfolio.appState === portfolioAppState)

  if (!portfolio) throw new Error(`No portfolio found with appState: ${portfolioAppState}`)

  function Wrapper() {
    const { setCurrentPortfolioId } = useCurrentPortfolioContext()
    React.useEffect(() => {
      if (portfolio) setCurrentPortfolioId(portfolio.id)
    }, [setCurrentPortfolioId])

    return React.cloneElement(Element, {})
  }
  const utils = renderWithProviders(<Wrapper />)
  if (awaitPortfolioTitle) await utils.findAllByText(portfolio.title)

  return { utils, portfolio, user }
}

// Exporting '@testing-library/react-native' allowing to use TestHelper.render, TestHelper.fireEvent etc.
export * from '@testing-library/react-native'

export function waitFor(
  ...args: Parameters<typeof ReactNativeTestingLibrary.waitFor>
): ReturnType<typeof ReactNativeTestingLibrary.waitFor> {
  return ReactNativeTestingLibrary.waitFor(args[0], { timeout, ...args[1] })
}

export function waitForElementToBeRemoved(
  ...args: Parameters<typeof ReactNativeTestingLibrary.waitForElementToBeRemoved>
): ReturnType<typeof ReactNativeTestingLibrary.waitForElementToBeRemoved> {
  return ReactNativeTestingLibrary.waitForElementToBeRemoved(args[0], {
    timeout,
    ...args[1],
  })
}

export const getMergedStyle = (Component: ReactTestInstance) => {
  const { style } = Component.props
  if (Array.isArray(style))
    return flatMapDeep(style).reduce(
      (acc: any, styleProperty) => ({ ...acc, ...styleProperty }),
      {} as Record<string, any>
    )

  return style
}

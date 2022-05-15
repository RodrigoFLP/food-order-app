import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { Provider } from 'react-redux'
import { store } from '../store/store'

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  )
}

export default MyApp

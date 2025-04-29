'use client'

import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { optimism } from '@reown/appkit/networks'
import { type ReactNode, memo } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const projectId = process.env['NEXT_PUBLIC_PROJECT_ID']
if (!projectId) {
  throw new Error('NEXT_PUBLIC_PROJECT_ID is not set')
}

const ethersAdapter = new EthersAdapter()

createAppKit({
  adapters: [ethersAdapter],
  projectId,
  networks: [optimism],
  defaultNetwork: optimism,
  metadata: {
    name: 'Kult',
    description: 'Store the books, movies and artworks you loved!',
    url: 'https://kult-app.netlify.app',
    icons: ['./favicon.ico'],
  },
  enableEIP6963: true,
  enableCoinbase: true,
})

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: '#000000',
        color: 'white',
      },
    },
  },
})

const ContextProvider = memo(function ContextProvider({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
})

export default ContextProvider

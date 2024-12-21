"use client"

import { config } from "@/config/wagmi"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ConnectKitProvider } from "connectkit"
import type * as React from "react"
import { WagmiProvider } from "wagmi"

import { getQueryClient } from "@/lib/get-query-client"

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          {children}
          <ReactQueryDevtools />
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

import { env } from "@/env"
import { getDefaultConfig } from "connectkit"
import { http, createConfig } from "wagmi"
import { mainnet } from "wagmi/chains"

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`
      )
    },

    // Required API Keys
    walletConnectProjectId: env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "Donatrue",

    // Optional App Info
    appDescription: "Donatrue is decentralized donation system",
    appUrl: "https://donatrue.lichtlabs.org", // your app's url
    appIcon: "https://i.ibb.co.com/0jtM4Lj/donatrue.png" // your app's icon, no bigger than 1024x1024px (max. 1MB)
  })
)

"use client"

import { env } from "@/env"
import { getDefaultConfig } from "connectkit"
import { del, get, set } from "idb-keyval"
import { http, createConfig, createStorage } from "wagmi"
import { sepolia } from "wagmi/chains"

export const config = createConfig(
  getDefaultConfig({
    storage: createStorage({
      storage: {
        async getItem(name) {
          return get(name)
        },
        async setItem(name, value) {
          await set(name, value)
        },
        async removeItem(name) {
          await del(name)
        }
      }
    }),
    // Your dApps chains
    chains: [sepolia],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${env.NEXT_PUBLIC_ALCHEMY_ID}`
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

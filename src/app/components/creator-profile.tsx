"use client"

import { useParams } from "next/navigation"
import { formatEther } from "viem"

import { DonationHistory } from "@/app/components/donation-history"

import { useCreator } from "@/lib/hooks/use-creator"
import { useWallet } from "@/lib/hooks/use-wallet"

export function CreatorProfile() {
  const params = useParams()
  const { address, isConnected } = useWallet()
  const {
    balance,
    pendingAmount,
    bio,
    avatar,
    name,
    isLoading: isCreatorLoading
  } = useCreator()

  const isOwner = isConnected && address === params.address

  if (isCreatorLoading) {
    return <div>Loading creator profile...</div>
  }

  return (
    <div className="space-y-6">
      {/* Creator Info */}
      <div className="rounded-lg border p-6">
        <div className="flex items-center space-x-4">
          {avatar && (
            <img
              src={avatar}
              alt="Creator avatar"
              className="h-16 w-16 rounded-full"
            />
          )}
          <div>
            <h2 className="text-2xl font-bold">{name || "Unnamed Creator"}</h2>
            <p className="text-sm text-gray-500">{params.address}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">{bio}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <p className="text-lg font-medium">{formatEther(balance)} ETH</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-lg font-medium">
              {formatEther(pendingAmount)} ETH
            </p>
          </div>
        </div>
      </div>

      {/* Donations List */}
      <div className="rounded-lg border p-6">
        <DonationHistory
          creatorAddress={params.address as `0x${string}`}
          isOwner={isOwner}
        />
      </div>
    </div>
  )
}

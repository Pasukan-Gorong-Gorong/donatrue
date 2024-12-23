"use client"

import { useParams } from "next/navigation"
import { formatEther } from "viem"

import { useCreator } from "@/lib/hooks/use-creator"
import { useDonations } from "@/lib/hooks/use-donations"
import { useWallet } from "@/lib/hooks/use-wallet"

export function CreatorProfile() {
  const params = useParams()
  const { address, isConnected } = useWallet()
  const {
    balance,
    pendingAmount,
    donationsCount,
    bio,
    avatar,
    isLoading: isCreatorLoading,
    // donate,
    acceptDonation,
    burnDonation,
    // updateBio,
    // updateAvatar,
    isLoading: isCreatorPending
  } = useCreator(params.address as `0x${string}`)

  const {
    donations,
    fetchNextPage,
    hasNextPage,
    isFetching: isDonationsFetching
    // isLoading: isDonationsLoading
  } = useDonations(params.address as `0x${string}`)

  const isOwner = isConnected && address === params.address

  // const handleDonate = async (message: string, amount: bigint) => {
  //   if (!isConnected) return
  //   await donate(message, amount)
  // }

  const handleAcceptDonation = async (donationId: bigint) => {
    if (!isOwner) return
    await acceptDonation(donationId)
  }

  const handleBurnDonation = async (donationId: bigint) => {
    if (!isOwner) return
    await burnDonation(donationId)
  }

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
            <h2 className="text-2xl font-bold">Creator Profile</h2>
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
        <h3 className="text-xl font-semibold">
          Recent Donations ({donationsCount})
        </h3>

        <div className="mt-4 space-y-4">
          {donations.map((donation, index) => (
            <div key={index} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  From: {donation.donator}
                </p>
                <p className="font-medium">
                  {formatEther(donation.amount)} ETH
                </p>
              </div>

              <p className="mt-2">{donation.message}</p>

              {isOwner && !donation.isAccepted && !donation.isBurned && (
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleAcceptDonation(BigInt(index))}
                    className="rounded bg-green-500 px-4 py-2 text-white"
                    disabled={isCreatorPending}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleBurnDonation(BigInt(index))}
                    className="rounded bg-red-500 px-4 py-2 text-white"
                    disabled={isCreatorPending}
                  >
                    Burn
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            className="mt-4 w-full rounded bg-blue-500 py-2 text-white"
            disabled={isDonationsFetching}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  )
}

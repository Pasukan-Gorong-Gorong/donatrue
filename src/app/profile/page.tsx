"use client"

import { CREATOR_FACTORY_ADDRESS } from "@/config/consts"
import { CREATOR_FACTORY_CONTRACT_ABI } from "@/config/consts"
import Image from "next/image"
import Link from "next/link"
import { formatEther } from "viem"
import { useReadContract } from "wagmi"

import { useCreator } from "@/lib/hooks/use-creator"
import { useDonations } from "@/lib/hooks/use-donations"
import { useWallet } from "@/lib/hooks/use-wallet"

export default function Profile() {
  const { address: currentUserAddress } = useWallet()
  const { data: creatorContractAddress } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "getCreatorContract",
    args: [currentUserAddress!],
    query: {
      retry: 100,
      retryDelay: 2000,
      enabled: !!currentUserAddress
    }
  })

  const {
    donations,
    // fetchNextPage,
    // hasNextPage,
    isFetching: isDonationsFetching
  } = useDonations(creatorContractAddress!)

  const { name, links, avatar, bio } = useCreator(creatorContractAddress!)

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-2xl font-semibold mb-6">
          Your Profile
        </h1>

        <div className=" flex flex-col items-center justify-center text-center mb-10">
          <Image
            src={avatar ?? "https://via.placeholder.com/150"}
            alt="Sena Gacor"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-black">{name}</p>
          <p className="text-sm text-black">{bio}</p>
          {links && (
            <p className="text-sm text-purple-600 mt-2">
              <a
                href={links?.[0]?.[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-purple-600"
              >
                {links?.[0]?.[1]}
              </a>
            </p>
          )}
          <div className="hover:bg-slate-100 mt-4 flex items-center justify-center max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-black">
            <Link href="/profile/edit-profile">Edit Profile</Link>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search Donator Name..."
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none text-black"
          />
        </div>

        <div>
          <h3 className="text-black text-xl font-bold mb-4">
            Donation History
          </h3>
          <div className="overflow-x-auto">
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

                  {!donation.isAccepted && !donation.isBurned && (
                    <div className="mt-4 flex space-x-2">
                      <button
                        // onClick={() => handleAcceptDonation(BigInt(index))}
                        className="rounded bg-green-500 px-4 py-2 text-white"
                        disabled={isDonationsFetching}
                      >
                        Accept
                      </button>
                      <button
                        // onClick={() => handleBurnDonation(BigInt(index))}
                        className="rounded bg-red-500 px-4 py-2 text-white"
                        disabled={isDonationsFetching}
                      >
                        Burn
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

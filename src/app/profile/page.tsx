"use client"

import { CREATOR_CONTRACT_ABI } from "@/config/consts"
import Image from "next/image"
import Link from "next/link"
import { formatEther } from "viem"
import { useReadContract } from "wagmi"

import { useCreator } from "@/lib/hooks/use-creator"

import { DonationActions } from "../components/donation-actions"

export default function Profile() {
  const { name, links, avatar, bio } = useCreator()

  const { creatorAddress } = useCreator()

  console.log("@creatorAddress", creatorAddress)

  const { data: donations } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getDonations",
    args: [BigInt(0), BigInt(10)]
  })

  console.log("@donations", donations)

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
          {links &&
            links?.map((x) => (
              <div key={x.url}>
                <a
                  href={x.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-purple-600"
                >
                  {x.label}
                </a>
              </div>
            ))}
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
              {donations?.[0]?.map((donation, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div className="mt-1 text-xs text-gray-500">
                      <p className="text-sm text-gray-500">
                        From: {donation.donator}
                      </p>
                      <p className="text-xs text-cyan-700">
                        {new Date(
                          Number(donation.timestamp) * 1000
                        ).toLocaleString()}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatEther(donation.amount)} ETH
                    </p>
                  </div>
                  <p className="my-2">{donation.message}</p>
                  <DonationActions
                    donationId={BigInt(index)}
                    amount={donation.amount}
                    message={donation.message}
                    isAccepted={donation.isAccepted}
                    isBurned={donation.isBurned}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

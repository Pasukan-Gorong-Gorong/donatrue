import { CREATOR_CONTRACT_ABI } from "@/config/consts"
import { config } from "@/config/wagmi"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useReadContract, useWriteContract } from "wagmi"
import { readContract } from "wagmi/actions"

const ITEMS_PER_PAGE = 10

export type DonationAction = "accept" | "burn"

export interface Donation {
  id: number
  donator: `0x${string}`
  amount: bigint
  message: string
  timestamp: number
  isAccepted: boolean
  isBurned: boolean
}

interface PageData {
  donations: Donation[]
  nextPage?: number
}

export function useDonations(creatorAddress: `0x${string}`) {
  const { data: donationsCount } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getDonationsCount"
  })

  const { writeContract: write, isPending: isActionPending } =
    useWriteContract()

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useInfiniteQuery({
      queryKey: ["donations", creatorAddress] as const,
      initialPageParam: 0,
      queryFn: async ({ pageParam }) => {
        const startIdx = (pageParam as number) * ITEMS_PER_PAGE
        const endIdx = Math.min(
          startIdx + ITEMS_PER_PAGE,
          Number(donationsCount || 0)
        )

        const donations: Donation[] = []
        for (let i = startIdx; i < endIdx; i++) {
          const donation = (await readContract(config, {
            address: creatorAddress,
            abi: CREATOR_CONTRACT_ABI,
            functionName: "getDonation",
            args: [BigInt(i)]
          })) as [string, bigint, string, number, boolean, boolean]

          donations.push({
            id: i,
            donator: donation[0] as `0x${string}`,
            amount: donation[1],
            message: donation[2],
            timestamp: Number(donation[3]),
            isAccepted: donation[4],
            isBurned: donation[5]
          })
        }

        return {
          donations,
          nextPage:
            endIdx < Number(donationsCount || 0) ? pageParam + 1 : undefined
        } as const
      },
      getNextPageParam: (lastPage: PageData) => lastPage.nextPage,
      enabled: Boolean(donationsCount)
    })

  const performAction = async (donationId: number, action: DonationAction) => {
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: action === "accept" ? "acceptDonation" : "burnDonation",
      args: [BigInt(donationId)]
    })
  }

  return {
    donations: data?.pages.flatMap((page: PageData) => page.donations) ?? [],
    actions: {
      accept: (donationId: number) => performAction(donationId, "accept"),
      burn: (donationId: number) => performAction(donationId, "burn")
    },
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isActionPending
  }
}

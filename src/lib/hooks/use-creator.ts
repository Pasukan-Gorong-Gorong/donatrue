import { CREATOR_CONTRACT_ABI } from "@/config/consts"
import { useReadContract, useWriteContract } from "wagmi"

export function useCreator(creatorAddress: `0x${string}` | undefined) {
  // Read contract state
  const { data: creatorInfo, isLoading: isLoadingInfo } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getContractBalance"
  })

  const { data: donationsCount, isLoading: isLoadingCount } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "getDonationsCount"
  })

  const { data: name } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "name"
  })

  const { data: bio } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "bio"
  })

  const { data: avatar } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "avatar"
  })

  const { data: links } = useReadContract({
    address: creatorAddress,
    abi: CREATOR_CONTRACT_ABI,
    functionName: "links"
  })

  // Write operations
  const { writeContract, isPending, error: donateError } = useWriteContract()

  const donate = (message: string, amount: bigint) => {
    if (!creatorAddress) return
    writeContract({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "donate",
      args: [message],
      value: amount
    })
  }

  const acceptDonation = (donationId: bigint) => {
    if (!creatorAddress) return
    writeContract({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "acceptDonation",
      args: [donationId]
    })
  }

  const burnDonation = (donationId: bigint) => {
    if (!creatorAddress) return
    writeContract({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "burnDonation",
      args: [donationId]
    })
  }

  const updateBio = async (newBio: string) => {
    if (!creatorAddress) return
    writeContract({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateBio",
      args: [newBio]
    })
  }

  const updateAvatar = (newAvatar: string) => {
    if (!creatorAddress) return
    writeContract({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateAvatar",
      args: [newAvatar]
    })
  }

  const addLink = async (
    newLink: { url: string; label: string }[] | undefined
  ) => {
    if (!creatorAddress || !newLink) return
    for await (const link of newLink) {
      writeContract({
        address: creatorAddress,
        abi: CREATOR_CONTRACT_ABI,
        functionName: "addLink",
        args: [link.url, link.label]
      })
    }
  }

  const removeLink = (index: bigint) => {
    if (!creatorAddress) return
    writeContract({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "removeLink",
      args: [index]
    })
  }

  return {
    // Contract state
    balance: creatorInfo?.[0] || 0n,
    pendingAmount: creatorInfo?.[1] || 0n,
    donationsCount: Number(donationsCount || 0),
    bio,
    avatar,
    isLoading: isLoadingInfo || isLoadingCount || isPending,
    name,
    links,

    // Write operations
    donate,
    acceptDonation,
    burnDonation,
    updateBio,
    updateAvatar,
    addLink,
    removeLink,
    donateError
  }
}

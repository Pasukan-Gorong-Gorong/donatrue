import { CREATOR_CONTRACT_ABI } from "@/config/consts"
import { useReadContract, useWriteContract } from "wagmi"

export interface CreatorLink {
  url: string
  label: string
}

export interface CreatorProfile {
  address: `0x${string}`
  name: string
  bio: string
  avatar: string
  links: CreatorLink[]
}

export function useCreatorProfile(creatorAddress: `0x${string}`) {
  // Read creator info
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

  // Write operations
  const { writeContract: write, isPending } = useWriteContract()

  const updateBio = async (newBio: string) => {
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateBio",
      args: [newBio]
    })
  }

  const updateAvatar = async (newAvatar: string) => {
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "updateAvatar",
      args: [newAvatar]
    })
  }

  const addLink = async (url: string, label: string) => {
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "addLink",
      args: [url, label]
    })
  }

  const removeLink = async (index: number) => {
    await write({
      address: creatorAddress,
      abi: CREATOR_CONTRACT_ABI,
      functionName: "removeLink",
      args: [BigInt(index)]
    })
  }

  return {
    profile: {
      address: creatorAddress,
      name: name || "",
      bio: bio || "",
      avatar: avatar || "",
      links: [] // Links will be managed separately due to array handling
    },
    actions: {
      updateBio,
      updateAvatar,
      addLink,
      removeLink
    },
    isPending
  }
}

import {
  CREATOR_FACTORY_ADDRESS,
  CREATOR_FACTORY_CONTRACT_ABI
} from "@/config/consts"
import { config } from "@/config/wagmi"
import { useReadContract, useWriteContract } from "wagmi"
import { readContract } from "wagmi/actions"

export function useCreatorRegistration() {
  const { data: creatorCount, isLoading: isLoadingCount } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "creatorCount"
  })

  const { data: allCreators, isLoading: isLoadingCreators } = useReadContract({
    address: CREATOR_FACTORY_ADDRESS,
    abi: CREATOR_FACTORY_CONTRACT_ABI,
    functionName: "getAllCreators"
  })

  const { writeContract: write, isPending } = useWriteContract()

  const register = async (name: string) => {
    await write({
      address: CREATOR_FACTORY_ADDRESS,
      abi: CREATOR_FACTORY_CONTRACT_ABI,
      functionName: "registerCreator",
      args: [name]
    })
  }

  const getCreatorContract = async (creatorAddress: `0x${string}`) => {
    const data = await readContract(config, {
      address: CREATOR_FACTORY_ADDRESS,
      abi: CREATOR_FACTORY_CONTRACT_ABI,
      functionName: "getCreatorContract",
      args: [creatorAddress]
    })
    return data as `0x${string}`
  }

  return {
    creatorCount: Number(creatorCount || 0),
    allCreators: (allCreators || []) as `0x${string}`[],
    register,
    getCreatorContract,
    isPending,
    isLoading: isLoadingCount || isLoadingCreators
  }
}

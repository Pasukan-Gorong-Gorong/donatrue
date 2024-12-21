"use client"

import { useState } from "react"

import { DonateSuccess } from "@/app/donate/components/donate-success"

interface Creator {
  name: string
}

interface ConfirmDonationModalProps {
  isOpen: boolean
  creator: Creator | null
  onClose: () => void
}

export function ConfirmDonationModal({
  isOpen,
  creator,
  onClose
}: ConfirmDonationModalProps) {
  const [isSuccess, setIsSuccess] = useState(false)

  if (!isOpen || !creator) return null

  const handleDonate = () => {
    setIsSuccess(true)
  }

  const handleCloseSuccess = () => {
    setIsSuccess(false)
    onClose()
  }

  return (
    <>
      {isSuccess ? (
        <DonateSuccess onClose={handleCloseSuccess} />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-black w-full max-w-lg p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Confirmation Donation
            </h1>
            <p className="text-center text-lg mb-6">
              Send amount & Message to{" "}
              <span className="font-semibold">{creator.name}</span>!
            </p>

            <form>
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium mb-2"
                >
                  Amount:
                </label>
                <input
                  id="amount"
                  type="text"
                  placeholder="Enter amount..."
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message:
                </label>
                <textarea
                  id="message"
                  placeholder="Send your message..."
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black focus:ring-2 focus:ring-purple-400 focus:outline-none"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleDonate}
                  className="px-6 py-2 rounded-lg bg-purple-700 text-white font-semibold hover:bg-purple-800 transition"
                >
                  Donate
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

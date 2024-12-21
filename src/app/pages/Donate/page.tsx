"use client"

import { ConfirmDonationModal } from "@/app/components/ConfirmDonation"
import { Footer } from "@/app/components/Footer"
import { NavBar } from "@/app/components/NavBar"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function Donate() {
  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState(null)

  const creators = Array(9).fill({
    name: "Sena Gacor",
    about: "Pecinta nomer 1 Freya.",
    youtube: "https://www.youtube.com/senagacor",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyCxW0fqZhWDlhUaxDu23NAnK1BCtO4ZgC6O6nRtZ4mbOvdYHEmOwrEEB-gqy-mmcw9RvDnbgZUEesuuN08QWRrv6ZNE&s=10"
  })

  const handleDonateClick = (creator: (typeof creators)[0]) => {
    setSelectedCreator(creator)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedCreator(null)
  }

  return (
    <main>
      <NavBar />

      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-4xl font-bold mb-6">
          Donate to your favorite creator!
        </h1>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search your creator..."
            className="text-black w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-black">
          {creators.map((creator, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-center mb-4">
                <Image
                  src={creator.image}
                  alt={creator.name}
                  width={100}
                  height={100}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-xl font-semibold text-center mb-2">
                {creator.name}
              </h2>
              <p className="text-sm text-gray-600 text-center mb-4">
                {creator.about}
              </p>
              <p className="text-sm text-center text-purple-600">
                <a
                  href={creator.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {creator.youtube}
                </a>
              </p>
              <div className="flex justify-center space-x-4 mt-6">
                <button
                  onClick={() => handleDonateClick(creator)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-purple-700 hover:text-white hover:border-purple-700 transition"
                >
                  Donate
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-300 transition">
                  <Link href="/pages/History">Track Donation</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && (
        <ConfirmDonationModal
          isOpen={isModalOpen}
          creator={selectedCreator}
          onClose={handleCloseModal}
        />
      )}

      <Footer />
    </main>
  )
}

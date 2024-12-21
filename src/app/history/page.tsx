"use client"

import Image from "next/image"

export default function History() {
  const donationHistory = [
    {
      name: "77315xc",
      wallet: "0x1234...5678",
      description: "Wallet click donate",
      value: "50 SOL",
      status: "Accepted"
    },
    {
      name: "77315xc",
      wallet: "0x1234...5678",
      description: "Wallet click donate",
      value: "30 SOL",
      status: "Burned"
    },
    {
      name: "77315xc",
      wallet: "0x1234...5678",
      description: "Wallet click donate",
      value: "20 SOL",
      status: "Accepted"
    }
  ]

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-4xl font-bold mb-6">
          Track your creator donation
        </h1>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search creator by creator name..."
            className="text-black w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-xl font-semibold text-black mb-4">
            Donation history
          </h2>
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyCxW0fqZhWDlhUaxDu23NAnK1BCtO4ZgC6O6nRtZ4mbOvdYHEmOwrEEB-gqy-mmcw9RvDnbgZUEesuuN08QWRrv6ZNE&s=10"
            alt="Sena Gacor"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-black">Sena Gacor</p>
          <p className="text-sm text-gray-500">0x1234...5678</p>
        </div>

        <div className="overflow-x-auto ">
          <table className="table-auto w-full border border-gray-300 rounded-lg shadow-sm">
            <thead className="bg-gray-200 text-black">
              <tr className="">
                <th className="px-4 py-2 text-left text-black">Name</th>
                <th className="px-4 py-2 text-left">Wallet Address</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Value</th>
                <th className="px-4 py-2 text-left">Status Donation</th>
              </tr>
            </thead>
            <tbody>
              {donationHistory.map((donation, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-50`}
                >
                  <td className="border px-4 py-2 text-black">
                    {donation.name}
                  </td>
                  <td className="border px-4 py-2 text-black">
                    {donation.wallet}
                  </td>
                  <td className="border px-4 py-2 text-black">
                    {donation.description}
                  </td>
                  <td className="border px-4 py-2 text-black">
                    {donation.value}
                  </td>
                  <td
                    className={`border px-4 py-2 font-medium ${
                      donation.status === "Accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {donation.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}

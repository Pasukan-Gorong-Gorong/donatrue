"use client"

import Image from "next/image"
import Link from "next/link"

export default function Profile() {
  const initialDonations = [
    {
      name: "777Slot",
      wallet: "0xsas...ssdd",
      description: "Main di slot 777Slot auto gacor maksimal",
      value: "20 SOL",
      status: "Pending"
    },
    {
      name: "AlphaDonor",
      wallet: "0x1234...abcd",
      description: "Donasi untuk project inovasi",
      value: "30 SOL",
      status: "Pending"
    },
    {
      name: "BetaDonor",
      wallet: "0x5678...efgh",
      description: "Donasi kemanusiaan",
      value: "10 SOL",
      status: "Pending"
    }
  ]

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-2xl font-semibold mb-6">
          Your Profile
        </h1>

        <div className=" flex flex-col items-center justify-center text-center mb-10">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyCxW0fqZhWDlhUaxDu23NAnK1BCtO4ZgC6O6nRtZ4mbOvdYHEmOwrEEB-gqy-mmcw9RvDnbgZUEesuuN08QWRrv6ZNE&s=10"
            alt="Sena Gacor"
            width={100}
            height={100}
            className="rounded-full mx-auto mb-4"
          />
          <p className="text-lg font-medium text-black">Sena Gacor</p>
          <p className="text-sm text-black">donor...sxdd</p>
          <p className="text-sm text-purple-600 mt-2">
            <a
              href="https://youtube.com/channel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-purple-600"
            >
              Youtube.com/channel
            </a>
          </p>
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
            <table className="table-auto w-full border border-gray-300 rounded-lg shadow-sm text-black">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left text-black">Name</th>
                  <th className="px-4 py-2 text-left text-black">
                    Wallet Address
                  </th>
                  <th className="px-4 py-2 text-left text-black">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-black">Value</th>
                  <th className="px-4 py-2 text-left text-black">
                    Status Donation
                  </th>
                  <th className="px-4 py-2 text-left text-black">Actions</th>
                </tr>
              </thead>
              <tbody>
                {initialDonations.map((donation, index) => (
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
                        donation.status === "Accept"
                          ? "text-green-500"
                          : donation.status === "Ban"
                            ? "text-red-500"
                            : "text-gray-500"
                      }`}
                    >
                      {donation.status}
                    </td>
                    <td className="border px-4 py-2 flex gap-2">
                      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
                        Accept
                      </button>
                      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                        Burn
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}

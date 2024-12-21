"use client"

import { Footer } from "@/app/components/Footer"
import { NavBar } from "@/app/components/NavBar"
import Image from "next/image"
import { useState } from "react"

export default function EditProfile() {
  const [profile, setProfile] = useState({
    name: "Sena Gacor",
    youtube: "https://youtube.com/channel",
    wallet: "0xsas...ssdd",
    bio: "Pecinta nomer 1 freya"
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleSave = () => {
    alert("Profile updated successfully!")
  }

  return (
    <main>
      <NavBar />
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-4xl font-bold mb-6">
          Edit Profile
        </h1>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNyCxW0fqZhWDlhUaxDu23NAnK1BCtO4ZgC6O6nRtZ4mbOvdYHEmOwrEEB-gqy-mmcw9RvDnbgZUEesuuN08QWRrv6ZNE&s=10"
                alt="Profile Picture"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <button className="text-black hover:text-purple-800 font-semibold">
              Change Profile Picture
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                YouTube Channel
              </label>
              <input
                type="text"
                name="youtube"
                value={profile.youtube}
                onChange={handleChange}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-purple-700 text-white rounded-lg font-semibold shadow-md hover:bg-purple-800 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}

"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

import { useCreator } from "@/lib/hooks/use-creator"

export default function EditProfile() {
  const { name, links, avatar, bio, updateBio, updateAvatar } = useCreator()

  const [profile, setProfile] = useState({
    name: "",
    youtube: "",
    avatar: "",
    bio: ""
  })

  useEffect(() => {
    setProfile({
      name: name || "",
      youtube: links?.[0]?.[0] || "",
      avatar: avatar || "/default-avatar.png",
      bio: bio || ""
    })
  }, [name, links, avatar, bio])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      if (profile.bio !== bio) await updateBio(profile.bio)
      if (profile.avatar !== avatar) await updateAvatar(profile.avatar)
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile.")
    }
  }

  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12">
        <h1 className="text-center text-black text-4xl font-bold mb-6">
          Edit Profile
        </h1>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <Image
                src={profile.avatar}
                alt="Profile Picture"
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
            </div>
            <input
              type="text"
              name="avatar"
              value={profile.avatar}
              onChange={handleChange}
              placeholder="Enter avatar URL"
              className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
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
                disabled
                className="w-full text-gray-500 bg-gray-200 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
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
                disabled
                className="w-full text-gray-500 bg-gray-200 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed"
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
    </main>
  )
}

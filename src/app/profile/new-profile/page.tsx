"use client"

export default function NewProfile() {
  return (
    <main>
      <section className="bg-gradient-to-b from-gray-100 to-white min-h-screen px-8 py-12 flex justify-center items-center">
        <div className="w-full text-black max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-black mb-6">
            Set Up Your Profile
          </h1>

          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-gray-400 text-sm flex items-center justify-center ml-3 ">
                Add Profile Picture
              </span>
            </div>
            <button className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition">
              Upload Picture
            </button>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name:
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube Channel:
              </label>
              <input
                type="text"
                placeholder="Enter your YouTube channel link..."
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address:
              </label>
              <input
                type="text"
                placeholder="Enter your wallet address..."
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio:
              </label>
              <textarea
                placeholder="Write something about yourself..."
                className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
                rows={4}
              ></textarea>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

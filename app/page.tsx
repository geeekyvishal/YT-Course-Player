"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "./components/layout"

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const playlistId = new URL(playlistUrl).searchParams.get("list")
    if (playlistId) {
      router.push(`/course/${playlistId}`)
    } else {
      alert("Invalid YouTube playlist URL")
    }
  }

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="playlist-url">
              YouTube Playlist URL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="playlist-url"
              type="url"
              placeholder="https://www.youtube.com/playlist?list=..."
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Start Learning
            </button>
          </div>
        </form>
      </div>
    </Layout>
  )
}


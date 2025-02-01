"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "./components/layout"
import { Input } from "@/app/components/ui/input"
import { Button } from "@/app/components/ui/button"
import { Youtube } from "lucide-react"
import Image from "next/image"

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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="text-center mb-12">
          <Image
            src="/logo.png"
            alt="EduTube Logo"
            width={120}
            height={120}
            className="mx-auto mb-8 dark:brightness-200"
            priority
          />
          <h1 className="text-4xl font-bold mb-4">Welcome to EduTube</h1>
          <p className="text-xl text-muted-foreground">
          Transform YouTube playlists into structured courses with an ad-free, focused learning environment.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex flex-col space-y-4">
            <div className="relative">
              <Youtube className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-10"
                placeholder="Enter YouTube playlist URL"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Start Learning
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}


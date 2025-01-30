import { useState, useEffect } from "react"

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY

export interface Video {
  id: string
  title: string
  thumbnail: string
  completed: boolean
}

export async function fetchPlaylistData(playlistId: string): Promise<Video[]> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}`,
  )
  const data = await response.json()
  return data.items.map((item: any) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails.default.url,
    completed: false,
  }))
}

export function useProgress(playlistId: string) {
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const storedProgress = localStorage.getItem(`progress_${playlistId}`)
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress))
    }
  }, [playlistId])

  const updateProgress = (videoId: string, completed: boolean) => {
    const newProgress = { ...progress, [videoId]: completed }
    setProgress(newProgress)
    localStorage.setItem(`progress_${playlistId}`, JSON.stringify(newProgress))
  }

  const getCompletedCount = () => Object.values(progress).filter(Boolean).length

  return { progress, updateProgress, getCompletedCount }
}


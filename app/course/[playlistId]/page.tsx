"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Layout from "@/app/components/layout"
import { fetchPlaylistData, useProgress, type Video } from "@/app/utils/youtube"
import { Check } from "lucide-react"
import Image from "next/image"
import { LoadingAnimation } from "@/app/components/loading-animation"

export default function CoursePage() {
  const params = useParams()
  const playlistId = params.playlistId as string

  const [videos, setVideos] = useState<Video[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const { progress, updateProgress, getCompletedCount } = useProgress(playlistId)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (playlistId) {
      setLoading(true)
      fetchPlaylistData(playlistId).then((fetchedVideos) => {
        const updatedVideos = fetchedVideos.map((video) => ({
          ...video,
          completed: progress[video.id] || false,
        }))
        setVideos(updatedVideos)
        setLoading(false)
      })
    }
  }, [playlistId, progress])

  if (loading) {
    return <LoadingAnimation />
  }

  const currentVideo = videos[currentVideoIndex]
  const completedVideos = getCompletedCount()
  const totalVideos = videos.length
  const progressPercentage = totalVideos > 0 ? (completedVideos / totalVideos) * 100 : 0

  const handleVideoEnd = () => {
    if (currentVideo) {
      updateProgress(currentVideo.id, true)
      if (currentVideoIndex < videos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1)
      }
    }
  }

  const toggleVideoCompletion = (videoId: string) => {
    const newStatus = !progress[videoId]
    updateProgress(videoId, newStatus)
    setVideos(videos.map((video) => (video.id === videoId ? { ...video, completed: newStatus } : video)))
  }

  return (
    <Layout progress={progressPercentage} totalVideos={totalVideos} completedVideos={completedVideos}>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-12rem)]">
        <div className="w-full lg:w-3/4 pr-0 lg:pr-4 mb-4 lg:mb-0">
          {currentVideo && (
            <div>
              <div className="aspect-w-16 aspect-h-9 h-[calc(100vh-16rem)]">
                <iframe
                  src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=1&rel=0`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <h2 className="text-2xl font-bold mt-4">{currentVideo.title}</h2>
            </div>
          )}
        </div>
        <div className="w-full lg:w-1/4 bg-card p-4 rounded shadow overflow-y-auto h-full">
          <h3 className="text-xl font-bold mb-4">Course Content</h3>
          <ul className="space-y-2">
            {videos.map((video, index) => (
              <li
                key={video.id}
                className={`p-2 rounded cursor-pointer transition-colors duration-200 ${
                  index === currentVideoIndex ? "bg-accent" : "hover:bg-accent/50"
                } ${video.completed ? "bg-primary/20" : ""}`}
                onClick={() => setCurrentVideoIndex(index)}
              >
                <div className="flex items-center">
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-16 h-9 mr-2 rounded"
                    width={560}
                    height={315}
                  />
                  <span className={`flex-grow text-sm ${video.completed ? "text-muted-foreground" : ""}`}>
                    {video.title}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleVideoCompletion(video.id)
                    }}
                    className={`ml-2 p-1 rounded-full border ${
                      video.completed
                        ? "bg-primary text-primary-foreground border-primary"
                        : "text-muted-foreground border-muted-foreground"
                    }`}
                  >
                    <Check className="h-5 w-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}


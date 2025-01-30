import { Inter } from "next/font/google"
import { useState, useEffect } from "react"
import { Progress } from "@/app/components/ui/progress"

const inter = Inter({ subsets: ["latin"] })

export default function Layout({
  children,
  progress = 0,
  totalVideos = 0,
  completedVideos = 0,
}: {
  children: React.ReactNode
  progress?: number
  totalVideos?: number
  completedVideos?: number
}) {
  const [progressValue, setProgressValue] = useState(0)

  useEffect(() => {
    setProgressValue(progress)
  }, [progress])

  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">YouTube Course Player</h1>
          {totalVideos > 0 && (
            <div className="mt-4">
              <Progress value={progressValue} className="w-full" />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>
                  {completedVideos} / {totalVideos} videos completed
                </span>
                <span>{Math.round(progressValue)}% complete</span>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}


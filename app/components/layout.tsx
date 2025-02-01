import { Inter } from "next/font/google"
import { useState, useEffect } from "react"
import { Progress } from "@/app/components/ui/progress"
import type React from "react"
import { ThemeToggle } from "@/app/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"

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
    <div className={`min-h-screen bg-background text-foreground ${inter.className}`}>
      <header className="bg-card shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="EduTube Logo" width={40} height={40} className="dark:brightness-200" />
            <h1 className="text-3xl font-bold">EduTube</h1>
          </Link>
          <ThemeToggle />
        </div>
        {totalVideos > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
            <Progress value={progressValue} className="w-full" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>
                {completedVideos} / {totalVideos} videos completed
              </span>
              <span>{Math.round(progressValue)}% complete</span>
            </div>
          </div>
        )}
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  )
}


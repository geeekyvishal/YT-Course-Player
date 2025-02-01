import type React from "react"

export const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-primary rounded-full"></div>
        <div className="w-20 h-20 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin absolute left-0 top-0"></div>
      </div>
    </div>
  )
}


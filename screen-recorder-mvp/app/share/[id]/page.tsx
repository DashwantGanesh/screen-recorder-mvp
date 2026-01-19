'use client'

import { useEffect, useRef } from 'react'

export default function SharePage({ params }: { params: { id: string } }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoId = params.id

  // 1️⃣ Track VIEW when page loads
  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: videoId,
        type: 'view',
      }),
    })
  }, [videoId])

  // 2️⃣ Track COMPLETION when video ends
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: videoId,
          type: 'complete',
        }),
      })
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoId])

  return (
    <div style={{ padding: '20px' }}>
      <h2>Shared Video</h2>

      <video
        ref={videoRef}
        controls
        width="600"
        src={`/uploads/${videoId}.webm`}
      />
    </div>
  )
}

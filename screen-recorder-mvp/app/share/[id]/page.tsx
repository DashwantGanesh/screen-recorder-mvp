'use client'

import { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'

export default function SharePage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const params = useParams()

  const videoId =
    params && typeof params.id === 'string' ? params.id : null

  // Track VIEW
  useEffect(() => {
    if (!videoId) return  // ⬅️ CRITICAL GUARD

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: videoId, type: 'view' }),
    })
  }, [videoId])

  // Track COMPLETION
  useEffect(() => {
    if (!videoId) return
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: videoId, type: 'complete' }),
      })
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [videoId])

  if (!videoId) {
    return <p>Loading video...</p>
  }

return (
  <div className="page">
    <div className="card">
      <h2>Shared Video</h2>
      <video
        ref={videoRef}
        controls
        src={`/uploads/${videoId}.webm`}
      />
    </div>
  </div>
)

}

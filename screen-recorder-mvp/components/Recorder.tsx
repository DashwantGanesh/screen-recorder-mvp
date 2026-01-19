'use client'

import { useState } from 'react'
import { startScreenRecording } from '@/lib/recorder'

export default function Recorder() {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [shareUrl, setShareUrl] = useState('')

  const startRecording = async () => {
    const rec = await startScreenRecording(setVideoBlob)
    setRecorder(rec)
  }

  const stopRecording = () => {
    recorder?.stop()
  }

  const uploadVideo = async () => {
    if (!videoBlob) return

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: videoBlob, // ⬅️ THIS sends video to server
    })

    const data = await res.json()
    setShareUrl(data.shareUrl)
  }

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>

      {videoBlob && (
        <>
          <video
            controls
            width="500"
            src={URL.createObjectURL(videoBlob)}
          />

          {/* 👇 THIS BUTTON IS REQUIRED */}
          <button onClick={uploadVideo}>
            Upload & Generate Share Link
          </button>
        </>
      )}

      {shareUrl && (
        <p>
          Share link:
          <a href={shareUrl} target="_blank">{shareUrl}</a>
        </p>
      )}
    </div>
  )
}

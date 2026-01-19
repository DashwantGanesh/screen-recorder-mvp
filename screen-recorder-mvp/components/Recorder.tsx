'use client'

import { useState } from 'react'
import { startScreenRecording } from '@/lib/recorder'

export default function Recorder() {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const [trimmedBlob, setTrimmedBlob] = useState<Blob | null>(null)
  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(5)
  const [shareUrl, setShareUrl] = useState('')

  const startRecording = async () => {
    const rec = await startScreenRecording(setVideoBlob)
    setRecorder(rec)
  }

  const stopRecording = () => {
    recorder?.stop()
  }

  const trimVideo = async () => {
    if (!videoBlob) return

    const formData = new FormData()
    formData.append('video', videoBlob)
    formData.append('start', startTime.toString())
    formData.append('end', endTime.toString())

    const res = await fetch('/api/trim', {
      method: 'POST',
      body: formData,
    })

    const blob = await res.blob()
    setTrimmedBlob(blob)
  }

  const uploadVideo = async () => {
    const blobToUpload = trimmedBlob || videoBlob
    if (!blobToUpload) return

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: blobToUpload,
    })

    const data = await res.json()
    setShareUrl(data.shareUrl)
  }

  return (
    <div style={{ marginTop: 20 }}>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording} style={{ marginLeft: 10 }}>
        Stop Recording
      </button>

      {videoBlob && (
        <>
          <h3>Original Preview</h3>
          <video
            controls
            width="500"
            src={URL.createObjectURL(videoBlob)}
          />

          <div style={{ marginTop: 10 }}>
            <label>
              Start (sec):
              <input
                type="number"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
              />
            </label>

            <label style={{ marginLeft: 10 }}>
              End (sec):
              <input
                type="number"
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
              />
            </label>

            <button onClick={trimVideo} style={{ marginLeft: 10 }}>
              Trim Video
            </button>
          </div>
        </>
      )}

      {trimmedBlob && (
        <>
          <h3>Trimmed Preview</h3>
          <video
            controls
            width="500"
            src={URL.createObjectURL(trimmedBlob)}
          />
        </>
      )}

      {(videoBlob || trimmedBlob) && (
        <button onClick={uploadVideo} style={{ marginTop: 10 }}>
          Upload & Generate Share Link
        </button>
      )}

      {shareUrl && (
        <p>
          Share link:{' '}
          <a href={shareUrl} target="_blank">
            {shareUrl}
          </a>
        </p>
      )}
    </div>
  )
}

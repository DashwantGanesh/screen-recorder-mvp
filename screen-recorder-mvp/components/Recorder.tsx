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
    <div className="mt">
      <div className="flex">
        <button onClick={startRecording}>Start Recording</button>
        <button className="secondary" onClick={stopRecording}>
          Stop Recording
        </button>
      </div>

      {videoBlob && (
        <>
          <h3 className="mt">Original Video</h3>
          <video controls src={URL.createObjectURL(videoBlob)} />

          <div className="flex mt">
            <label>
              Start
              <input
                type="number"
                value={startTime}
                onChange={(e) => setStartTime(Number(e.target.value))}
              />
            </label>

            <label>
              End
              <input
                type="number"
                value={endTime}
                onChange={(e) => setEndTime(Number(e.target.value))}
              />
            </label>

            <button onClick={trimVideo}>Trim</button>
          </div>
        </>
      )}

      {trimmedBlob && (
        <>
          <h3 className="mt">Trimmed Video</h3>
          <video controls src={URL.createObjectURL(trimmedBlob)} />
        </>
      )}

      {(videoBlob || trimmedBlob) && (
        <button className="mt" onClick={uploadVideo}>
          Upload & Generate Share Link
        </button>
      )}

      {shareUrl && (
        <div className="share">
          Share link:{' '}
          <a href={shareUrl} target="_blank">
            {shareUrl}
          </a>
        </div>
      )}
    </div>
  )
}

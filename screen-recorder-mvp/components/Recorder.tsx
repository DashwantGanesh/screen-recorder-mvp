'use client'
import { useState } from 'react'
import { startScreenRecording } from '@/lib/recorder'

export default function Recorder() {
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)

  const start = async () => {
    const rec = await startScreenRecording(setVideoBlob)
    setRecorder(rec)
  }

  const stop = () => {
    recorder?.stop()
  }

  return (
    <div>
      <button onClick={start}>Start Recording</button>
      <button onClick={stop}>Stop Recording</button>

      {videoBlob && (
        <video
          controls
          src={URL.createObjectURL(videoBlob)}
        />
      )}
    </div>
  )
}

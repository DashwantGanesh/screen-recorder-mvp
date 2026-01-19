export async function startScreenRecording(
  onDataAvailable: (blob: Blob) => void
) {
  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: true
  })

  const mediaRecorder = new MediaRecorder(stream)
  const chunks: BlobPart[] = []

  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data)
  }

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' })
    onDataAvailable(blob)
  }

  mediaRecorder.start()
  return mediaRecorder
}

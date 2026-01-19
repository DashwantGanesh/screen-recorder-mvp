export default function Share({ params }: any) {
  const videoUrl = `/uploads/${params.id}.webm`

  return (
    <div>
      <video src={videoUrl} controls />
    </div>
  )
}

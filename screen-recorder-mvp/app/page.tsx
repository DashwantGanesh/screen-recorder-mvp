import Recorder from '@/components/Recorder'

export default function Home() {
  return (
    <div className="page">
      <div className="card">
        <h1>Screen Recorder MVP</h1>
        <p>
          Record your screen, trim the video, upload it and share via a public
          link.
        </p>

        <Recorder />
      </div>
    </div>
  )
}

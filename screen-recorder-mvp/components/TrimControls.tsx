export default function TrimControls({ onTrim }: any) {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)

  return (
    <div>
      <input type="number" onChange={e => setStart(+e.target.value)} />
      <input type="number" onChange={e => setEnd(+e.target.value)} />
      <button onClick={() => onTrim(start, end)}>Trim</button>
    </div>
  )
}

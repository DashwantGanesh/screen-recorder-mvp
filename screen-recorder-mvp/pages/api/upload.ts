import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  const id = Date.now().toString()
  const filePath = path.join(process.cwd(), 'public/uploads', `${id}.webm`)

  fs.writeFileSync(filePath, req.body)

  res.json({
    shareUrl: `/share/${id}`
  })
}

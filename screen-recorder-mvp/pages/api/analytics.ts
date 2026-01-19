import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

const filePath = path.join(process.cwd(), 'data/analytics.json')

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, type } = req.body

  // 🛑 SAFETY CHECK
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid video id' })
  }

  const data = fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
    : {}

  if (!data[id]) {
    data[id] = { views: 0, completed: 0 }
  }

  if (type === 'view') data[id].views++
  if (type === 'complete') data[id].completed++

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

  res.status(200).json({ success: true })
}

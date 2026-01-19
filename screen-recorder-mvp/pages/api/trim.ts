import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { start, end, inputPath } = req.body
  const outputPath = `public/uploads/trimmed-${Date.now()}.webm`

  ffmpeg(inputPath)
    .setStartTime(start)
    .setDuration(end - start)
    .output(outputPath)
    .on('end', () => res.json({ outputPath }))
    .run()
}

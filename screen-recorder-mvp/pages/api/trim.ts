import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'
import ffmpeg from 'fluent-ffmpeg'
import { IncomingForm } from 'formidable'

ffmpeg.setFfmpegPath(
  'C:/ffmpeg/ffmpeg-8.0.1-essentials_build/bin/ffmpeg.exe'
)

export const config = {
  api: { bodyParser: false },
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new IncomingForm({ keepExtensions: true })

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Form parsing failed' })
    }

    const start = Number(fields.start)
    const end = Number(fields.end)

    if (!files.video || isNaN(start) || isNaN(end) || end <= start) {
      return res.status(400).json({ error: 'Invalid trim values' })
    }

    const file = Array.isArray(files.video)
      ? files.video[0]
      : files.video

    const inputPath = (file as any).filepath

    const outputPath = path.join(
      process.cwd(),
      'public/uploads',
      `trimmed-${Date.now()}.webm`
    )

    try {
      ffmpeg(inputPath)
        .setStartTime(start)
        .setDuration(end - start)
        .output(outputPath)
        .on('end', () => {
          const stream = fs.createReadStream(outputPath)
          res.setHeader('Content-Type', 'video/webm')
          stream.pipe(res)
        })
        .on('error', (ffmpegErr) => {
          console.error('FFmpeg error:', ffmpegErr)
          res.status(500).json({ error: 'FFmpeg processing failed' })
        })
        .run()
    } catch (e) {
      res.status(500).json({ error: 'Unexpected server error' })
    }
  })
}

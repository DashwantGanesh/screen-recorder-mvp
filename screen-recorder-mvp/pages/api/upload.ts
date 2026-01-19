import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// IMPORTANT: disable bodyParser because we receive raw binary data
export const config = {
  api: {
    bodyParser: false,
  },
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buffers: Uint8Array[] = []

  req.on('data', (chunk) => {
    buffers.push(chunk)
  })

  req.on('end', () => {
    const videoBuffer = Buffer.concat(buffers)
    const id = Date.now().toString()

    const filePath = path.join(
      process.cwd(),
      'public/uploads',
      `${id}.webm`
    )

    fs.writeFileSync(filePath, videoBuffer)

    res.status(200).json({
      shareUrl: `/share/${id}`,
    })
  })
}


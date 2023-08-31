import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'
import path from 'path'

export default function GET(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const video_id = request.query.video_id as string
  if (typeof video_id !== 'string') {
    response.status(400).json({ error: 'Invalid request' })
    return
  }
  console.log('Video ID: ', video_id)

  // Use 'spawn' to execute the script with arguments
  const cmd = spawn(path.join(process.cwd(), 'scripts/download-audio.sh'), [
    video_id || ''
  ])

  // Capture script output and errors
  cmd.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
    response.write(data)
  })

  cmd.stderr.on('data', chunk => {
    const chunkStr = chunk.toString('utf-8')
    console.log('[Error]', chunkStr)
    response.write(
      chunkStr
        .split('\n')
        .map((line: string) => '[Error] ' + line)
        .join('\n')
    )
  })
  cmd.on('close', code => {
    console.log('Finished Command . Exit code: ', code)
  })

  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'none'
  })

  cmd.stdout.pipe(response)
}

import type { NextApiRequest, NextApiResponse } from 'next'
import { spawn } from 'child_process'

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

  const scriptPath =
    'D:/Code/transcriber/youtube-transcriber/scripts/download-audio.sh'

  // Use 'spawn' to execute the script with arguments
  const cmd = spawn(scriptPath, [video_id || ''])

  // Capture script output and errors
  cmd.stdout.on('data', data => {
    console.log(`stdout: ${data}`)
    response.write(data)
  })

  cmd.stderr.on('data', data => {
    console.error(`stderr: ${data}`)
    response.write(`[Error] ${data}`)
  })

  // Handle script exit
  cmd.on('close', code => {
    console.log(`Finished command. Exit code: ${code}`)
    response.end() // End the response when the script completes
  })

  response.writeHead(200, {
    'Content-Type': 'text/plain',
    'Cache-Control': 'no-cache',
    'Content-Encoding': 'none'
  })
}

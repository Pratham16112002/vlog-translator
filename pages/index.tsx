import Head from 'next/head'
import VideoForm from '../components/video-form'
import { styled } from '../stitches.config'
import { Box } from '../components/box'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent
} from '../components/tabs'
import { Output } from '../components/output'

const Text = styled('p', {
  fontFamily: 'sans-serif',
  fontWeight: 'bold'
})

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  marginY: 0,
  marginX: 'auto',
  paddingY: 0,
  paddingX: '$3',

  variants: {
    size: {
      1: {
        maxWidth: '300px'
      },
      2: {
        maxWidth: '585px'
      },
      3: {
        maxWidth: '865px'
      }
    }
  }
})

export default function Home() {
  return (
    <Box css={{ paddingY: '$6' }}>
      <Head>
        <title>Youtube Transcription &amp; Hindi Translation</title>
      </Head>
      <Container size={{ '@initial': '1', '@bp1': '2' }}>
        <Text as="h1">Youtube Transcription &amp: Hindi Translation</Text>
        <VideoForm />
        <TabsRoot defaultValue="progress">
          <TabsList aria-label="output">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="progress">
            <Output>{'Progress will go here'.repeat(100)}</Output>
          </TabsContent>
          <TabsContent value="result">
            <Output>{'Result will go here'}</Output>
          </TabsContent>
        </TabsRoot>
      </Container>
    </Box>
  )
}

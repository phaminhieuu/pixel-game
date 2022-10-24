import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'

const GamePlay = dynamic(() => import('../components/gameplay'), { ssr: false })

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Pixel game</title>
        <meta name="description" content="Pokemon game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GamePlay />
    </div>
  )
}

export default Home

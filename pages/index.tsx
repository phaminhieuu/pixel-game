import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { boundary, sprite } from '../classes/sprite'
import { collisions } from '../data/collisions'
import { CanvasReturnType } from '../models'
import rectangularCollision from '../utils/check'

const Home: NextPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null)

  useEffect(() => {
    const { current: canvas } = canvasRef
    if (!canvas) return

    const { innerWidth, innerHeight } = window

    canvas.width = innerWidth
    canvas.height = innerHeight

    canvasCtxRef.current = canvas.getContext('2d')

    const { current: c } = canvasCtxRef

    if (!c) return

    let offsetX = -290
    let offsetY = -400

    const collisionsMap: any = []

    for (let i = 0; i < collisions.length; i += 70) {
      collisionsMap.push(collisions.slice(i, 70 + i))
    }

    const boundaries: CanvasReturnType[] = []

    collisionsMap.forEach((row: number[], i: number) => {
      row.forEach((symbol: number, j: number) => {
        if (symbol === 1025) {
          const b = boundary({
            canvas: c,
            position: {
              x: j * 48 + offsetX,
              y: i * 48 + offsetY
            }
          })

          boundaries.push(b)
        }
      })
    })

    // Canvas scene container
    c.fillStyle = 'white'
    c.fillRect(0, 0, innerWidth, innerHeight)

    const bgImage = new Image()
    bgImage.src = '/pellet-town.png'

    const foregroundImage = new Image()
    foregroundImage.src = '/foreground.png'

    const playerDownImage = new Image()
    playerDownImage.src = '/down.png'

    const playerLeftImage = new Image()
    playerLeftImage.src = '/left.png'

    const playerUpImage = new Image()
    playerUpImage.src = '/up.png'

    const playerRightImage = new Image()
    playerRightImage.src = '/right.png'

    const player = sprite({
      canvas: c,
      image: playerDownImage,
      frames: { max: 6, val: 0, elapsed: 0 },
      position: {
        x: innerWidth / 2 - (68 * 6) / 4 / 2,
        y: innerHeight / 2 - 68 / 4 / 2
      },
      sprites: {
        up: playerUpImage,
        down: playerDownImage,
        left: playerLeftImage,
        right: playerRightImage
      },
      scale: 1
    })

    const background = sprite({
      canvas: c,
      image: bgImage,
      position: {
        x: offsetX,
        y: offsetY
      }
    })

    const foreground = sprite({
      canvas: c,
      image: foregroundImage,
      position: {
        x: offsetX + 432,
        y: offsetY + 143
      }
    })

    const keys = {
      w: { pressed: false },
      a: { pressed: false },
      s: { pressed: false },
      d: { pressed: false }
    }

    const movables = [background, foreground, ...boundaries]

    const animate = () => {
      const req = requestAnimationFrame(animate)
      //drawBackground
      background.draw(background.position)

      //drawPlayer
      player.draw({
        ...player.position,
        moving: player.moving,
        image: player.image
      })

      //drawForeground
      foreground.draw(foreground.position)

      //drawBoundaries

      boundaries.forEach((boundary) => boundary.draw(boundary.position))

      let moving = true
      player.moving = false

      // Keyboard movement
      if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        const upImg = player.sprites?.up
        player.image = upImg ? upImg : player.image
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision(player, {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y + 3
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.y += 3))
        }
      } else if (keys.a.pressed && lastKey === 'a') {
        player.moving = true
        const leftImg = player.sprites?.left
        player.image = leftImg ? leftImg : player.image
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision(player, {
              ...boundary,
              position: {
                x: boundary.position.x + 3,
                y: boundary.position.y
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.x += 3))
        }
      } else if (keys.s.pressed && lastKey === 's') {
        player.moving = true
        const downImg = player.sprites?.down
        player.image = downImg ? downImg : player.image
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision(player, {
              ...boundary,
              position: {
                x: boundary.position.x,
                y: boundary.position.y - 3
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.y -= 3))
        }
      } else if (keys.d.pressed && lastKey === 'd') {
        player.moving = true
        const rightImg = player.sprites?.right
        player.image = rightImg ? rightImg : player.image
        for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
            rectangularCollision(player, {
              ...boundary,
              position: {
                x: boundary.position.x - 3,
                y: boundary.position.y
              }
            })
          ) {
            moving = false
            break
          }
        }
        if (moving) {
          movables.forEach((movable) => (movable.position.x -= 3))
        }
      }

      return () => {
        cancelAnimationFrame(req)
      }
    }

    animate()

    let lastKey = ''
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
          keys.w.pressed = true
          lastKey = 'w'
          break
        case 'a':
          keys.a.pressed = true
          lastKey = 'a'
          break
        case 's':
          keys.s.pressed = true
          lastKey = 's'
          break
        case 'd':
          keys.d.pressed = true
          lastKey = 'd'
          break
      }
    })

    window.addEventListener('keyup', (e: KeyboardEvent) => {
      switch (e.key) {
        case 'w':
          keys.w.pressed = false
          break
        case 'a':
          keys.a.pressed = false
          break
        case 's':
          keys.s.pressed = false
          break
        case 'd':
          keys.d.pressed = false
          break
      }
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Pixel game</title>
        <meta name="description" content="Pokemon game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <canvas ref={canvasRef}></canvas>
    </div>
  )
}

export default Home

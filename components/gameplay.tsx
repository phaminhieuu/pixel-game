import { useEffect, useRef } from 'react'
import { Sprite, Boundary } from '../classes/sprite'
import { collisions } from '../data/collisions'
import { CanvasReturnType } from '../models'
import rectangularCollision from '../utils/check'

export default function GamePlay() {
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

    const boundaries: Boundary[] = []

    collisionsMap.forEach((row: number[], i: number) => {
      row.forEach((symbol: number, j: number) => {
        if (symbol === 1025) {
          const b = new Boundary({
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

    const moveDown = new Image()
    moveDown.src = '/move-down.png'

    const moveLeft = new Image()
    moveLeft.src = '/move-left.png'

    const moveUp = new Image()
    moveUp.src = '/move-up.png'

    const moveRight = new Image()
    moveRight.src = '/move-right.png'

    const idleDown = new Image()
    idleDown.src = '/idle-right.png'

    const idleLeft = new Image()
    idleLeft.src = '/idle-left.png'

    const idleUp = new Image()
    idleUp.src = '/idle-left.png'

    const idleRight = new Image()
    idleRight.src = '/idle-right.png'

    const attackRight = new Image()
    attackRight.src = '/attack-right.png'

    const attackLeft = new Image()
    attackLeft.src = '/attack-left.png'

    const attackDown = new Image()
    attackDown.src = '/attack-down.png'

    const attackUp = new Image()
    attackUp.src = '/attack-up.png'

    const player = new Sprite({
      canvas: c,
      image: idleRight,
      frames: { max: 6, val: 0, elapsed: 0 },
      position: {
        x: innerWidth / 2 - 590 / 6 / 2,
        y: innerHeight / 2 - 90 / 2
      },
      sprites: {
        moveUp,
        moveDown,
        moveLeft,
        moveRight,
        idleUp,
        idleDown,
        idleLeft,
        idleRight,
        attackRight,
        attackLeft,
        attackUp,
        attackDown
      },
      scale: 1
    })

    const background = new Sprite({
      canvas: c,
      image: bgImage,
      position: {
        x: offsetX,
        y: offsetY
      }
    })

    const foreground = new Sprite({
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
      d: { pressed: false },
      space: { pressed: false }
    }

    const movables = [background, foreground, ...boundaries]

    const animate = () => {
      const req = requestAnimationFrame(animate)
      //drawBackground
      background.draw()

      player.draw()

      //drawForeground
      foreground.draw()

      //drawBoundaries

      boundaries.forEach((boundary) => boundary.draw())

      let moving = true
      player.moving = false

      // Keyboard movement
      if (keys.w.pressed && lastKey === 'w') {
        player.moving = true
        player.switchSprite('moveUp')
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
        player.switchSprite('moveLeft')
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
        player.switchSprite('moveDown')
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
        player.switchSprite('moveRight')
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

      // Idle
      if (!player.isAttack) {
        if (!keys.a.pressed && lastKey === 'a') {
          player.switchSprite('idleLeft')
        } else if (!keys.d.pressed && lastKey === 'd') {
          player.switchSprite('idleRight')
        } else if (!keys.s.pressed && lastKey === 's') {
          player.switchSprite('idleRight')
        } else if (!keys.w.pressed && lastKey === 'w') {
          player.switchSprite('idleRight')
        }
      }

      // Attack
      if (player.isAttack) {
        if (lastKey === 'd') {
          player.switchSprite('attackRight')
        } else if (lastKey === 'a') {
          player.switchSprite('attackLeft')
        } else if (lastKey === 'w') {
          player.switchSprite('attackUp')
        } else if (lastKey === 's') {
          player.switchSprite('attackDown')
        }

        if (player.frames.val === 5) {
          player.isAttack = false
          player.switchSprite('idleRight')
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
        case ' ':
          player.attack()
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

  return <canvas ref={canvasRef}></canvas>
}

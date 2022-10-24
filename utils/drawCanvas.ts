import {
  CanvasBaseProps,
  CanvasReturnType,
  Position,
  SpriteProps
} from '../models'

const SIZE = 48

export function sprite({
  canvas,
  image,
  frames = { max: 1, val: 0, elapsed: 0 },
  position,
  moving = false,
  sprites,
  scale = 1,
  isAttack = false
}: SpriteProps) {
  const width = image.width / frames.max
  const height = image.height
  const img = image

  function draw({
    x,
    y,
    image = img
  }: {
    x: number
    y: number
    moving?: boolean
    image?: HTMLImageElement
  }) {
    canvas.drawImage(
      image,
      frames.val * width,
      0,
      width,
      height,
      x,
      y,
      width * scale,
      height * scale
    )

    if (frames.max > 1) frames.elapsed++

    if (frames.elapsed % 6 === 0) {
      if (frames.val < frames.max - 1) frames.val++
      else frames.val = 0
    }
  }

  function attack() {
    isAttack = true
  }

  return {
    position,
    width,
    height,
    draw,
    moving,
    image,
    sprites,
    isAttack,
    attack
  }
}

export function boundary({
  canvas,
  position
}: CanvasBaseProps): CanvasReturnType {
  function draw({ x, y }: Position) {
    canvas.fillStyle = 'rgba(255,0,0,0)'
    canvas.fillRect(x, y, SIZE, SIZE)
  }

  return { position, width: SIZE, height: SIZE, draw }
}

export function drawBoundary(
  canvas: CanvasRenderingContext2D,
  x: number,
  y: number
) {
  canvas.fillStyle = 'red'
  canvas.fillRect(x, y, SIZE, SIZE)
  return { x, y, width: SIZE, height: SIZE }
}

export function drawCanvas(
  canvas: CanvasRenderingContext2D,
  image: HTMLImageElement,
  frames: number,
  x: number,
  y: number
) {
  const width = image.width / frames
  const height = image.height
  canvas.drawImage(image, 0, 0, width, height, x, y, width, height)

  return { x, y, width, height }
}

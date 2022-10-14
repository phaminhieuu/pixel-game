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
  scale = 1
}: SpriteProps) {
  const width = image.width / frames.max
  const height = image.height
  const img = image

  function draw({
    x,
    y,
    moving = false,
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

    if (!moving) return

    if (frames.max > 1) frames.elapsed++

    if (frames.elapsed % 10 === 0) {
      if (frames.val < frames.max - 1) frames.val++
      else frames.val = 0
    }
  }

  return {
    position,
    width,
    height,
    draw,
    moving,
    image,
    sprites
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

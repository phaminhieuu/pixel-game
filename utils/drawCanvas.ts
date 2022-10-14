const SIZE = 48

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

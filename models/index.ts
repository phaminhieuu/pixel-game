// props
export interface Position {
  x: number
  y: number
}

export interface Frames {
  max: number
  val: number
  elapsed: number
}

export interface SpritesImage {
  up: HTMLImageElement
  left: HTMLImageElement
  down: HTMLImageElement
  right: HTMLImageElement
}

export interface CanvasBaseProps {
  canvas: CanvasRenderingContext2D
  position: Position
}

export interface SpriteProps extends CanvasBaseProps {
  image: HTMLImageElement
  frames?: Frames
  moving?: boolean
  sprites?: SpritesImage
}

// return
export interface CanvasReturnType {
  position: Position
  width: number
  height: number
  draw: (position: Position) => void
}

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
  moveUp: HTMLImageElement
  moveLeft: HTMLImageElement
  moveDown: HTMLImageElement
  moveRight: HTMLImageElement
  idleUp: HTMLImageElement
  idleLeft: HTMLImageElement
  idleDown: HTMLImageElement
  idleRight: HTMLImageElement
  attackRight: HTMLImageElement
  attackLeft: HTMLImageElement
  attackUp: HTMLImageElement
  attackDown: HTMLImageElement
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
  scale?: number
  isAttack?: boolean
}

// return
export interface CanvasReturnType {
  position: Position
  width: number
  height: number
  draw: (position: Position) => void
}

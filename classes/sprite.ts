import { Frames, Position, SpriteProps, SpritesImage } from '../models'

const SIZE = 48

export class Sprite {
  canvas: CanvasRenderingContext2D
  image: HTMLImageElement
  position: Position
  frames: Frames = { max: 1, val: 0, elapsed: 0 }
  moving: boolean = false
  sprites: SpritesImage | null
  scale: number = 1
  isAttack: boolean = false
  width: number
  height: number

  constructor({
    canvas,
    image,
    position,
    frames,
    moving,
    sprites,
    scale,
    isAttack
  }: SpriteProps) {
    const framesValue = frames ? frames : { max: 1, val: 0, elapsed: 0 }
    this.canvas = canvas
    this.image = image
    this.position = position
    this.frames = framesValue
    this.moving = moving ? moving : false
    this.sprites = sprites ? sprites : null
    this.scale = scale ? scale : 1
    this.isAttack = isAttack ? isAttack : false
    this.width = image.width / framesValue.max
    this.height = image.height
  }

  draw() {
    this.canvas.drawImage(
      this.image,
      (this.frames.val * this.image.width) / this.frames.max,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      (this.image.width / this.frames.max) * this.scale,
      this.image.height * this.scale
    )

    if (this.frames.max > 1) this.frames.elapsed++

    if (this.frames.elapsed % 6 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++
      else this.frames.val = 0
    }
  }

  attack() {
    this.frames.val = 0
    this.isAttack = true
  }

  switchSprite(state: string) {
    switch (state) {
      case 'idleLeft':
        const idleLeft = this.sprites?.idleLeft
        this.image = idleLeft ? idleLeft : this.image
        break
      case 'idleRight':
        const idleRight = this.sprites?.idleRight
        this.image = idleRight ? idleRight : this.image
        break
      case 'idleUp':
        const idleUp = this.sprites?.idleRight
        this.image = idleUp ? idleUp : this.image
        break
      case 'moveLeft':
        const moveLeft = this.sprites?.moveLeft
        this.image = moveLeft ? moveLeft : this.image
        break
      case 'moveRight':
        const moveRight = this.sprites?.moveRight
        this.image = moveRight ? moveRight : this.image
        break
      case 'moveUp':
        const moveUp = this.sprites?.moveUp
        this.image = moveUp ? moveUp : this.image
        break
      case 'moveDown':
        const moveDown = this.sprites?.moveDown
        this.image = moveDown ? moveDown : this.image
        break
      case 'attackRight':
        const attackRight = this.sprites?.attackRight
        this.image = attackRight ? attackRight : this.image
        break
      case 'attackLeft':
        const attackLeft = this.sprites?.attackLeft
        this.image = attackLeft ? attackLeft : this.image
        break
      case 'attackUp':
        const attackUp = this.sprites?.attackUp
        this.image = attackUp ? attackUp : this.image
        break
      case 'attackDown':
        const attackDown = this.sprites?.attackDown
        this.image = attackDown ? attackDown : this.image
        break
    }
  }
}

export class Boundary {
  static width = 48
  static height = 48
  position: Position
  canvas: CanvasRenderingContext2D

  constructor({
    canvas,
    position
  }: {
    canvas: CanvasRenderingContext2D
    position: Position
  }) {
    this.canvas = canvas
    this.position = position
  }

  draw() {
    this.canvas.fillStyle = 'rgba(255,0,0,0)'
    this.canvas.fillRect(this.position.x, this.position.y, SIZE, SIZE)
  }
}

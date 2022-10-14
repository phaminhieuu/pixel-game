import { CanvasReturnType } from '../models'

export default function rectangularCollision(
  rect1: CanvasReturnType,
  rect2: CanvasReturnType
) {
  const { position: position1, width: rect1W, height: rect1H } = rect1
  const { position: position2, width: rect2W, height: rect2H } = rect2
  const check =
    position1.x + rect1W >= position2.x &&
    position1.x <= position2.x + rect2W &&
    position1.y <= position2.y + rect2H &&
    position1.y + rect1H >= position2.y
  return check
}

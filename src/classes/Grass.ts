import UUID from "../helpers/uuid"
import { app, spriteSheet, canvasProps } from "../main"
import ImageMapper from "./ImageMapper"
import SizeMapper from "./SizeMapper"

class Grass {
    id: string
    height: number
    width: number
    position: { x: number, y: number}
    graphics: { cords: { x: number, y: number, width: number, height: number }}
    size: "s" | "m" | "l"
    type: "grass"
    hanging: boolean

    constructor(x: number, y: number, size: "s" | "m" | "l", hanging: boolean) {
        this.id = UUID.genId()
        const sizeA = SizeMapper.getGrassSize(size, hanging)
        this.position = { x, y: canvasProps.height - y - sizeA.height }
        this.height = sizeA.height
        this.width = sizeA.width
        this.graphics = { cords: ImageMapper.getGrassImageCords(size, hanging)}
        this.type = "grass"
    }

    draw() {
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

}

export default Grass
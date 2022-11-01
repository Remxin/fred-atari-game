import { app, canvasProps, spriteSheet } from "../main"
import UUID from "../helpers/uuid"
import ImageMapper from "./ImageMapper"
import SizeMapper from "./SizeMapper"

export type platformType = "a" | "b"
export type platformLenght = "s" | "m" | "l" | "lg"
export type plarformTurnDirection = "left" | "right"

interface PlatformInterface  {
    position: { x: number, y: number}
    height: number
    width: number
    type: "platform"
    class: "platform"
    id: string
    graphics: { type: platformType, length: platformLenght, turnDirection: plarformTurnDirection, cords: { x: number, y: number, height: number, width: number }}
}

class Platform implements PlatformInterface {
    position: {x: number, y: number}
    width: number
    height: number
    type: "platform"
    class: "platform"
    id: string
    graphics: { type: platformType, length: platformLenght, turnDirection: plarformTurnDirection, cords: { x: number, y: number, height: number, width: number }}

    constructor(x: number, y:number, type: platformType, length: platformLenght, turnDirection: plarformTurnDirection) {
        this.id = UUID.genId()
        this.position = {
            x,
            y: canvasProps.height - y
        }

        const size = SizeMapper.getPlatformSize(type, length)
        this.width = size.width
        this.height = size.height

        this.type = "platform"
        this.class = "platform"
        this.graphics = { cords: ImageMapper.getPlatformImageCords(type, length, turnDirection), type, length, turnDirection}

    }

    draw() {
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }
}

export default Platform
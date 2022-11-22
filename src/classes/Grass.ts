import UUID from "../helpers/uuid"
import { app, spriteSheet, canvasProps, trackableObjects, gameObjects } from "../main"
import ImageMapper from "./ImageMapper"
import SizeMapper from "./SizeMapper"

class Grass {
    id: string
    height: number
    width: number
    position: { x: number, y: number }
    startPos: { x: number, y: number }
    graphics: { cords: { x: number, y: number, width: number, height: number } }
    size: "s" | "m" | "l"
    type: "grass"
    hanging: boolean
    visible: boolean

    constructor(x: number, y: number, size: "s" | "m" | "l", hanging: boolean) {
        this.id = UUID.genId()
        const sizeA = SizeMapper.getGrassSize(size, hanging)
        this.position = { x, y: canvasProps.height - y - sizeA.height }
        this.startPos = { ...this.position }
        this.height = sizeA.height
        this.width = sizeA.width
        this.graphics = { cords: ImageMapper.getGrassImageCords(size, hanging) }
        this.type = "grass"
        this.visible = true
    }

    draw() {
        if (this.position.x + this.width <= 0 || this.position.x >= canvasProps.width) {
            if (this.visible) {
                this.visible = false
                this.track()
            }

            return
        }


        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    track() {
        const myIndex = gameObjects.nonCollidable.findIndex(p => p.id === this.id)
        gameObjects.nonCollidable.splice(myIndex, 1)
        trackableObjects.push(this)
    }

    untrack() {
        gameObjects.nonCollidable.push(this)
        const trackableIndex = trackableObjects.findIndex(p => p.id === this.id)
        trackableObjects.splice(trackableIndex, 1)
    }

}

export default Grass
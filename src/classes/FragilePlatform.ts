import UUID from "../helpers/uuid"
import { app, canvasProps, gameObjects, spriteSheet, trackableObjects } from "../main"
import ImageMapper from "./ImageMapper"

const CONSTANTS = {
    pW: 70,
    pH: 60,
    brokeLevel: 30
}

class FragilePlatform {
    id: string
    height: number
    width: number
    position: { x: number, y: number }
    startPos: { x: number, y: number }
    graphics: { cords: { x: number, y: number, width: number, height: number } }
    class: "fragile platform"
    type: "platform"
    broken: { level: number, is: boolean }
    visible: boolean

    constructor(x: number, y: number) {
        this.id = UUID.genId()
        this.width = CONSTANTS.pW
        this.height = CONSTANTS.pH
        this.position = { x, y: canvasProps.height - y - this.height }
        this.startPos = { ...this.position }
        this.type = "platform"
        this.class = "fragile platform"
        this.broken = { level: CONSTANTS.brokeLevel, is: false }
        this.graphics = { cords: ImageMapper.getFragilePlatformImage(this.broken.is) }
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

    break() {
        if (this.broken.level > 0) return this.broken.level -= 1
        this.broken.is = true

        this.graphics.cords = ImageMapper.getFragilePlatformImage(this.broken.is)
        // delete from collidable and add to non collidable
        const myIndex = gameObjects.collidable.findIndex(i => i.id === this.id)
        gameObjects.collidable.splice(myIndex, 1)

        const nonCollidableIndex = gameObjects.nonCollidable.findIndex((o) => o.id === this.id)
        if (nonCollidableIndex === -1) gameObjects.nonCollidable.push(this)
    }

    track() {
        const myIndex = gameObjects.collidable.findIndex(p => p.id === this.id)
        gameObjects.collidable.splice(myIndex, 1)
        trackableObjects.push(this)
    }

    untrack() {
        gameObjects.collidable.push(this)
        const trackableIndex = trackableObjects.findIndex(p => p.id === this.id)
        trackableObjects.splice(trackableIndex, 1)
    }

}

export default FragilePlatform
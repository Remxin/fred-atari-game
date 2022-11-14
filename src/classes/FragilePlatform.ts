import UUID from "../helpers/uuid"
import { app, gameObjects, spriteSheet } from "../main"
import ImageMapper from "./ImageMapper"

const CONSTANTS = {
    pW: 60,
    pH: 60,
    brokeLevel: 30
}

class FragilePlatform {
    id: string
    height: number
    width: number
    position: { x: number, y: number }
    graphics: { cords: {x: number, y: number, width: number, height: number}} 
    class: "fragile platform"
    type: "platform"
    broken: { level: number, is: boolean}

    constructor(x: number, y: number) {
        this.id = UUID.genId()
        this.position = { x, y}
        this.width = CONSTANTS.pW
        this.height = CONSTANTS.pH
        this.type = "platform"
        this.class ="fragile platform"
        this.broken = { level: CONSTANTS.brokeLevel, is: false}
        this.graphics = { cords: ImageMapper.getFragilePlatformImage(this.broken.is)}
    }

    draw() {
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    break() {
        if (this.broken.level > 0) return this.broken.level -= 1
        this.broken.is = true

        this.graphics.cords = ImageMapper.getFragilePlatformImage(this.broken.is)
        // delete from collidable and add to non collidable
        const myIndex = gameObjects.collidable.findIndex(i => i.id === this.id)
        gameObjects.collidable.splice(myIndex, 1)
        gameObjects.nonCollidable.push(this)
    }

}

export default FragilePlatform
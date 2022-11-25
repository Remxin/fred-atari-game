import { app, canvasProps, spriteSheet, renderer, gameObjects, trackableObjects } from "../main"
import UUID from "../helpers/uuid"
import ImageMapper from "./ImageMapper"
import SizeMapper from "./SizeMapper"

export type platformType = "a" | "b"
export type platformLenght = "s" | "m" | "l" | "lg"
export type plarformTurnDirection = "left" | "right"

interface PlatformInterface {
    position: { x: number, y: number }
    startPos: { x: number, y: number }
    height: number
    width: number
    type: "platform"
    class: "platform"
    id: string
    graphics: { type: platformType, length: platformLenght, turnDirection: plarformTurnDirection, cords: { x: number, y: number, height: number, width: number } }
}

class Platform implements PlatformInterface {
    position: { x: number, y: number }
    startPos: { x: number; y: number }
    width: number
    height: number
    type: "platform"
    class: "platform"
    visible: boolean
    id: string
    graphics: { type: platformType, length: platformLenght, turnDirection: plarformTurnDirection, cords: { x: number, y: number, height: number, width: number } }

    constructor(x: number, y: number, type: platformType, length: platformLenght, turnDirection: plarformTurnDirection) {
        this.id = UUID.genId()

        const size = SizeMapper.getPlatformSize(type, length)
        this.width = size.width
        this.height = size.height
        this.position = {
            x,
            y: canvasProps.height - y - this.height
        }
        this.startPos = { ...this.position }

        this.type = "platform"
        this.class = "platform"
        this.graphics = { cords: ImageMapper.getPlatformImageCords(type, length, turnDirection), type, length, turnDirection }
        this.visible = false
        this.checkVisibility()

    }

    draw() {
        if (this.position.x + this.width <= -300 || this.position.x >= canvasProps.width + 300) {
            if (this.visible) {
                this.visible = false
                this.track()
            }

        }

        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)



    }

    checkVisibility() {
        if (this.position.x + this.width >= -300 || this.position.x <= canvasProps.width + 300) {
            // this.untrack()
            this.visible = true
        } else { }
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
        // this.visible = true
    }
}

export default Platform
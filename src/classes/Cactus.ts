import Enemy from "./Enemy";
import ImageMapper from "./ImageMapper";
import { app, spriteSheet, canvasProps, trackableObjects } from "../main"
import Renderer from "./Renderer";

const CONSTANTS = {
    fragmentHeight: 60
}

export type sizeType = "sm" | "s" | "m" | "l" | "lg"
export type directionType = "" | "right" | "left"

interface CactusInterface {
    type: "enemy"
    class: "cactus"
    direction: directionType
    size: sizeType
    position: { x: number, y: number }
    startPos: { x: number, y: number }
    height: number,
    width: number
    graphics: { cords: { x: number, y: number, width: number, height: number } }
    visible: boolean
}



class Cactus extends Enemy implements CactusInterface {
    type: "enemy"
    class: "cactus"
    direction: directionType;
    size: sizeType;
    height: number
    width: number
    graphics: { cords: { x: number, y: number, width: number, height: number } }
    startPos: { x: number, y: number }
    visible: boolean;

    constructor(x: number, y: number, size: sizeType, direction: directionType) {
        super(x, y)
        this.size = size
        this.assignSize()
        this.type = "enemy"
        this.class = "cactus"
        this.position.y -= this.height
        this.startPos = { ...this.position }
        this.direction = direction
        this.graphics = { cords: ImageMapper.getCactusImageCords(this.size, this.direction) }
        this.visible = true
    }

    assignSize() {
        this.width = CONSTANTS.fragmentHeight - 10

        switch (this.size) {
            case "sm":
                this.height = CONSTANTS.fragmentHeight
                break
            case "s":
                this.height = CONSTANTS.fragmentHeight * 2
                break
            case "m":
                this.height = CONSTANTS.fragmentHeight * 3
                break
            case "l":
                this.height = CONSTANTS.fragmentHeight * 4
                break
        }
        // console.log(this.height, this.width)

    }

    draw() {
        if (this.position.x + this.width <= 0 || this.position.x >= canvasProps.width) {
            if (this.visible) {
                this.visible = false
                this.track()
            }

            return
        }

        // app.c.fillStyle = "green"
        // app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

}

export default Cactus
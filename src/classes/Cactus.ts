import Enemy from "./Enemy";
import ImageMapper from "./ImageMapper";
import { app, spriteSheet} from "../main"

const CONSTANTS = {
    fragmentHeight: 40
}

export type sizeType = "sm" | "s"| "m" | "l" | "lg"
export type directionType = "" | "right" | "left"

interface CactusInterface {
    type: "enemy"
    class: "cactus"
    direction: directionType
    size: sizeType
    position: { x: number, y: number }
    height: number,
    width: number
    graphics: { cords: { x: number, y: number, width: number, height: number }}
}



class Cactus extends Enemy implements CactusInterface {
    type: "enemy"
    class: "cactus"
    direction: directionType;
    size: sizeType;
    height: number
    width: number
    graphics: { cords: { x: number, y: number, width: number, height: number}}

    constructor(x: number, y: number, size: sizeType, direction: directionType) {
        super(x, y)
        this.type = "enemy"
        this.class = "cactus"
        this.direction = direction
        this.size = size
        this.graphics = { cords: ImageMapper.getCactusImageCords(this.size, this.direction)}
        this.assignSize()
    }

    assignSize() {
        this.width = CONSTANTS.fragmentHeight
        
        switch(this.size) {
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

    }

    draw() {
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

}

export default Cactus
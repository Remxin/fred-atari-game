import UUID from "../helpers/uuid"
import { app, spriteSheet, informationManager, player, gameObjects, canvasProps, renderer, trackableObjects } from "../main"
import ImageMapper from "./ImageMapper"


const CONSTANTS = {
    size: 30
}


class PickableStone {
    id: string
    type: "pickable stone"
    position: { x: number, y: number }
    startPos: { x: number, y: number }
    width: number
    height: number
    graphics: { cords: { x: number, y: number, height: number, width: number } }
    visible: boolean

    constructor(x: number, y: number) {
        this.id = UUID.genId()
        this.type = "pickable stone"
        this.width = CONSTANTS.size
        this.height = CONSTANTS.size
        this.position = { x, y: canvasProps.height - y - this.height - 5 }
        this.startPos = { ...this.position }
        this.graphics = { cords: ImageMapper.getGameStoneImageCords() }
        this.visible = true
    }

    draw() {

        this.checkIfPlayerPicked()
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    use() {
        informationManager.updateStones(informationManager.stones.value + 1)
        informationManager.addScorePoints(10)
        this.remove()
    }

    checkIfPlayerPicked() {
        if (this.position.x <= player.position.x + player.width && this.position.x + this.width >= player.position.x && this.position.y + this.height >= player.position.y && this.position.y <= player.position.y + player.height) {
            this.use()
        }
    }

    remove() {
        const myGameIndex = gameObjects.nonCollidable.findIndex(e => e.id === this.id)
        gameObjects.nonCollidable.splice(myGameIndex, 1)

        const myRendererIndex = renderer.breakPoints[renderer.currentBreakPoint].neutral.findIndex(e => e.id === this.id)
        if (myRendererIndex !== -1) renderer.breakPoints[renderer.currentBreakPoint].neutral.splice(myRendererIndex, 1)
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

export default PickableStone
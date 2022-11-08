import UUID from "../helpers/uuid"
import { app, spriteSheet, informationManager, player, gameObjects, canvasProps } from "../main"
import ImageMapper from "./ImageMapper"


const CONSTANTS = {
    size: 25
}


class PickableStone {
    id: string
    type: "pickable stone"
    position: { x: number, y: number }
    width: number
    height: number
    graphics: { cords: { x: number, y: number, height: number, width: number }}

    constructor(x: number, y: number) {
        this.id = UUID.genId()
        this.type = "pickable stone"
        console.log(app)
        this.position = { x, y: canvasProps.height - y}
        this.width = CONSTANTS.size
        this.height = CONSTANTS.size
        this.graphics = { cords: ImageMapper.getGameStoneImageCords()}
    }

    draw() {
        this.checkIfPlayerPicked()
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    use() {
        informationManager.updateStones(informationManager.stones.value + 1)
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
    }
}

export default PickableStone
import { app, canvasProps, renderer, gameObjects } from "../main"
import UUID from "../helpers/uuid"

abstract class Enemy {
    id: String
    position: { x: number, y: number}
    width: number
    height: number

    constructor(x: number, y: number) {
        // console.log();
        this.position = { x, y: canvasProps.height - y }
        this.id = UUID.genId()
    }

    draw() {
        app.c.fillStyle = "orange"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    remove() {
        // remove from renderer
        const myRendererIndex = renderer.breakPoints[renderer.currentBreakPoint].enemies.findIndex((e) => e.id === this.id)
        renderer.breakPoints[renderer.currentBreakPoint].enemies.splice(myRendererIndex, 1)

        const myGameIndex = gameObjects.collidable.findIndex(e => e.id === this.id)
        gameObjects.collidable.splice(myGameIndex, 1)
    }
}


export default Enemy
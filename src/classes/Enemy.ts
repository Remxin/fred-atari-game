import { app, canvasProps, renderer, gameObjects, informationManager, trackableObjects } from "../main"
import UUID from "../helpers/uuid"
import DeathAnim from "./DeathAnim"
import Renderer from "./Renderer"

abstract class Enemy {
    id: String
    position: { x: number, y: number }
    width: number
    height: number
    deleted: boolean


    constructor(x: number, y: number) {
        this.position = { x, y: canvasProps.height - y }
        this.id = UUID.genId()
        this.deleted = false
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

        const deathAnim = new DeathAnim(this.position.x, this.position.y, "enemy")
        gameObjects.nonCollidable.push(deathAnim)

    }

    track() {
        const myIndex = gameObjects.collidable.findIndex(p => p.id === this.id)
        gameObjects.collidable.splice(myIndex, 1)
        trackableObjects.push(this)
    }

    untrack() {
        //@ts-ignore
        gameObjects.collidable.push(this)
        const trackableIndex = trackableObjects.findIndex(p => p.id === this.id)
        trackableObjects.splice(trackableIndex, 1)
    }
}


export default Enemy
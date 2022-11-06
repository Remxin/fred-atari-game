import Enemy from "./Enemy";
import { app, gameObjects, spriteSheet } from "../main";
import ImageMapper from "./ImageMapper";

const CONSTANTS = {
    startVelocity: { y: 2 },
    width: 10,
    height: 30
}

class BirdProjectile extends Enemy {
    graphics: { cords: { x: number, y: number, height: number, width: number}}
    velocity: { y: number }
    class: "bird projectile"
    type: "enemy"
    constructor(x: number, y: number) {
        super(x, y)
        this.position = { x, y}
        this.width = CONSTANTS.width
        this.height = CONSTANTS.height
        this.class = "bird projectile"
        this.type = "enemy"
        this.velocity = CONSTANTS.startVelocity
        this.graphics = { cords: ImageMapper.getBirdProjectileImageCords()}
    }

    update() {
        this.position.y += this.velocity.y
        this.checkCollision()
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)

    }

    checkCollision() {
        if (this.position.y + this.height >= app.canvasProps.height) this.remove()

        for (let collidable of gameObjects.collidable) {
            if (collidable.type === "enemy") return
            if (this.position.y <= collidable.position.y + collidable.height && this.position.y + this.height >= collidable.position.y && this.position.x <= collidable.position.x + collidable.width && this.position.x + this.width >= collidable.position.x) {
                this.remove()
            }
        }
    }

    remove() {
        const myGameIndex = gameObjects.collidable.findIndex(i => i.id === this.id)
        gameObjects.collidable.splice(myGameIndex, 1)
    }
}


export default BirdProjectile
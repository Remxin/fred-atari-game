import { player, app, spriteSheet, gameObjects } from "../main"
import ImageMapper from "./ImageMapper"

const CONSTS = {
    flameH: 60,
    flameW: 50,
    changeAnimBreakpoint: 20
}

class Flame {
    flameDirection: "left" | "right"
    position: { x: number, y: number }
    width: number
    height: number
    graphics: { cords: { x: number, y: number, width: number, height: number}}
    anim: { phase: number, incrementer: number}
    class: "flame"


    constructor() {
        this.flameDirection = player.turnDirection
        this.height = CONSTS.flameH
        this.width = CONSTS.flameW
        const startX = this.flameDirection === "left" ? player.position.x - this.width : player.position.x + player.width
        this.position = { x: startX, y: player.position.y + Math.round(player.height/10) + player.velocity.y }
        this.anim = { phase: 0, incrementer: 0}
        this.class = "flame"
    }

    draw() {
        this.anim.incrementer += 1
        if (this.anim.incrementer >= CONSTS.changeAnimBreakpoint) {
            this.anim.phase >= 2 ? this.anim.phase = 0 : this.anim.phase += 1
            this.anim.incrementer = 0
        }
        this.graphics = { cords: ImageMapper.getFlameImgCords(this.anim.phase, this.flameDirection)}

        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
        this.checkEnemyCollision()
    }

    update() {
        this.flameDirection = player.turnDirection
        const startX = this.flameDirection === "left" ? player.position.x - this.width : player.position.x + player.width
        this.position = { x: startX, y: player.position.y + Math.round(player.height/10) + player.velocity.y }
    }

    checkEnemyCollision() {
        for (let collidableObj of gameObjects.collidable) {
            if (collidableObj.type !== "enemy" || collidableObj.class === "cactus") continue
  
            if (this.position.x + this.width >= collidableObj.position.x && this.position.x <= collidableObj.position.x + collidableObj.width && this.position.y <= collidableObj.position.y + collidableObj.height && this.position.y + this.height >= collidableObj.position.y) {
                collidableObj.remove()
            }
        }

        for (let nonCollidable of gameObjects.nonCollidable) {
            if (nonCollidable.type !== "vase") continue
            if (this.position.x + this.width >= nonCollidable.position.x && this.position.x <= nonCollidable.position.x + nonCollidable.width && this.position.y <= nonCollidable.position.y + nonCollidable.height && this.position.y + this.height >= nonCollidable.position.y) {
                nonCollidable.remove()
            }
        }
    }

    remove() {
        const myGameIndex = gameObjects.playerFriendly.findIndex((o) => o.class === this.class)
        gameObjects.playerFriendly.splice(myGameIndex, 1)
    }

}


export default Flame
import { player, app, gameObjects } from "../main"

const CONSTS = {
    stoneW: 10,
    stoneH: 10,
    stoneVelocity: { x: 32, y: -6},
    minStoneVelocity: { x: 10, y: 18},
    airResistance: { x: 2, y: 2}

}

class Stone {
    width: number
    height: number
    position: { x: number, y: number }
    velocity: { x: number, y: number }
    turnDirection: "left" | "right"
    class: "stone"

    constructor() {
        this.width = CONSTS.stoneW
        this.turnDirection = player.turnDirection
        const startX = this.turnDirection === "left" ? player.position.x - this.width : player.position.x + player.width
        this.height = CONSTS.stoneH
        this.position = { x: startX, y: player.position.y + Math.round(player.height/4) }
        this.velocity = { x: CONSTS.stoneVelocity.x, y: CONSTS.stoneVelocity.y }
        this.class = "stone"
        // this.draw()
    }

    draw() {
        this.checkCollision()
        app.c.fillStyle = "green"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)



        if (this.velocity.x > CONSTS.minStoneVelocity.x * 2) {
            this.velocity.x -= CONSTS.airResistance.x
        }

        if (this.velocity.y < CONSTS.minStoneVelocity.y) {
            this.velocity.y += CONSTS.airResistance.y
        }

        if (this.turnDirection === "right") {
            this.position.x += this.velocity.x
        } else {
            this.position.x -= this.velocity.x 
        }

        if (this.velocity.y > -4) {
            this.position.y += this.velocity.y
        }
    }

    checkCollision() {
        console.log(app.canvasProps.height)
        if (this.height + this.position.y >= app.canvasProps.height) {
            this.remove()
            player.stoneThrown = false
        }

        for (let gameObj of gameObjects.collidable) {
            if (this.position.x + this.width >= gameObj.position.x && this.position.x <= gameObj.position.x + gameObj.width && this.position.y >= gameObj.position.y && this.position.y + this.width <= gameObj.position.y + gameObj.height) {
                this.remove()
                player.stoneThrown = false
            }
        }

        // console.log(gameObjects.playerFriendly);
        
    }

    remove() {
        const stoneIndex = gameObjects.playerFriendly.findIndex(f => f.class === this.class)
        gameObjects.playerFriendly.splice(stoneIndex, 1)
    }

}

export default Stone
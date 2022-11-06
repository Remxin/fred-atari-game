import Enemy from "./Enemy";
import { directionType } from "./Cactus";
import UUID from "../helpers/uuid";
import { app, gameObjects, spriteSheet } from "../main";
import { isJSDocThisTag } from "../../node_modules/typescript/lib/typescript";
import ImageMapper from "./ImageMapper";
import BirdProjectile from "./BirdProjectile";

const CONSTANTS = {
    birdW: 40,
    birdH: 30,
    birdVelocity: { x: 3, y: 5},
    stayTimeout: 50,
    animBreakPoint: 10,
    projectileShotDelay: 200
}

class Bird extends Enemy {
    id: string
    position: { x: number, y: number}
    height: number
    width: number
    abstractPos: { x: number, y: number}
    movement: { isMoving: boolean, direction: "left" | "right", range: { min: number, max: number}, stayTimeout: number}
    graphics: { cords: { x: number, y: number, width: number, height: number}}
    anim: { phase: number, incrementer: number}
    velocity: { x: number, y: number}
    projectile: { shots: boolean, delay: number}
    class: "bird"
    type: "enemy"

    constructor(x: number, y: number, movementMin: number, movementMax: number, shotsProjectiles: boolean = false) {
        super(x, y)
        this.class = "bird"
        this.type = "enemy"
        this.projectile = { shots: shotsProjectiles, delay: CONSTANTS.projectileShotDelay}
        this.width = CONSTANTS.birdW
        this.height = CONSTANTS.birdH
        this.velocity = CONSTANTS.birdVelocity
        this.anim = { phase: 0, incrementer: 0}
        this.abstractPos = { x: 0, y: 0}
        this.movement ={ isMoving: false, direction: "right", range: { min: movementMin, max: movementMax}, stayTimeout: CONSTANTS.stayTimeout}
    }

    update() {
        if (this.movement.direction === 'right' && this.movement.isMoving) {
            this.position.x += this.velocity.x
            this.abstractPos.x += this.velocity.x

            if (this.abstractPos.x >= this.movement.range.max) {
                this.movement.direction = "left"
                this.movement.stayTimeout = CONSTANTS.stayTimeout
            }
        } else if (this.movement.direction === "left" && this.movement.isMoving) {
            this.position.x -= this.velocity.x
            this.abstractPos.x -= this.velocity.x

            if (this.abstractPos.x <= this.movement.range.min) {
                this.movement.direction = "right"
                this.movement.stayTimeout = CONSTANTS.stayTimeout
            }
        }

        if (this.movement.stayTimeout > 0) {
            this.movement.isMoving = false
            this.movement.stayTimeout -= 1
            
        } else {
            this.movement.isMoving = true
        }

        if (this.anim.incrementer >= CONSTANTS.animBreakPoint) {
            this.anim.incrementer = 0
            this.anim.phase  >= 2 ? this.anim.phase = 0 : this.anim.phase += 1
        }

        this.anim.incrementer += 1
      
        if (this.projectile.shots) this.randomlyShotProjectile()
        this.graphics = { cords: ImageMapper.getBirdImageCords(this.movement.isMoving, this.anim.phase, this.movement.direction)}
        app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
    }

    remove() {
        const myIndex = gameObjects.collidable.findIndex((i) => i.id === this.id)
        gameObjects.collidable.splice(myIndex, 1)
    }

    randomlyShotProjectile() {
        if (this.projectile.delay > 0) return this.projectile.delay -= 1
        const rand = Math.round(Math.random()*100)
        if (rand > 5) return

        const projectile = new BirdProjectile(this.position.x + Math.round(this.width / 2), this.position.y + this.height)
        gameObjects.collidable.push(projectile)
        this.projectile.delay = CONSTANTS.projectileShotDelay
    }
}

export default Bird
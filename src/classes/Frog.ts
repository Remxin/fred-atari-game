import Enemy from "./Enemy";
import { app, gameObjects, spriteSheet, canvasProps } from "../main";
import ImageMapper from "./ImageMapper";

const CONSTANTS = {
   velocity: { x: 3, y: 1 },
   stayTimeout: 50,
   animBreakPoint: 10
}

interface FrogInterface {
   id: string
   width: number
   stayTimeout: number
   position: { x: number, y: number }
   startPos: { x: number, y: number }
   movementRange: { min: number, max: number }
   velocity: { x: number, y: number }
   abstractPos: { x: number, y: number }
   type: "enemy"
   class: "frog"
   isFloating: boolean
   movingRight: boolean
   anim: { phase: number, incrementer: number }
   isMoving: boolean
   graphics: { cords: { x: number, y: number, height: number, width: number } }
}
class Frog extends Enemy implements FrogInterface {
   id: string
   movementRange: { min: number; max: number; };
   stayTimeout: number
   velocity: { x: number, y: number }
   type: "enemy";
   class: "frog"
   isFloating: boolean
   abstractPos: { x: number, y: number }
   startPos: { x: number, y: number }
   movingRight: boolean;
   anim: { phase: number, incrementer: number }
   isMoving: boolean
   graphics: { cords: { x: number, y: number, height: number, width: number } }
   visible: boolean


   constructor(x: number, y: number, movementMin: number, movementMax: number) {
      super(x, y)
      this.width = 45
      this.height = 45
      this.position.x -= this.height
      this.startPos = { ...this.position }
      this.type = "enemy"
      this.class = "frog"
      this.velocity = CONSTANTS.velocity
      this.isFloating = true
      this.isMoving = false
      this.stayTimeout = CONSTANTS.stayTimeout
      this.movementRange = { min: movementMin, max: movementMax }
      this.abstractPos = { x: 0, y: 0 }
      this.movingRight = true
      this.isMoving = false
      this.anim = { phase: 0, incrementer: 0 }
      this.visible = true
   }

   update() {
      if (this.position.x + this.width <= -200 || this.position.x >= canvasProps.width + 200) {
         if (this.visible) {
            this.visible = false
            this.track()
         }

         return
      }



      // console.log(this.stayTimeout, this.abstractPos.x)
      if (this.position.y + this.height + this.velocity.y <= app.canvas.height) {
         this.position.y += this.velocity.y
         this.velocity.y += app.gravity
         this.isFloating = true
      } else {
         this.velocity.y = 0
         this.position.y = app.canvas.height - this.height
         this.isFloating = false
      }

      this.checkCollision()
      // force frog to move right
      if (this.abstractPos.x <= this.movementRange.min && this.stayTimeout === 0) {
         this.movingRight = true
         this.isMoving = false
         this.stayTimeout = CONSTANTS.stayTimeout
      }

      // force frog to move left
      if (this.abstractPos.x >= this.movementRange.max && this.stayTimeout === 0) {
         this.movingRight = false
         this.isMoving = false
         this.stayTimeout = CONSTANTS.stayTimeout
      }

      if (this.stayTimeout > 0) {
         // this.isMoving = false
         this.stayTimeout -= 1
      } else {
         this.isMoving = true
      }
      // movement
      if (this.movingRight && this.stayTimeout === 0) {
         this.abstractPos.x += this.velocity.x
         this.position.x += this.velocity.x
      }


      if (!this.movingRight && this.stayTimeout === 0) {
         this.abstractPos.x -= this.velocity.x
         this.position.x -= this.velocity.x
      }

      // kill player on collision
      const player = app.player
      if (this.position.x <= player.position.x + player.width && this.position.x + this.width >= player.position.x && this.position.y <= player.position.y + player.height && this.position.y + this.height >= player.position.y) {
         player.die()
      }

      if (this.isMoving) {
         this.anim.incrementer += 1
      } else {
         this.anim.incrementer += 0.7
      }

      if (this.anim.incrementer >= CONSTANTS.animBreakPoint) {
         this.anim.incrementer = 0
         this.anim.phase += 1
      }


      //   app.c.fillStyle = "orange"
      this.graphics = { cords: ImageMapper.getFrogImageCords(!this.movingRight, this.isMoving, this.anim.phase) }
      //   app.c.fillRect(this.position.x ,this.position.y, this.width, this.height)
      app.c.drawImage(spriteSheet, this.graphics.cords.x, this.graphics.cords.y, this.graphics.cords.width, this.graphics.cords.height, this.position.x, this.position.y, this.width, this.height)
   }

   checkCollision() {
      for (let gameObj of gameObjects.collidable) {
         if (gameObj.type !== "platform") continue
         if (this.position.y + this.height >= gameObj.position.y && this.position.y <= gameObj.position.y + gameObj.height && this.position.x + this.width >= gameObj.position.x && this.position.x <= gameObj.position.x + gameObj.width) {
            this.velocity.y = 0
            this.position.y = gameObj.position.y - this.height
         }

         //      if (this.position.x < gameObj.position.x + gameObj.width && this.position.x + this.width > gameObj.position.x && this.position.y <= gameObj.position.y + gameObj.height  && this.position.y + this.height >= gameObj.position.y) {
         //       this.position.x = gameObj.position.x - this.width               

         //       break
         //   }
      }
   }

}

export default Frog
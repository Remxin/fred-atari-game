import { gameObjects, informationManager, player, renderer } from "../main"
import Frog from "./Frog"
import Cactus from "./Cactus"
import Platform from "./Platform"
import Vase from "./Vase"
import Bird from "./Bird"
import { itemType } from "./items/Item"
import DeathAnim from "./DeathAnim"
import PickableStone from "./PickableStone"
import FragilePlatform from "./FragilePlatform"
import Grass from "./Grass"

let first = true // !DELETE this is only for test purposes
const value = 3200

type breakPointType = {
    abstractionPos: { min: number, max: number }
    reached: boolean
    platforms: (Platform|FragilePlatform)[],
    enemies: (Frog|Cactus|Bird)[],
    neutral: (Vase|DeathAnim|PickableStone|FragilePlatform|Grass)[],
    decorations: Grass[]
    // enemies: 
}

interface RendererInterface {
    playerAbstractionPos: { x: number, y: number}
    breakPoints: breakPointType[],
    currentBreakPoint: number
    currentBreakPointRendered: boolean
}

// ___ Breakpoints ___
// initial
//

class Renderer implements RendererInterface {
    playerAbstractionPos: { x: number; y: number }
    breakPoints: breakPointType[]
    currentBreakPoint: number
    currentBreakPointRendered: boolean

    constructor(x: number, y: number) {
        this.playerAbstractionPos = { x, y } // TODO: this was right
        // this.playerAbstractionPos = { x: 500, y}
        this.currentBreakPoint = 1
        this.currentBreakPointRendered = false
        this.breakPoints = [ 
            {
                abstractionPos: { min: -2000, max: -1000},
                reached: false,
                platforms: [],
                enemies: [],
                neutral: [new Vase(-1000, 55), new Vase(-1050, 55), new Vase(-1200, 55), new Vase(-1250, 55), new Vase(-1300, 55)],
                decorations: []
            },
            // {   
            //     abstractionPos: { min: -1000, max: 500},
            //     reached: false,
            //     platforms: [ new Platform(100, 100, "b", "s", "right"), new Platform(320, 190, "b", "m", "left"), new Platform(570, 250, "b", "s", "left"), new Platform(800, 320, "a", "m", "left"), new Platform(800, 0, "b", "m", "left"), new Platform(1070, 80, "a", "s", "left"), new Platform(1285, 80, "a", "s", "left") ],
            //     enemies: [ new Cactus(-250, 0, "l", ""), new Cactus(-295, 80, "s", "right"), new Cactus(-205, 50, "s", "left"), new Cactus(250, 0, "s", ""), new Cactus(1180, -20, "m", ""), new Cactus(1220, -2, "s", "left")],
            //     neutral: [  new PickableStone(-110, 0), new PickableStone(300, 0), new PickableStone(450, 250), new Vase(620, 0), new PickableStone(910, 355), new PickableStone(910, 55), new PickableStone(1290, 110)],
            //     decorations: [new Grass(-150, 0, "l", false), new Grass(-190, 0, "s", false), new Grass(1010, 0, "s", false)]
            // },
            {
                abstractionPos: { min: -100, max: 200000}, // !FOR TESTS
                // abstractionPos: {min: 500, max: 200000},
                reached: false,
                platforms: [new Platform(1500, 120, "b", "m", "left"), new Platform(1640, 120, "b", 'l', "left"), new Platform(2000, 80, "b", "s", "left"), new FragilePlatform(2105, 80), new Platform(2175, 80, "b", "s", "right"), new Platform(2300, 240, "b", "m", "left"), new FragilePlatform(2450, 240), new Platform(2520, 240, "b", "s", "right"), new Platform(2710, 240, "b", "l", "left"), new Platform(2910, 240, "b", "m", "right"), new Platform(3150, 120, "b", "l", "left"), new Platform(3500, 10, 'b', "s", "right"), new Platform(3475, 65, "a", "m", "left"), new Platform(3500, 105, "b", "s", "left"), new Platform(3500, 165, "b", "s", "right"), new Platform(3465, 220, "a", "m", "left"), new Platform(4050, 50, "b", "s", "right")],
                // platforms: [],
                enemies: [new Frog(1850, 225, -250, 0), new Frog(1700, 0, 0, 300), new Cactus(2620, -10, "m", ""), new Cactus(2660, 70, "m", "left"), new Frog(2410, 0, 0, 200), new Frog(2310, 0, 0, 200), new Frog(2750, 0, 0, 300), new Frog(2800, 300, 0, 250), new Cactus(3100, 0, "l", ""), new Cactus(3370, 0, "m", ""), new Cactus(3410, 50, "s", "left"), new Cactus(3750, 0, "sm", ""), new Frog(3900, 0, 0, 100), new Cactus(4000, -35, "s", "")],
                neutral: [new Vase(1750, 170), new PickableStone(2150, 0), new PickableStone(3000, 295), new PickableStone(3610, 95), new Vase(3610, 0)],
                decorations: [new Grass(1700, 180, "s", false), new Grass(1800, 95, "s", true), new Grass(2200, 140, "l", false), new Grass(3800, 0, "m", false)]
            
            },    
            // {
            //     // abstractionPos: { min: -100, max: 3000}, // !FOR TESTS
            //     abstractionPos: {min: 1700, max: 5000},
            //     reached: false,
            //     platforms: [],
            //     // platforms: [],
            //     enemies: [new Frog(2500, 0, 0, 500)],
            //     neutral: [],
            //     decorations: []
               
            // }
        ]
    }

    updateGameObjects() {

        // console.log(this.playerAbstractionPos, player.position)

        for (let playerFriendlyObj of gameObjects.playerFriendly) {
            playerFriendlyObj.draw()
        }
        
        for (let nonCollidable of gameObjects.nonCollidable) {
            nonCollidable.draw()
            
            if (nonCollidable.type === "item") {
                nonCollidable?.checkIfPlayerPicked()
            }

        }

        for (let gameObj of gameObjects.collidable) {
            if (gameObj.type === "enemy" && gameObj.class !== "cactus") {
                gameObj.update()
            } else {
                gameObj.draw()
            }
        }

        
        this.updateInformations()
        this.checkEnemyCollisions()
    }
    trackRendering() {      
        if (!this.currentBreakPointRendered) {
            this.currentBreakPointRendered = true
            gameObjects.collidable = []
            gameObjects.nonCollidable = []

            // tracking new renderer objects
            for (let i = this.currentBreakPoint; i>= this.currentBreakPoint - 1; i--) {
                if (i < 0) continue

                this.breakPoints[i].reached = true
                this.breakPoints[i].platforms.forEach((platform) => {
                    // platform.position.x -= this.playerAbstractionPos.x - 100
                    gameObjects.collidable.push(platform)
                })
                this.breakPoints[i].enemies.forEach((enemy) => {
                    // enemy.position.x -= this.playerAbstractionPos.x - 100
                    gameObjects.collidable.push(enemy)
                })
    
                this.breakPoints[i].neutral.forEach((neutral) => {
                    // neutral.position.x -= this.playerAbstractionPos.x - 100
                    gameObjects.nonCollidable.push(neutral)
                })

                this.breakPoints[i].decorations.forEach((decoration) => {
                    gameObjects.nonCollidable.push(decoration)
                })
            }
        }
        // update rerendering phase (add new elements, delete previous)
        if (this.playerAbstractionPos.x > this.breakPoints[this.currentBreakPoint].abstractionPos.max) {
            this.currentBreakPoint += 1
            console.log('+1')
            this.breakPoints[this.currentBreakPoint].reached = false
            this.currentBreakPointRendered = false
        }
        
        if (this.playerAbstractionPos.x < this.breakPoints[this.currentBreakPoint].abstractionPos.min) {
            this.currentBreakPoint -= 1
            this.breakPoints[this.currentBreakPoint].reached = false
            this.currentBreakPointRendered = false
        }


        if (first) { // ! THIS IS ONLY FOR TEST PURPOSES
            first = false
     
            // this.currentBreakPoint = 1

            this.playerAbstractionPos.x = value
            gameObjects.collidable.forEach((o) => {
                o.position.x -= value
            })
            gameObjects.nonCollidable.forEach((o) => {
                o.position.x -= value
            })
            gameObjects.playerFriendly.forEach((o) => {
                o.position.x -= value
            })

            console.log(this.currentBreakPoint)
        }

    }

    updateInformations() {
        informationManager.watchAndUpdatePlayerPos(this.playerAbstractionPos.x)
    }

    checkEnemyCollisions() {
        for (let gameObj of gameObjects.collidable) {
            if (gameObj.type === "enemy") {
                if (player.position.x + player.width >= gameObj.position.x && player.position.x <= gameObj.position.x + gameObj.width && player.position.y <= gameObj.position.y + gameObj.height && player.position.y + player.height >= gameObj.position.y) {
                    player.die()
                }
            }
        }
    }
}

export default Renderer
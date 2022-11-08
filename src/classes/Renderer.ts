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

type breakPointType = {
    abstractionPos: { min: number, max: number }
    reached: boolean
    platforms: (Platform|FragilePlatform)[],
    enemies: (Frog|Cactus|Bird)[],
    neutral: (Vase|DeathAnim|PickableStone|FragilePlatform|Grass)[],
    decorations: []
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
        this.playerAbstractionPos = { x, y }
        this.currentBreakPoint = 0
        this.currentBreakPointRendered = false
        this.breakPoints = [ // TODO: smaller range breakpoints
            {   
                abstractionPos: { min: -1000, max: 2000},
                reached: false,
                platforms: [ new Platform(250, 140, "b", "s", "right"), new Platform(420, 280, "b", "lg", "left"), new FragilePlatform(500, 200) ],
                enemies: [ new Frog(250, 100, 0, 300), new Cactus(-100, 160, "l", ""), new Bird(300, 440, 0, 300, true)],
                neutral: [ new Vase(400, 56), new DeathAnim(player.position.x, player.position.y, "player"), new PickableStone(550, 30), new Grass(0, 60, "l", false)],
                decorations: []
            },
            {
                abstractionPos: {min: 2000, max: 3000},
                reached: false,
                platforms: [],
                enemies: [],
                neutral: [],
                decorations: []
                
            }
        ]
    }

    updateGameObjects() {

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
            gameObjects.collidable = []
            gameObjects.nonCollidable = []


            this.currentBreakPointRendered = true
            this.breakPoints[this.currentBreakPoint].platforms.forEach((platform) => {
                gameObjects.collidable.push(platform)
            })
            this.breakPoints[this.currentBreakPoint].enemies.forEach((enemy) => {
                gameObjects.collidable.push(enemy)
            })

            this.breakPoints[this.currentBreakPoint].neutral.forEach((neutral) => {
                gameObjects.nonCollidable.push(neutral)
            })
        }
        // update rerendering phase (add new elements, delete previous)
        if (this.playerAbstractionPos.x > this.breakPoints[this.currentBreakPoint].abstractionPos.max) {
            this.breakPoints[this.currentBreakPoint].reached = false
            this.currentBreakPoint += 1
        }
        
        if (this.playerAbstractionPos.x < this.breakPoints[this.currentBreakPoint].abstractionPos.min) {
            this.breakPoints[this.currentBreakPoint].reached = false
            this.currentBreakPoint -= 1
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
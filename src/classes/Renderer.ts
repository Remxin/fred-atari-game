import { app, gameObjects, informationManager } from "../main"
import Platform from "./Platform"

type breakPointType = {
    abstractionPos: { min: number, max: number }
    reached: boolean
    platforms: Platform[],
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
                abstractionPos: { min: -200, max: 2000},
                reached: false,
                // platforms: [ new Platform(200, 980), new Platform(250, 950), new Platform(300, 870) ]
                platforms: [ new Platform(250, 100), new Platform(320, 200) ]
            },
            {
                abstractionPos: {min: 2000, max: 3000},
                reached: false,
                platforms: []
            }
        ]
    }

    updateGameObjects() {
        for (let platform of gameObjects.platforms) {
            platform.draw()
        }
        
        this.updateInformations()
    }
    trackRendering() {        

        if (!this.currentBreakPointRendered) {
            // TODO: delte current platforms and enemies
            gameObjects.platforms = []
            this.currentBreakPointRendered = true
            this.breakPoints[this.currentBreakPoint].platforms.forEach((platform) => {
                gameObjects.platforms.push(platform)
            })
        }
        // update rerendering phase (add new elements, delete previous)
        if (this.playerAbstractionPos.x > this.breakPoints[this.currentBreakPoint].abstractionPos.max) {
            this.currentBreakPoint += 1
        }

        if (this.playerAbstractionPos.x < this.breakPoints[this.currentBreakPoint].abstractionPos.min) {
            console.log(this.currentBreakPoint);
            
            this.currentBreakPoint -= 1
        }
    }

    updateInformations() {
        informationManager.watchAndUpdatePlayerPos(this.playerAbstractionPos.x)
    }
}

export default Renderer
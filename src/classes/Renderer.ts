import { canvasProps, gameObjects, informationManager, player, renderer, trackableObjects } from "../main"
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

let first = false // !DELETE this is only for test purposes
const value = 6600 // ! DELETE
const startPos = { x: 100, y: 100 }
export const winBreakPoint = 6450

type breakPointType = {
    abstractionPos: { min: number, max: number }
    reached: boolean
    platforms: (Platform | FragilePlatform)[],
    enemies: (Frog | Cactus | Bird)[],
    neutral: (Vase | DeathAnim | PickableStone | FragilePlatform | Grass)[],
    decorations: Grass[]
    // enemies: 
}

interface RendererInterface {
    playerAbstractionPos: { x: number, y: number }
    breakPoints: breakPointType[],
    currentBreakPoint: number
    currentBreakPointRendered: boolean
    descroll: { step: number }
}



class Renderer implements RendererInterface {
    playerAbstractionPos: { x: number; y: number }
    breakPoints: breakPointType[]
    currentBreakPoint: number
    currentBreakPointRendered: boolean
    descroll: { step: number }

    constructor(x: number, y: number) {
        this.playerAbstractionPos = { x, y }
        // this.playerAbstractionPos = { x: 500, y}
        this.descroll = { step: 0 }
        this.currentBreakPoint = 0
        this.currentBreakPointRendered = false
        this.breakPoints = [
            {
                abstractionPos: { min: -10000, max: 200000 }, // TODO: set proper points, to describe player position
                reached: false,
                platforms: [
                    /* secret */ new Platform(-1450, 0, "b", "s", "left"), new Platform(-1450, 60, "b", "s", "right"), new Platform(-1450, 120, "b", "s", "left"), new Platform(-1450, 180, "b", "s", "right"), new Platform(-1450, 240, "b", "s", "left"),
                    /* phase1 */ new Platform(100, 100, "b", "s", "right"), new Platform(320, 190, "b", "m", "left"), new Platform(570, 250, "b", "s", "left"), new Platform(800, 320, "a", "m", "left"), new Platform(800, 0, "b", "m", "left"), new Platform(1070, 80, "a", "s", "left"), new Platform(1285, 80, "a", "s", "left"),
                    /* phase2, cd... */ new Platform(1500, 120, "b", "m", "left"), new Platform(1640, 120, "b", 'l', "left"), new Platform(2000, 80, "b", "s", "left"), new FragilePlatform(2105, 80), new Platform(2175, 80, "b", "s", "right"), new Platform(2300, 240, "b", "m", "left"), new FragilePlatform(2450, 240), new Platform(2520, 240, "b", "s", "right"), new Platform(2710, 240, "b", "l", "left"), new Platform(2910, 240, "b", "m", "right"), new Platform(3150, 120, "b", "l", "left"), new Platform(3500, 10, 'b', "s", "right"), new Platform(3475, 65, "a", "m", "left"), new Platform(3500, 105, "b", "s", "left"), new Platform(3500, 165, "b", "s", "right"), new Platform(3465, 220, "a", "m", "left"),
                    new Platform(4045, 60, "b", "s", "right"), new Platform(4220, 190, "a", "m", "left"), new Platform(4270, 250, "a", "s", "left"), new Platform(4520, 260, "a", "m", "left"), new Platform(4670, 260, "a", "m", "left"), new Platform(4470, 80, "b", "lg", "left"), new FragilePlatform(4690, 80), new Platform(4750, 70, "b", "l", "right"), new Platform(5050, 200, "b", "m", "right"),
                    new Platform(5350, 280, "a", "m", "left"), new Platform(5500, 80, "b", "m", "left"), new Platform(5750, 140, "a", "m", "left"), new Platform(6000, 240, "b", "m", "left"), new Platform(6150, 50, "a", "m", "left"), new Platform(6300, 50, "a", "m", "left"), new Platform(6300, 200, "a", "s", 'left'), new Platform(6370, 250, "a", "s", "left"), new Platform(6550, 100, "b", "lg", "left"), new Platform(6770, 100, "b", "lg", "right"), new Platform(7000, 100, "b", "m", "left"),
                    new Platform(7180, 60, "b", "s", "right"), new Platform(7180, 120, "b", "s", "left"), new Platform(7180, 180, "b", "s", "right"), new Platform(7180, 240, "b", "s", "left"), new Platform(7180, 300, "b", "s", "right"), new Platform(7180, 360, "b", "s", "left")
                ],
                enemies: [
                    new Cactus(-250, 0, "l", ""), new Cactus(-295, 80, "s", "right"), new Cactus(-205, 50, "s", "left"), new Cactus(250, 0, "s", ""), new Cactus(1180, -40, "m", ""), new Cactus(1220, -12, "s", "left"),
                    new Frog(1850, 225, -250, 0), new Frog(1700, 0, 0, 300), new Cactus(2620, -10, "m", ""), new Cactus(2660, 70, "m", "left"), new Frog(2410, 0, 0, 200), new Frog(2310, 0, 0, 200), new Frog(2750, 0, 0, 300), new Frog(2800, 300, 0, 250), new Cactus(3100, 0, "l", ""), new Cactus(3370, 0, "m", ""), new Cactus(3410, 50, "s", "left"), new Cactus(3750, 0, "sm", ""), new Frog(3900, 0, 0, 100), new Cactus(4000, -35, "s", ""), new Cactus(4150, 0, "s", "right"), new Cactus(4190, -30, "m", ""),
                    new Frog(4240, 200, 0, 20), new Bird(3670, 400, 0, 400, false), new Frog(4570, 300, 0, 200), new Frog(4570, 100, 0, 400), new Bird(4520, 10, 0, 200, false), new Bird(4720, 10, 0, 300), new Bird(5050, 10, 0, 100, false), new Frog(5150, 250, 0, 0), new Cactus(5200, 0, "m", ""), new Cactus(5240, 50, "m", "left"),
                    new Frog(5300, 0, 0, 0), new Cactus(6000, 0, "s", ""), new Bird(6200, 100, 0, 200, false), new Cactus(6550, 0, "sm", ""), new Cactus(6600, 0, "sm", ""), new Cactus(6650, 0, "sm", ""), new Cactus(6700, 0, "sm", ""), new Cactus(6750, 0, "sm", ""), new Cactus(6800, 0, "sm", ""), new Cactus(6850, 0, "sm", ""), new Cactus(6900, 0, "sm", ""), new Cactus(6950, 0, "sm", ""), new Cactus(7000, 0, "sm", ""), new Cactus(7050, 0, "sm", ""), new Cactus(7100, 0, "sm", ""), new Bird(6800, 500, 0, 300, true), new Bird(6500, 600, 0, 200, true), new Bird(6600, 450, 0, 400), new Bird(6500, 400, 0, 150, true), new Bird(6800, 550, 0, 100, true), new Bird(6750, 600, -400, 200, true), new Bird(7000, 650, -400, 0, true)
                ],
                neutral: [
                    /* secret */ new Vase(-1000, 0), new Vase(-1050, 0), new Vase(-1100, 0), new Vase(-1150, 0), new Vase(-1200, 0), new Vase(-1250, 0),
                    new PickableStone(-110, 0), new PickableStone(300, 0), new PickableStone(450, 250), new Vase(620, 0), new PickableStone(910, 355), new PickableStone(910, 55), new PickableStone(1290, 110),
                    new Vase(1750, 170), new PickableStone(2150, 0), new PickableStone(3000, 295), new PickableStone(3610, 95), new Vase(3610, 0),
                    new Vase(4240, 0), new PickableStone(4340, 0), new Vase(3420, 0), new PickableStone(4920, 130), new PickableStone(5000, 0), new PickableStone(5060, 255), new PickableStone(5160, 255),
                    new PickableStone(5310, 0), new PickableStone(5410, 0), new Vase(5410, 310), new PickableStone(5800, 175), new Vase(5900, 0), new PickableStone(6050, 0), new PickableStone(6100, 295), new PickableStone(6300, 230), new PickableStone(6380, 280), new PickableStone(6600, 155), new PickableStone(6750, 155), new PickableStone(6900, 155), new PickableStone(7050, 155)
                ],
                decorations: [
                    new Grass(-150, 0, "l", false), new Grass(-190, 0, "s", false), new Grass(1010, 0, "s", false),
                    new Grass(1700, 180, "s", false), new Grass(1800, 95, "s", true), new Grass(2200, 140, "l", false), new Grass(3800, 0, "m", false),
                    new Grass(4290, 0, "l", false), new Grass(4620, 140, "s", false), new Grass(4670, 140, "s", false), new Grass(4950, 0, "l", false),
                    new Grass(5460, 320, "s", false), new Grass(5600, 140, "s", false), new Grass(5850, 180, "s", false), new Grass(6020, 215, "s", true), new Grass(6430, 290, "s", false), new Grass(6650, 160, "s", false), new Grass(6850, 160, "l", false), new Grass(7100, 160, "s", false)
                ]

                // ! FOR TESTS
                // platforms: [new Platform(100, 100, "b", "s", "left"), new Platform(200, 100, "b", "s", "left")],
                // enemies: [],
                // neutral: [new Vase(1500, 0)],
                // decorations: []
            },
            // another levels

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

        this.trackInvisible()
        this.updateInformations()
    }
    trackRendering() {
        if (!informationManager.winTimer.started && this.playerAbstractionPos.x >= winBreakPoint) {
            informationManager.startWinTimer()
        }

        // watch stones
        for (let neutral of gameObjects.nonCollidable) {
            if (neutral.type == "pickable stone") {
                if (neutral.position.x <= player.position.x + player.width && neutral.position.x + neutral.width >= player.position.x && neutral.position.y + neutral.height >= player.position.y && neutral.position.y <= player.position.y + player.height) {
                    neutral.use()
                }
            }
        }


        if (!this.currentBreakPointRendered) {
            this.currentBreakPointRendered = true
            gameObjects.collidable = []
            gameObjects.nonCollidable = []

            // tracking new renderer objects
            for (let i = this.currentBreakPoint; i >= this.currentBreakPoint - 1; i--) {
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
            this.playerAbstractionPos.x = value

            for (let breakPointData of this.breakPoints) {
                breakPointData.decorations.forEach(dec => {
                    dec.position.x -= value
                })
                breakPointData.enemies.forEach(enemy => {
                    enemy.position.x -= value
                })

                breakPointData.neutral.forEach(neutral => {
                    neutral.position.x -= value
                })

                breakPointData.platforms.forEach(platform => {
                    platform.position.x -= value
                })


            }

        }

    }

    updateInformations() {
        informationManager.watchAndUpdatePlayerPos(this.playerAbstractionPos.x)
    }


    descrollAll() {
        return new Promise((resolve, reject) => {
            this.playerAbstractionPos = { ...startPos }
            for (let breakPointData of this.breakPoints) {
                for (let dec of breakPointData.decorations) {
                    dec.position = { ...dec.startPos }
                }
                for (let enemy of breakPointData.enemies) {
                    enemy.position = { ...enemy.startPos }
                }
                for (let neutral of breakPointData.neutral) {
                    neutral.position = { ...neutral.startPos }

                }
                for (let platform of breakPointData.platforms) {
                    platform.position = { ...platform.startPos }
                }


            }

            for (let trackable of trackableObjects) {
                trackable.position = { ...trackable.startPos }
            }
            setTimeout(() => {
                this.trackInvisible(true)
            }, 0)
            resolve(true)
        })


    }

    trackInvisible(force = false) {
        if (!force) {
            if (this.descroll.step < 30) return this.descroll.step += 1
        }

        // applying to invisible there //! tests
        for (let breakPointData of this.breakPoints) {
            for (let dec of breakPointData.decorations) {
                if (dec.position.x + dec.width < -300 && dec.position.x > canvasProps.width + 300) {
                    dec.track()
                    dec.visible = false
                }
            }
            for (let enemy of breakPointData.enemies) {
                if (enemy.position.x + enemy.width < -300 && enemy.position.x > canvasProps.width + 300) {
                    enemy?.track()
                    enemy.visible = false
                }
            }
            for (let neutral of breakPointData.neutral) {
                if (neutral.position.x + neutral.width < -300 && neutral.position.x > canvasProps.width + 300) {
                    //@ts-ignore
                    neutral?.track()
                    //@ts-ignore
                    neutral?.visible = false
                }

            }
            for (let platform of breakPointData.platforms) {
                if (platform.position.x + platform.width < -300 && platform.position.x > canvasProps.width + 300) {
                    platform.track()
                    platform.visible = false
                }
            }


        }

        for (let trackable of trackableObjects) {
            if (trackable.position.x + trackable.width >= -300 && trackable.position.x <= canvasProps.width + 300) {
                trackable.untrack()
                trackable.visible = true
            }
        }
        this.descroll.step = 0
    }
}

export default Renderer
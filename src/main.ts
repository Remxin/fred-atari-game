// ____ FEATURES ____
import { applyMobile, mobileCheck } from "./features/applyMobile"

// ____ CLASSES ____
import Player from "./classes/Player"
import Platform from "./classes/Platform"
import AudioManager from "./classes/AudioManager"
import Renderer from "./classes/Renderer"
import Frog from "./classes/Frog"
import InformationManager from "./classes/InformationManager"
import Cactus from "./classes/Cactus"
import Stone from "./classes/Stone"
import Vase from "./classes/Vase"
import Item from "./classes/items/Item"
import Flame from "./classes/Flame"
import BagOxygen from "./classes/bagItems/BagOxygen"
import Bird from "./classes/Bird"
import BirdProjectile from "./classes/BirdProjectile"
import BagHat from "./classes/bagItems/BagHat"
import DeathAnim from "./classes/DeathAnim"
import PickableStone from "./classes/PickableStone"
import FragilePlatform from "./classes/FragilePlatform"
import Grass from "./classes/Grass"
import Enemy from "./classes/Enemy"
import BagShield from "./classes/bagItems/BagShield"


const CONSTANTS = {
    gameStarted: false,
    tutorialShown: false,
    loadingScreen: document.getElementById("start-screen") as HTMLDivElement,
    hotkeysScreen: document.getElementById("hotkeys") as HTMLDivElement,
}

const canvas = document.getElementById("main") as HTMLCanvasElement
const audioManager = new AudioManager()
const playerStartPos = { x: 100, y: 100 }



export const canvasProps = {
    // height: window.innerWidth < 769 ? window.innerHeight * 1.4 : window.innerHeight - 250,
    // width: window.innerWidth < 769 ? window.innerWidth * 2.4 : window.innerWidth,
    height: 640,
    width: 768,
    // height: 768,
    // width: 768,
    rerenderStep: 20 // higher = better performance
}

export const player = new Player(playerStartPos.x, playerStartPos.y, canvasProps.width)
export const informationManager = new InformationManager()
export const renderer = new Renderer(playerStartPos.x, playerStartPos.y)

export const app = {
    canvas,
    c: canvas.getContext("2d"),
    canvasProps,
    gravity: 2,
    audioManager,
    renderer,
    informationManager,
    player
}

export const pressedKeys = {
    up: false,
    down: false,
    left: false,
    right: false,
    f: false,
    e: false
}

export const gameObjects = {
    collidable: [] as (Platform | Frog | Cactus | Bird | BirdProjectile | FragilePlatform)[],
    playerFriendly: [] as (Stone | Flame)[],
    nonCollidable: [] as (Vase | Item | DeathAnim | PickableStone | FragilePlatform | Grass)[]
}

export const trackableObjects = [] as any[]

export const spriteSheet = new Image()
spriteSheet.src = "img/spritesheet.png"

export const brightSpriteSheet = new Image()
brightSpriteSheet.src = "img/spritesheet_bright.png"

function loadSprite(sprite: HTMLImageElement) {
    return new Promise((resolve, reject) => {
        if (sprite.complete) resolve(true)
        sprite.onload = () => {

            resolve(true)
        }
    })
}


async function startGame() {
    await loadSprite(spriteSheet)
    await loadSprite(brightSpriteSheet)
    const isMobile = await applyMobile()
    if (isMobile) CONSTANTS.hotkeysScreen.style.display = "none"
    // resize canvas
    app.canvas.width = app.canvasProps.width
    app.canvas.height = app.canvasProps.height - 6

    // play background music
    app.audioManager.play()

    // create player
    player.draw()

    // show bottom data
    informationManager.addScorePoints(0)
    informationManager.updateOxygen(0)
    informationManager.updateStones(11)
    informationManager.updateLives(5)




    // animate game
    function startAnim() {
        app.c.clearRect(0, 0, app.canvas.width, app.canvas.height)
        app.c.fillStyle = "black"
        app.c.fillRect(0, 0, canvasProps.width, canvasProps.height)



        // initialize renderer (it will automatically render new objects and delete unnecessary ones)
        renderer.trackRendering()
        renderer.updateGameObjects()
        player.update()


        setTimeout(() => {
            requestAnimationFrame(startAnim)
        }, app.canvasProps.rerenderStep)
    }
    startAnim()

    // listen to keys pressed
    window.onkeydown = (e) => recognizePressedKeys(e)
    window.onkeyup = (e) => unbindPressedKeys(e)
}

function recognizePressedKeys(e: KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "d") {
        pressedKeys.right = true
    }

    if (e.key === "ArrowLeft" || e.key === "a") {
        pressedKeys.left = true
    }

    if (e.key === "ArrowUp" || e.key === "w") {
        pressedKeys.up = true
    }

    if (e.key === "f") {
        pressedKeys.f = true
    }

    if (e.key === "e") {
        pressedKeys.e = true
    }
}

function unbindPressedKeys(e: KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "d") {
        pressedKeys.right = false
    }

    if (e.key === "ArrowLeft" || e.key === "a") {
        pressedKeys.left = false
    }


    if (e.key === "ArrowUp" || e.key === "w") {
        pressedKeys.up = false
    }

    if (e.key === "f") {
        pressedKeys.f = false
    }

    if (e.key === "e") {
        pressedKeys.e = false
    }
}


if (!CONSTANTS.gameStarted) {
    const isMobile = mobileCheck()

    if (!isMobile) {
        const information = document.createElement("p")
        information.innerText = "Press SPACEBAR to start game"
        CONSTANTS.loadingScreen.appendChild(information)

        document.onkeydown = async (e) => {
            if (e.key === " ") {
                // console.log(e.key, e.key === " ")
                CONSTANTS.gameStarted = true
                CONSTANTS.loadingScreen.style.display = "none"

                document.onkeydown = () => {
                    CONSTANTS.tutorialShown = false
                    CONSTANTS.hotkeysScreen.style.display = "none"
                }
                startGame()
            }
        }
    } else {
        const information = document.createElement("button")
        information.innerText = "Click here to start!"
        information.classList.add("mobile-start-game")
        information.onpointerdown = () => {
            console.log('aaa')
            CONSTANTS.gameStarted = true
            CONSTANTS.loadingScreen.style.display = "none"
            CONSTANTS.tutorialShown = false
            CONSTANTS.hotkeysScreen.style.display = "none"
            startGame()
        }

        information.onpointerenter = () => {
            console.log('aaa');

        }


        console.log(information)
        CONSTANTS.loadingScreen.appendChild(information)
    }
}

window.oncontextmenu = () => false
document.oncontextmenu = () => false

window.onpointerdown = () => false
document.onpointerdown = () => false

// ! THIS IS FOR TESTS
// CONSTANTS.loadingScreen.style.display = "none"
// CONSTANTS.hotkeysScreen.style.display = "none"
// startGame()









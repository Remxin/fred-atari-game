import Player from "./classes/Player"
import Platform from "./classes/Platform"
import AudioManager from "./classes/AudioManager"
import Renderer from "./classes/Renderer"
import Frog from "./classes/Frog"
import InformationManager from "./classes/InformationManager"
import Cactus from "./classes/Cactus"
import Stone from "./classes/Stone"
import BagStoneStack from "./classes/bagItems/BagStoneStack"
import Vase from "./classes/Vase"
// import StoneStack from "./classes/items/StoneStack"
import Item from "./classes/items/Item"
import Flame from "./classes/Flame"
import BagOxygen from "./classes/bagItems/BagOxygen"
import Bird from "./classes/Bird"
import BirdProjectile from "./classes/BirdProjectile"
import BagShield from "./classes/bagItems/BagShield"
import BagHat from "./classes/bagItems/BagHat"
import DeathAnim from "./classes/DeathAnim"
import PickableStone from "./classes/PickableStone"
import FragilePlatform from "./classes/FragilePlatform"
import Grass from "./classes/Grass"

const canvas = document.getElementById("main") as HTMLCanvasElement
const audioManager = new AudioManager()
const playerStartPos = { x: 100, y: 100 }

export const player = new Player(playerStartPos.x, playerStartPos.y)
export const canvasProps = {
    width: window.innerWidth - 5,
    height: window.innerHeight - 250,
    rerenderStep: 20 // higher = better performance
}
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
    collidable: [] as (Platform|Frog|Cactus|Bird|BirdProjectile|FragilePlatform)[],
    playerFriendly: [] as (Stone|Flame)[],
    nonCollidable: [] as (Vase | Item | DeathAnim | PickableStone|FragilePlatform|Grass)[]
}

export const spriteSheet = new Image()
spriteSheet.src = "../img/spritesheet.png"

export const brightSpriteSheet = new Image()
brightSpriteSheet.src = "../img/spritesheet_bright.png"

function loadSprite(sprite: HTMLImageElement) {
    return new Promise((resolve, reject) => {
        sprite.onload = () => {
            resolve(true)
        }
    })
}


async function startGame() {
    await loadSprite(spriteSheet)
    await loadSprite(brightSpriteSheet)
    // resize canvas
    app.canvas.width = app.canvasProps.width
    app.canvas.height = app.canvasProps.height - 6

    // play background music
    // app.audioManager.play()

    // create player
    player.draw()

    // show bottom data
    informationManager.addScorePoints(0)
    informationManager.updateOxygen(0)
    informationManager.updateStones(11)
    informationManager.updateLives(5)
    // informationManager.resetItems()

    // ! DELETE THIS IS ONLY FOR TESTS
    // new BagOxygen()
    // new BagHat()
   
    
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
    if (e.key === "ArrowRight"|| e.key === "d") {
        pressedKeys.right = false
    }

    if (e.key === "ArrowLeft"|| e.key === "a") {
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



startGame()



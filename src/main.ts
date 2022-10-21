import Player from "./classes/Player"
import Platform from "./classes/Platform"
import AudioManager from "./classes/AudioManager"
import Renderer from "./classes/Renderer"
import { resolveTypeReferenceDirective } from "../node_modules/typescript/lib/typescript"

const canvas = document.getElementById("main") as HTMLCanvasElement
const audioManager = new AudioManager()
const playerStartPos = { x: 100, y: 100 }
const renderer = new Renderer(playerStartPos.x, playerStartPos.y)

export const app = {
    canvas,
    c: canvas.getContext("2d"),
    canvasProps: {
        width: window.innerWidth - 5,
        height: window.innerHeight,
        rerenderStep: 20 // higher = better performance
    },
    gravity: 3,
    audioManager,
    renderer
}

export const pressedKeys = {
    up: false,
    down: false,
    left: false,
    right: false
}

export const gameObjects = {
    platforms: [] as Platform[]
}


function startGame() {
    // resize canvas
    app.canvas.width = app.canvasProps.width
    app.canvas.height = app.canvasProps.height - 6

    // play background music
    // app.audioManager.play()

    // create player
    const player = new Player(playerStartPos.x, playerStartPos.y)
    player.draw()
    
    // animate game
    function startAnim() {
        app.c.clearRect(0, 0, app.canvas.width, app.canvas.height)
        player.update()

        // initialize renderer (it will automatically render new objects and delte unnecessary ones)
        renderer.trackRendering()
        renderer.updateGameObjects()
        
        
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
}



startGame()



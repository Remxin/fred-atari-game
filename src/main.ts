import Player from "./classes/Player"
import Platform from "./classes/Platform"
const canvas = document.getElementById("main") as HTMLCanvasElement

export const app = {
    canvas,
    c: canvas.getContext("2d"),
    canvasProps: {
        width: window.innerWidth - 5,
        height: window.innerHeight,
        rerenderStep: 30 // higher = better performance
    },
    gravity: 2,
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

    // create player
    const player = new Player()
    const platform = new Platform(200, 950)

    gameObjects.platforms.push(platform)

    player.draw()
    
    // animate game
    function startAnim() {
        app.c.clearRect(0, 0, app.canvas.width, app.canvas.height)
        platform.draw()
        player.update()
        
        
        setTimeout(() => {
            requestAnimationFrame(startAnim)
            // console.log("render leci");
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



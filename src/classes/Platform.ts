import { app } from "../main"

interface PlatformInterface  {
    position: { x: number, y: number}
    height: number
    width: number
}

class Platform implements PlatformInterface {
    position: {x: number, y: number}
    width: number
    height: number

    constructor(x: number, y:number) {
        this.position = {
            x,
            y
        }
        this.width = 200
        this.height = 20
    }

    draw() {
        app.c.fillStyle = "blue"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export default Platform
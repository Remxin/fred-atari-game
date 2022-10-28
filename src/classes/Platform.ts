import { app, canvasProps } from "../main"

interface PlatformInterface  {
    position: { x: number, y: number}
    height: number
    width: number
    type: "platform"
    class: "platform"
}

class Platform implements PlatformInterface {
    position: {x: number, y: number}
    width: number
    height: number
    type: "platform"
    class: "platform"

    constructor(x: number, y:number) {
        this.position = {
            x,
            y: canvasProps.height - y
        }
        this.width = 200
        this.height = 20
        this.type = "platform"
        this.class = "platform"
    }

    draw() {
        app.c.fillStyle = "blue"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

export default Platform
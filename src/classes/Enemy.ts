import { app, canvasProps } from "../main"

abstract class Enemy {
    position: { x: number, y: number}
    width: number
    height: number

    constructor(x: number, y: number) {
        // console.log();
        
        this.position = { x, y: canvasProps.height - y }
    }

    draw() {
        app.c.fillStyle = "orange"
        app.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

console.log(typeof Enemy)

export default Enemy
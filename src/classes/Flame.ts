import { player } from "../main"

class Flame {
    flameDirection: "left" | "right"
    position: { x: number, y: number }


    constructor() {
        this.flameDirection = player.turnDirection
        // this.position = {}
    }

}


export default Flame
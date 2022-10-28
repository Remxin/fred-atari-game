import Enemy from "./Enemy";

const CONSTANTS = {
    fragmentHeight: 20
}

type sizeType = "sm" | "s"| "m" | "l"
interface CactusInterface {
    type: "enemy"
    class: "cactus"
    size: sizeType
    position: { x: number, y: number }
    height: number,
    width: number
}



class Cactus extends Enemy implements CactusInterface {
    type: "enemy"
    class: "cactus"
    size: sizeType;
    height: number
    width: number

    constructor(x: number, y: number, size: sizeType) {
        super(x, y)
        this.type = "enemy"
        this.class = "cactus"
        this.size = size
        this.assignSize()
    }

    assignSize() {
        this.width = 20
        switch(this.size) {
            case "sm": 
                this.height = CONSTANTS.fragmentHeight
                break
            case "s":
                this.height = CONSTANTS.fragmentHeight * 2
                break
            case "m":
                this.height = CONSTANTS.fragmentHeight * 3
                break
            case "l":
                this.height = CONSTANTS.fragmentHeight * 4
                break
        }

    }

}

export default Cactus
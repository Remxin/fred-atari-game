import { spriteSheet } from "../main"
import { platformType, platformLenght, plarformTurnDirection } from "./Platform"

export type keyType = "0" | '1' | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "stone" | "life" | "item placeholder" | "bag stone stack" | "bag hat" | "bag shield" | "bag oxygen"

class ImageMapper {
    // static spriteSheet = spriteSheet
    static imageMap = {
        "0": "../../img/numbers/0.png",
        "1": "../../img/numbers/1.png",
        "2": "../../img/numbers/2.png",
        "3": "../../img/numbers/3.png",
        "4": "../../img/numbers/4.png",
        "5": "../../img/numbers/5.png",
        "6": "../../img/numbers/6.png",
        "7": "../../img/numbers/7.png",
        "8": "../../img/numbers/8.png",
        "9": "../../img/numbers/9.png",
        "stone": "../../img/stone.gif",
        "life": "../../img/fred-life.png",
        "item placeholder": "../../img/item-placeholder.png",
        "bag stone stack": "../../img/stone-stack.png",
        "bag hat": "../../img/hat.png",
        "bag shield": "../../img/shield.png",
        "bag oxygen": "../../img/oxygen-game.png",
    }

    static getImage = (key: keyType) => {
      return this.imageMap[key]
    }

    static getPlatformImageCords = (type: platformType, len: platformLenght, turnDirection: plarformTurnDirection) => {
      let platformSpritePos = { x: 0, y: 758 } // 809
      let platformSize = { width: 140, height: 51 }

      if (type === "a") { // _____ A _____
        if (turnDirection === "right") throw new Error("Platform A can have only left direction")
        if (len === "s") {
          platformSpritePos.x = 0
          platformSize = { width: 140, height: 51} 
        } else if (len === "m") {
          platformSpritePos.x = 156
          platformSize = { width: 205, height: 60} // 361 / 818
        } else throw new Error("Plarform A max size is M")



      } else if (type === "b") { // _____ B _____
        if (len === "s") {
          if (turnDirection === "left") {
            platformSpritePos.x = 1103
            platformSize = { width: 102, height: 80} // 1205
          } else {
            platformSpritePos.x = 1226
            platformSize = { width: 102, height: 80} //1321
          }

        } else if (len === "m") {
          platformSpritePos.x = 381
          platformSize = { width: 171, height: 80} // 552 838
        } else if (len === "l") {
          platformSpritePos.x = 572
          platformSize = { width: 250, height: 80 } // 822 838
        } else if (len === "lg") {
          platformSpritePos.x = 847
          platformSize = { width: 236, height: 80} // 1083
        }
      }
      

      return {...platformSpritePos, ...platformSize}

    }

    static getPlayerImageCords = () => {

    }
}

export default ImageMapper
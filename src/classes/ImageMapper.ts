import { spriteSheet } from "../main"
import { platformType, platformLenght, plarformTurnDirection } from "./Platform"
import { itemType } from "./items/Item"

export type keyType = "0" | '1' | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "stone" | "life" | "item placeholder" | "bag stone stack" | "bag hat" | "bag shield" | "bag oxygen"


const CONSTANTS = {
  player: {
    jumpingAnimHop: 10,
    movementAnimHop: 8
  }
}

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

    static getPlayerImageCords = (moving: boolean, animJumpPhase: number, animMovePhase: number,  floating: boolean, turnDirection: "left" | "right" ) => {
      let returnCords = { x: 2, y: 0, height: 129, width: 70}
      if (floating) { // jumped
        if (turnDirection === "right") {
          if (animJumpPhase < CONSTANTS.player.jumpingAnimHop)returnCords.x = 802
          else returnCords.x = 713

        } else {

          if (animJumpPhase < CONSTANTS.player.jumpingAnimHop) returnCords.x = 976
          else returnCords.x = 889
        }

      } else { // not jumped
        if (!moving) { // not moving
          if (turnDirection === "right") {
            returnCords.x = 2
          } else {
            returnCords.x = 357
          }
        } else {
          if (turnDirection === "right") {
            if (animMovePhase <= CONSTANTS.player.movementAnimHop) {
              returnCords.x = 91
            } else if (animMovePhase <= CONSTANTS.player.movementAnimHop * 2) {
              returnCords.x = 268
            } else if (animMovePhase <= CONSTANTS.player.movementAnimHop * 3) {
              returnCords.x = 180
            }
          } else { // left and moving - not jumping
            if (animMovePhase <= CONSTANTS.player.movementAnimHop) {
              returnCords.x = 446
            } else if (animMovePhase <= CONSTANTS.player.movementAnimHop * 2) {
              returnCords.x = 624
            } else if (animMovePhase <= CONSTANTS.player.movementAnimHop * 3) {
              returnCords.x = 535
            }
          }
        }
      }

      return returnCords
    }

    static getStoneImageCords = () => {
      return { x: 1065, y: 0, width: 27, height: 26} // 1092
    }

    static getVaseCords = () => {
      return { x: 2, y: 1103, width: 61, height: 58}
    }

    static getItemImageCords = (itemName: itemType) => {
      let returnCords = { x: 0, y: 0, width: 0, height: 0}

      if (itemName === "extra life") returnCords = { x: 83, y: 1106, width: 30, height: 57}
      else if (itemName === "dynamite") returnCords = { x: 134, y: 1108, width: 27, height: 53}
      else if (itemName === "hat") returnCords = {x: 181, y: 1107, width: 53, height: 53}
      else if (itemName === "oxygen") returnCords = { x: 254, y: 1110, width: 46, height: 53}
      else if (itemName === "shield") returnCords = {x: 320, y: 1112, width: 39, height: 51}
      else if (itemName === "stone stack") returnCords = { x: 379, y: 1112, width: 85, height: 51}

      return returnCords
    }

    static getFrogImageCords = (isMovingRight: boolean, isMoving: boolean, animPhase: number) => {
      let returnCords = { x: 0, y: 154, width: 60, height: 55}

      const phase = animPhase % 4

      if (!isMoving) { // stays in place 
        if (phase === 0) returnCords.x = 2
        else if (phase === 1) returnCords.x = 82
        else if (phase === 2) returnCords.x = 162
        else if (phase === 3) returnCords.x = 82


      } else { // moving
        if (isMovingRight) { // right
          if (phase === 0) returnCords.x = 242
          else if (phase === 1) returnCords.x = 306
          else if (phase === 2) returnCords.x = 306
          else if (phase === 3) returnCords.x = 82
          
        } else { // left
          if (phase === 0) returnCords.x = 457
          else if (phase === 1) returnCords.x = 529
          else if (phase === 2) returnCords.x = 529
          else if (phase === 3) returnCords.x = 385
        }
      }

      return returnCords
    }

    static getFlameImgCords = (animPhase: number, flameDirection: "left" | "right") => {
      let returnCords = { x: 0, y: 1186, width: 78, height: 88}
      
      if (flameDirection === "right") {
        if (animPhase === 0) returnCords.x = 1
        else if (animPhase === 1) returnCords.x = 99
        else if (animPhase === 2) returnCords.x = 200


      } else {
        if (animPhase === 0) returnCords.x = 297
        else if (animPhase === 1) returnCords.x = 395
        else if (animPhase === 2) returnCords.x = 496
      }

      return returnCords
    }
}

export default ImageMapper
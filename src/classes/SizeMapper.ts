import { platformType, platformLenght } from "./Platform"

class SizeMapper {
    static getPlatformSize(type: platformType, length: platformLenght) {

        let returnSize = { width: 0, height: 0 }

        if (type === "a") {
            returnSize.height = 40
            
            if (length === "s") {
                returnSize.width = 100

            } else if (length === "m") {
                returnSize.width = 150

            } else throw new Error("Plarform A max size is M")

        } else if (type === "b") {
            returnSize.height = 60
            if (length === "s") {
                returnSize.width = 110
            } else if (length === "m") {
                returnSize.width = 160
            } else if (length === "l") {
                returnSize.width = 210
            } else if (length === "lg") {
                returnSize.width = 230
            }
        }

        return returnSize
    }

    static getGrassSize(size: "s" | "m" | "l", hanging: boolean) {
        let returnSize = { width: 0, height: 0}

        if (!hanging) {
            returnSize.width = 40
            if (size === "s") returnSize.height = 30
            else if (size === "m") returnSize.height = 50
            else if (size === "l") returnSize.height = 70
        } else {
            returnSize.width = 25
            if (size === "s") returnSize.height = 30
            else returnSize.height = 60
        }

        return returnSize
    }

    // static getStoneStackPlatformSize(size: "s" | "m") {
    //     let returnSize = { width: 0, height: 0}
    //     if (size === "s") {
    //         returnSize = { height: 40, width: 40}
    //     } else {
    //         returnSize = { height: 70, width: 40}
    //     }
    //     return returnSize
    // }
}


export default SizeMapper
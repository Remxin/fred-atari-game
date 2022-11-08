import { platformType, platformLenght } from "./Platform"

class SizeMapper {
    static getPlatformSize(type: platformType, length: platformLenght) {

        let returnSize = { width: 0, height: 0 }

        if (type === "a") {
            returnSize.height = 40
            
            if (length === "s") {
                returnSize.width = 140

            } else if (length === "m") {
                returnSize.width = 190

            } else throw new Error("Plarform A max size is M")

        } else if (type === "b") {
            returnSize.height = 60
            if (length === "s") {
                returnSize.width = 120
            } else if (length === "m") {
                returnSize.width = 180
            } else if (length === "l") {
                returnSize.width = 260
            } else if (length === "lg") {
                returnSize.width = 280
            }
        }

        return returnSize
    }

    static getGrassSize(size: "s" | "m" | "l", hanging: boolean) {
        let returnSize = { width: 0, height: 0}

        if (!hanging) {
            returnSize.width = 40
            if (size === "s") returnSize.height = 20
            else if (size === "m") returnSize.height = 50
            else if (size === "l") returnSize.height = 70
        } else {
            returnSize.width = 25
            if (size === "s") returnSize.height = 20
            else returnSize.height = 60
        }
        return returnSize
    }
}


export default SizeMapper
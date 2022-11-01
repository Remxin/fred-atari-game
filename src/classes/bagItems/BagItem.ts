type itemNameType = "bag stone stack" | "bag hat" | "bag shield" | "bag oxygen"

interface BagItemInterface {
    class: itemNameType
    expiresIn: number
}

abstract class BagItem implements BagItemInterface {
    class: itemNameType
    expiresIn: number

    constructor() {
        // this.name = name
        this.expiresIn = 0
    }

    startExpiring(callback: Function) {
        const expiringInterval = setInterval(() => {
            this.expiresIn -= 1
            if (this.expiresIn <= 0) {
                clearInterval(expiringInterval)
                callback()
            }
        }, 1000)
    }
}

export default BagItem
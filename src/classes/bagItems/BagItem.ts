type itemNameType = "bag stone stack" | "bag hat" | "bag shield" | "bag oxygen"

interface BagItemInterface {
    class: itemNameType
    expiresIn: number
}

abstract class BagItem implements BagItemInterface {
    class: itemNameType
    expiresIn: number
    type = "bag item"

    constructor() {
        // this.name = name
        this.expiresIn = 0
        this.type = "bag item"
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
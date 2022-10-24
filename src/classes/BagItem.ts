type itemNameType = "stone stack" | "hat" | "shield" | "oxygen"

interface BagItemInterface {
    name: itemNameType
    expiresIn: number
}

class BagItem implements BagItemInterface {
    name: itemNameType
    expiresIn: number

    constructor(name: itemNameType) {
        this.name = name
        this.expiresIn = 0

        switch(name) {
            case "hat":
                this.expiresIn = 10
                break
            case "shield":
                this.expiresIn = 15
                break
            default:
                this.expiresIn = 0
                break
        }
    }

    startExpiring() {
        const expiringInterval = setInterval(() => {
            this.expiresIn -= 1
            if (this.expiresIn <= 0) clearInterval(expiringInterval)
        }, 1000)
    }
}

export default BagItem
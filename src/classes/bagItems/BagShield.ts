import { informationManager } from "../../main";
import BagItem from "./BagItem";

class BagShield extends BagItem {
    expiresIn: number

    constructor() {
        super()
        this.class = "bag shield"
        this.expiresIn = 10
        informationManager.addItem(this)
        this.startExpiring()
    }

    remove() {
        informationManager.deleteItem(this)
    }

    startExpiring() {
        const expiringInterval = setInterval(() => {
            this.expiresIn -= 1
            if (this.expiresIn <= 0) {
                clearInterval(expiringInterval)
                this.remove()
            }
        }, 1000)
    }
}

export default BagShield
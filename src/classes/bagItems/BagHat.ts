import { informationManager } from "../../main";
import BagItem from "./BagItem";

class BagHat extends BagItem {
    useTimes: number

    constructor() {
        super()
        this.class = "bag hat"
        this.useTimes = 3 // if 0 delete
        informationManager.addItem(this)
    }

    use() {
        this.useTimes -= 1
        if (this.useTimes === 0) this.remove()
    }

    remove() {
        informationManager.deleteItem(this)
    }
}

export default BagHat
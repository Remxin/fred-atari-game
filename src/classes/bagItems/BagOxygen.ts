import { informationManager } from "../../main";
import BagItem from "./BagItem";

class BagOxygen extends BagItem{
    constructor() {
        super()
        this.class = "bag oxygen"
        informationManager.addItem(this)

        if (informationManager.oxygen.value === 0) this.use()
    }

    use() {
        informationManager.updateOxygen(40)
        this.remove()
    }

    remove() {
        informationManager.deleteItem(this)
    }
}

export default BagOxygen
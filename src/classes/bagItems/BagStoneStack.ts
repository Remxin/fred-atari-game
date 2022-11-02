import BagItem from "./BagItem";
import { player, informationManager } from "../../main";

interface BagStoneStackInterface {
    class: "bag stone stack"
}

class BagStoneStack extends BagItem implements BagStoneStackInterface {
    class: "bag stone stack"

    constructor() {
        super()
        this.class = "bag stone stack"
        informationManager.addItem(this)
        if (informationManager.stones.value === 0) this.use()
    }

    use() {
        informationManager.updateStones(10)
        this.remove()

    }

    remove() {
        informationManager.deleteItem(this)
    }

   
}

export default BagStoneStack
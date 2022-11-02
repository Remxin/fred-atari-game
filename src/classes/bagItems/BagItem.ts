type itemNameType = "bag stone stack" | "bag hat" | "bag shield" | "bag oxygen"

interface BagItemInterface {
    class: itemNameType
}

abstract class BagItem implements BagItemInterface {
    class: itemNameType
    type = "bag item"

    constructor() {
        // this.name = name
        this.type = "bag item"
    }

 
}

export default BagItem
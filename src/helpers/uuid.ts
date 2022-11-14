import { v4 } from "../../node_modules/uuid/wrapper.mjs"

class UUID {
    static genId(): string {
        const id = v4()
        return id
    }
}

export default UUID
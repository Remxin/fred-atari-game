import { informationManager, player } from "../../main";
import BagItem from "./BagItem";

const CONSTANTS = {
    secondsInAlpha: 5
}

class BagHat extends BagItem {
    useTimes: number
    intervalIncrementer: number
    img: HTMLImageElement
    fadeOut: boolean

    constructor() {
        super()
        this.class = "bag hat"
        this.useTimes = 3 // if 0 delete
        this.intervalIncrementer = 0
        this.fadeOut = false
        informationManager.addItem(this)
        this.img = informationManager.bag.itemsImgs.find((i) => i.alt === this.class)
    }

    use() {
        this.useTimes -= 1
        player.alpha.in = true

        const expireInterval = setInterval(() => {
            player.alpha.anim === 1 ? player.alpha.anim -= 1 : player.alpha.anim += 1
            if (this.intervalIncrementer >= CONSTANTS.secondsInAlpha) {
                clearInterval(expireInterval)
                this.intervalIncrementer = 0
                player.alpha.in = false
                player.alpha.anim = 0
            }
            this.intervalIncrementer += 1
        }, 1000)

        if (this.useTimes === 1) this.launchOpacityInterval()
        if (this.useTimes === 0) this.remove()
    }

    remove() {
        informationManager.deleteItem(this)
    }

    launchOpacityInterval() {
        const interval = setInterval(() => {
            if (this.fadeOut) {
                this.img.style.opacity = "0.2"
            } else {
                this.img.style.opacity = "1"
            }
            this.fadeOut = !this.fadeOut

            if (this.useTimes === 0) clearInterval(interval)
        }, 500)
    }
}

export default BagHat
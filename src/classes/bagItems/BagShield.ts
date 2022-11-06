import { informationManager, player } from "../../main";
import BagItem from "./BagItem";

const CONSTANTS = {
    expireValue: 15
}

class BagShield extends BagItem {
    expiresIn: number
    img: HTMLImageElement
    fadeOut: boolean
    fadingInterval?: NodeJS.Timer

    constructor() {
        super()
        this.class = "bag shield"
        this.expiresIn = CONSTANTS.expireValue
        informationManager.addItem(this)
        this.img = null
        this.fadeOut = false
        this.fadingInterval = null
        this.startExpiring()
        this.assignImage()
    }

    remove() {
        informationManager.deleteItem(this)
    }

    startExpiring() {
        player.alpha.in = true

        const expiringInterval = setInterval(() => {
            this.expiresIn -= 1
            player.alpha.anim === 1 ? player.alpha.anim -= 1 : player.alpha.anim +=1
            

            if (this.expiresIn < Math.round(CONSTANTS.expireValue /3)) {
                if (!this.fadingInterval)  {
                    this.fadingInterval = setInterval(() => {
                        if (this.fadeOut) {
                            this.img.style.opacity = '0.2'
                            this.fadeOut = false
                        } else {
                            this.img.style.opacity = '1'
                            this.fadeOut = true
                        }
                    }, 500)
                }
            }

            // this.img.style.opacity = "0.5"

            if (this.expiresIn <= 0) {
                clearInterval(expiringInterval)
                clearInterval(this.fadingInterval)
                this.remove()
                player.alpha.in = false
            }
        }, 1000)
    }

    assignImage() {
        this.img = informationManager.bag.itemsImgs.find((i) => i.alt === this.class)
    }
}

export default BagShield
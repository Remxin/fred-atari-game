export type keyType = "0" | '1' | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "stone" | "life" | "item placeholder" | "stone stack" | "hat" | "shield" | "oxygen"

class ImageMapper {
    static imageMap = {
        "0": "../../img/numbers/0.png",
        "1": "../../img/numbers/1.png",
        "2": "../../img/numbers/2.png",
        "3": "../../img/numbers/3.png",
        "4": "../../img/numbers/4.png",
        "5": "../../img/numbers/5.png",
        "6": "../../img/numbers/6.png",
        "7": "../../img/numbers/7.png",
        "8": "../../img/numbers/8.png",
        "9": "../../img/numbers/9.png",
        "stone": "../../img/stone.gif",
        "life": "../../img/fred-life.png",
        "item placeholder": "../../img/item-placeholder.png",
        "stone stack": "../../img/stone-stack.png",
        "hat": "../../img/hat.png",
        "shield": "../../img/shield.png",
        "oxygen": "../../img/oxygen-game.png",
    }

    static getImage = (key: keyType) => {
      return this.imageMap[key]
    }
}

export default ImageMapper
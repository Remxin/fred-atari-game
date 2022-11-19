import BagItem from "./BagItem";
import { player, informationManager, renderer, gameObjects, canvasProps } from "../../main";

class BagDynamite extends BagItem {
    
    constructor() {
        super()
        this.use()
    }

    use() {
        
        gameObjects.collidable.forEach((collidable) => {
            if(collidable.type === "enemy" && collidable.class !== "cactus" && collidable.position.x > 0 && collidable.position.x + collidable.width < canvasProps.width) {
                collidable.remove()
                informationManager.addScorePoints(50)
            }
        })
    }


   
}

export default BagDynamite
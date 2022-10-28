import BagItem from "./BagItem"
import { app, renderer } from "../main"
import ImageMapper, { keyType } from "./ImageMapper"

const playerContext = {
    mapSize: { min: -300, max: 2000},
    currentRunPoints: 0,
    currentPoints: 0,
    bag: [] as BagItem[],
    oxygen: { current: 0, max: 40, maxHeight: 85 }, // (height in px)
    lives: { current: 5, max: 8 },
    stones: { current: 9, max: 10 },
    scoreLen: 6,

}

interface InformationManagerInterface {
    playerPosIndex: { div: HTMLDivElement, min: number, max: number}
    runScore: { div: HTMLDivElement, value: number }
    totalScore: {div: HTMLDivElement, value: number }
    stones: { div: HTMLDivElement, value: number, max: number }
    lives: { div: HTMLDivElement, value: number, max: number }
    oxygen: { div: HTMLDivElement, value: number, max: number }
    bag: { div: HTMLDivElement, items: BagItem[], maxLen: number}
}
class InformationManager implements InformationManagerInterface{
    playerPosIndex: { div: HTMLDivElement; min: number; max: number }
    runScore: { div: HTMLDivElement; value: number }
    totalScore: { div: HTMLDivElement; value: number }
    stones: { div: HTMLDivElement; value: number; max: number }
    lives: { div: HTMLDivElement; value: number, max: number }
    oxygen: { div: HTMLDivElement; value: number; max: number }
    bag: { div: HTMLDivElement; items: BagItem[], maxLen: number }

    constructor() {
        this.playerPosIndex = { div: document.getElementById("player-on-map") as HTMLDivElement, min: playerContext.mapSize.min, max: playerContext.mapSize.max}
        this.runScore = { div: document.getElementById('run-score') as HTMLDivElement, value: playerContext.currentRunPoints}
        this.totalScore = { div: document.getElementById("total-score") as HTMLDivElement, value: playerContext.currentPoints}
        this.stones = { div: document.getElementById("stones") as HTMLDivElement, value: playerContext.stones.current, max: playerContext.stones.max},
        this.lives = { div: document.getElementById("lives") as HTMLDivElement, value: playerContext.lives.current, max: playerContext.lives.max}
        this.oxygen = { div: document.getElementById("bottle-fill") as HTMLDivElement, value: playerContext.oxygen.current, max: playerContext.oxygen.max}
        this.bag = { div: document.getElementById("bag") as HTMLDivElement, items: [], maxLen: 8}

    }

    watchAndUpdatePlayerPos(currentPos: number) {
        const finishPercentage = Math.round(currentPos / (this.playerPosIndex.max - this.playerPosIndex.min)* 100) 
        
        this.playerPosIndex.div.style.left = finishPercentage + "%"
    }

    addScorePoints(updateQuantity: number) {
        this.runScore.value += updateQuantity
        this.totalScore.value += updateQuantity

        this.runScore.div.innerHTML = ""
        this.totalScore.div.innerHTML = ""

        const scoreStr = { run: this.runScore.value + "", total: this.totalScore.value + "" }
        const blankZeros = {run: playerContext.scoreLen - scoreStr.run.length, total: playerContext.scoreLen -  scoreStr.total.length }
        console.log(blankZeros);
        

        Object.values(blankZeros).forEach((blankZero, index) => {
            for (let i = 0; i < blankZero; i++) {
                const img = document.createElement("img")
                img.alt = "score zero"
                img.src = ImageMapper.getImage("0")

                if (index === 0) {
                    this.runScore.div.appendChild(img)
                } else {
                    this.totalScore.div.appendChild(img)
                }
            }
        })

        Object.values(scoreStr).forEach((score, index) => {
            for (let char of score) {
                const img = document.createElement("img")
                img.alt = "score " + char
                img.src = ImageMapper.getImage(char as keyType)

                if (index === 0) {
                    this.runScore.div.appendChild(img)
                } else {
                    this.totalScore.div.appendChild(img)
                }
            }
        })
    }

    resetRunScore() {
        this.runScore.div.innerHTML = ""
        this.runScore.value = 0

        for (let i = 0; i < 6; i++) {
            const img = document.createElement("img")
            img.alt = "score zero"
            img.src = ImageMapper.getImage("0")
            this.runScore.div.appendChild(img)
        }
    }

    updateOxygen(newOxygenValue: number) {
        this.oxygen.value = newOxygenValue
        const fullPercentageFloat = Math.round((newOxygenValue / playerContext.oxygen.max) * 100) / 100

        const height = Math.round(fullPercentageFloat * playerContext.oxygen.maxHeight)
        this.oxygen.
        
        div.style.height = height + "px"
    }

    updateStones(newStoneValue: number) {
        this.stones.value = newStoneValue

        for (let i = 0; i < newStoneValue; i++) {
            const img = document.createElement("img")
            img.alt = "stone image"
            img.src = ImageMapper.getImage("stone")
            
            const isEven = i % 2 === 0
            if (isEven) {
                img.style.top = "30px"
            } 
            this.stones.div.appendChild(img)
        }
    }

    updateLives(newLivesValue: number) {
        this.lives.value = newLivesValue
        this.lives.div.innerHTML = ""

        for (let i = 0; i < newLivesValue; i++) {
            const img = document.createElement("img")
            img.alt = "life image"
            img.src = ImageMapper.getImage("life")

            this.lives.div.appendChild(img)
        }
    }

    private showItems() {
        const blankItems = this.bag.maxLen - this.bag.items.length

        for (let item of this.bag.items) {
            const img = document.createElement("img")
            img.alt = "item image"
            img.src = ImageMapper.getImage(item.name)

            this.bag.div.appendChild(img)
        }

        for (let i = 0; i < blankItems; i++) {
            const img = document.createElement("img")
            img.alt = "item placeholder"
            img.src = ImageMapper.getImage("item placeholder")
            this.bag.div.appendChild(img)
        }
    }

    resetItems() {
        this.bag.items = []
        this.showItems()
    }

    addItem(item: BagItem) {
        this.bag.items.push(item)
        this.showItems()
    }

    deleteItem (deletedItem: BagItem) {
        const itemIndex = this.bag.items.findIndex((item) => item.name === deletedItem.name)
        if (itemIndex === -1) throw new Error("Item index out of range (please check deleteItem function at renderer)")

        this.bag.items.splice(itemIndex, 1) // deleting item from bag

        this.showItems()

    }
}

export default InformationManager
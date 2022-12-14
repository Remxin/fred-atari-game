import BagItem from "./bagItems/BagItem"
import { app, renderer } from "../main"
import ImageMapper, { keyType } from "./ImageMapper"
import BagStoneStack from "./bagItems/BagStoneStack"
import BagOxygen from "./bagItems/BagOxygen"
import BagHat from "./bagItems/BagHat"
import BagShield from "./bagItems/BagShield"
import { winBreakPoint } from "./Renderer"

const playerContext = {
    mapSize: { min: -300, max: 2000 },
    currentRunPoints: 0,
    currentPoints: 0,
    bag: [] as BagItem[],
    oxygen: { current: 0, max: 40, maxHeight: document.getElementById("oxygen-bottle").offsetHeight }, // (height in px)
    lives: { current: 5, max: 8 },
    stones: { current: 9, max: 10 },
    scoreLen: 6,
    winTimerStartValue: 30

}


interface InformationManagerInterface {
    playerPosIndex: { div: HTMLDivElement, min: number, max: number }
    runScore: { div: HTMLDivElement, value: number }
    totalScore: { div: HTMLDivElement, value: number }
    stones: { div: HTMLDivElement, value: number, max: number }
    lives: { div: HTMLDivElement, value: number, max: number }
    oxygen: { div: HTMLDivElement, value: number, max: number }
    bag: { div: HTMLDivElement, items: (BagStoneStack | BagOxygen | BagHat | BagShield)[], maxLen: number, itemsImgs: HTMLImageElement[] }
}
class InformationManager implements InformationManagerInterface {
    playerPosIndex: { div: HTMLDivElement; min: number; max: number }
    runScore: { div: HTMLDivElement; value: number }
    totalScore: { div: HTMLDivElement; value: number }
    stones: { div: HTMLDivElement; value: number; max: number }
    lives: { div: HTMLDivElement; value: number, max: number }
    oxygen: { div: HTMLDivElement; value: number; max: number }
    bag: { div: HTMLDivElement; items: (BagStoneStack | BagOxygen | BagHat | BagShield)[], maxLen: number, itemsImgs: HTMLImageElement[] }
    winTimer: { timer: NodeJS.Timeout, value: number, started: boolean, div: HTMLDivElement }

    constructor() {
        this.playerPosIndex = { div: document.getElementById("player-on-map") as HTMLDivElement, min: playerContext.mapSize.min, max: playerContext.mapSize.max }
        this.runScore = { div: document.getElementById('run-score') as HTMLDivElement, value: playerContext.currentRunPoints }
        this.totalScore = { div: document.getElementById("total-score") as HTMLDivElement, value: playerContext.currentPoints }
        this.stones = { div: document.getElementById("stones") as HTMLDivElement, value: playerContext.stones.current, max: playerContext.stones.max },
            this.lives = { div: document.getElementById("lives") as HTMLDivElement, value: playerContext.lives.current, max: playerContext.lives.max }
        this.oxygen = { div: document.getElementById("bottle-fill") as HTMLDivElement, value: playerContext.oxygen.current, max: playerContext.oxygen.max }
        this.bag = { div: document.getElementById("bag") as HTMLDivElement, items: [], maxLen: 8, itemsImgs: [] }
        this.winTimer = { timer: null, value: playerContext.winTimerStartValue, started: false, div: document.getElementById("game-over-timer") as HTMLDivElement }
    }

    watchAndUpdatePlayerPos(currentPos: number) {
        const finishPercentage = Math.round(currentPos / (this.playerPosIndex.max - this.playerPosIndex.min) * 100)

        this.playerPosIndex.div.style.left = finishPercentage + "%"
    }

    addScorePoints(updateQuantity: number) {
        this.runScore.value += updateQuantity
        this.totalScore.value += updateQuantity

        this.runScore.div.innerHTML = ""
        this.totalScore.div.innerHTML = ""

        const scoreStr = { run: this.runScore.value + "", total: this.totalScore.value + "" }
        const blankZeros = { run: playerContext.scoreLen - scoreStr.run.length, total: playerContext.scoreLen - scoreStr.total.length }

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


        const height = Math.round(fullPercentageFloat * playerContext.oxygen.maxHeight) - 0.1 * playerContext.oxygen.maxHeight
        this.oxygen.div.style.height = height + "%"
    }

    updateStones(newStoneValue: number) {
        this.stones.div.innerHTML = ""
        // if greater than 10 add stone stack item to player
        if (newStoneValue > 10) {
            const stoneStack = new BagStoneStack()
            newStoneValue -= 10
        }

        this.stones.value = newStoneValue

        for (let i = 0; i < newStoneValue; i++) {
            const img = document.createElement("img")
            img.alt = "stone image"
            img.src = ImageMapper.getImage("stone")


            const isEven = i % 2 === 0
            if (isEven) {
                img.style.top = "40%"
            }
            this.stones.div.appendChild(img)
        }
    }

    updateLives(newLivesValue: number) {
        this.lives.value = newLivesValue

        if (newLivesValue < 0) return this.endGame("defeat")
        this.lives.div.innerHTML = ""

        for (let i = 0; i < newLivesValue; i++) {
            const img = document.createElement("img")
            img.alt = "life image"
            img.src = ImageMapper.getImage("life")

            this.lives.div.appendChild(img)
        }
    }

    private showItems() {
        this.bag.div.innerHTML = ""
        this.bag.itemsImgs = []
        const blankItems = this.bag.maxLen - this.bag.items.length


        for (let item of this.bag.items) {
            const img = document.createElement("img")
            img.alt = item.class
            img.src = ImageMapper.getImage(item.class)

            this.bag.itemsImgs.push(img)

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

    addItem(item: BagStoneStack | BagOxygen | BagHat | BagShield) {
        if (this.bag.items.length > this.bag.maxLen) {
            this.addScorePoints(100)
            return
        }

        this.bag.items.push(item)
        this.showItems()
    }

    deleteItem(deletedItem: BagItem) {
        const itemIndex = this.bag.items.findIndex((item) => item.class === deletedItem.class)
        if (itemIndex === -1) throw new Error("Item index out of range (please check deleteItem function at renderer)")

        this.bag.items.splice(itemIndex, 1) // deleting item from bag



        this.showItems()

    }

    private endGame(scenario: "defeat" | "victory") {
        const container = document.createElement("div")
        container.classList.add("game-end")

        const h2 = document.createElement("h2")
        const p = document.createElement("p")
        p.innerText = "Your final score: " + this.totalScore.value
        const btn = document.createElement("button")
        btn.innerText = "Play again!"
        btn.onpointerdown = () => window.location.reload()

        if (scenario === "defeat") {
            h2.innerText = "You have lost :("
        } else {
            h2.innerText = "You won!"
        }

        container.appendChild(h2)
        container.appendChild(p)
        container.appendChild(btn)

        document.getElementsByTagName("body")[0].appendChild(container)
    }

    startWinTimer() {
        this.winTimer.started = true
        this.winTimer.timer = setInterval(() => {
            this.updateWinTimer()

            if (this.winTimer.value <= 0) {
                clearInterval(this.winTimer.timer)
                this.endGame("victory")
                return
            }

            if (renderer.playerAbstractionPos.x < winBreakPoint) {
                clearInterval(this.winTimer.timer)
                this.resetWinTimer()
            }
            this.winTimer.value -= 1
        }, 1000)
    }

    resetWinTimer() {
        this.winTimer.value = playerContext.winTimerStartValue
        this.winTimer.div.innerHTML = ""
        this.winTimer.started = false
    }

    updateWinTimer() {
        this.winTimer.div.innerHTML = ""
        const numArr = (this.winTimer.value + "").split("")
        if (numArr.length === 1) numArr.unshift("0")

        for (let num of numArr) {
            const img = document.createElement('img')
            img.src = ImageMapper.getImage(num as keyType)
            this.winTimer.div.appendChild(img)
        }
    }
}

export default InformationManager
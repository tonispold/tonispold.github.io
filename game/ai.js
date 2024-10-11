// AI Class
class AI {
    makeMove() {
        this.evaluateMinimax(board, 3, true)
    }

    terminalScore(boardState) {
        const victory = boardState.checkVictory(false)
        if (victory === "") {
            return 0
        }
        if (victory === 'hound') {
            return 100
        } else {
            return -100
        }
    }

    cloneBoard(boardState) {
        const animals = []
        boardState.animals.forEach(animal => {
            if (animal.name === "fox") {
                animals.push(new Fox(animal.x, animal.y))
            } else if (animal.name === "hound") {
                animals.push(new Hound(animal.x, animal.y))
            }
        })
        return new Board(animals, boardState.currentTurn)
    }

    evaluateScore(boardState) {
        let score = 0
        let fox = null
        const hounds = []
        boardState.animals.forEach(animal => {
            if (animal.name === "fox") {
                fox = animal
            } else {
                hounds.push(animal)
            }
        })
        score += fox.y * 3 // mida kõrgemal fox on, seda kõrgema skoori anname
        let highestHound = -10
        let lowestHound = 10
        hounds.forEach(hound => {
            if (hound.y > highestHound) {
                highestHound = hound.y
            } else if (hound.y < lowestHound) {
                lowestHound = hound.y
            }
        })
        score -= (highestHound - lowestHound) * 2 // mida üksteisele lähemal on, seda väiksema skoori lahutab
        // kui rebane on kõrvuti või möödas siis on väga halb skoor
        if (fox.y <= lowestHound) {
            score -= 50
        }
        // Lower the score when the hounds are on average not above the fox
        let totalWidth = 0
        hounds.forEach(hound => {
            totalWidth += hound.x
        })
        // Vaatame, kas keskmiselt oleksid vastastikku
        const averageXPosition = totalWidth / hounds.length
        score -= Math.abs(averageXPosition - fox.x)
        
        // Vaatame, et ei oleks auke, et läbi saaks
        const xPositions = []
        hounds.forEach(hound => {
            xPositions.push(hound.x)
        })
        xPositions.push(-1)
        xPositions.push(8)
        xPositions.sort((a, b) => {return a-b})
        let biggestGap = 0
        for (let i = 0; i < xPositions.length -1; i++) {
            const gap = xPositions[i+1] - xPositions[i]
            if (gap > biggestGap) {
                biggestGap = gap
            }
        }
        if (biggestGap > 4) {
            score -= 10
        }

        score += this.terminalScore(boardState)
        return score
    }

    evaluateMinimax(currentBoard, depth, root=false) {
        const animals = []
        // kogume kokku kõik loomad
        currentBoard.animals.forEach(animal => {
            if (animal.name === currentBoard.currentTurn) {
                animals.push(animal)
            }
        })
        // maksimeerimine
        if (root) {
            let highestSoFar = -1000
            let bestAnimal = null
            let bestMove = null
            animals.forEach(animal => {
                const moves = animal.possibleMoves(currentBoard)
                moves.forEach(move => {
                    const newBoard = this.cloneBoard(currentBoard)
                    newBoard.animalAt(animal.x, animal.y)
                        .moveTo(move.x, move.y, newBoard)
                    const scores = this.evaluateMinimax(newBoard, depth - 1)
                    if (scores.lowest > highestSoFar) {
                        highestSoFar = scores.lowest
                        bestAnimal = animal
                        bestMove = move
                    }
                })
            })
            bestAnimal.moveTo(bestMove.x, bestMove.y)
            return
        // kui mäng on läbi või minimax on lõpus, tagasta positsiooni skoor
        } else if (depth === 0 || this.terminalScore(currentBoard) !== 0) {
            return {
                lowest: this.evaluateScore(currentBoard),
                all: [this.evaluateScore(currentBoard)]
            }
        // minimeerimine
        } else {
            let lowestScore = 1000
            const allScores = []
            animals.forEach(animal => {
                const moves = animal.possibleMoves(currentBoard)
                moves.forEach(move => {
                    const newBoard = this.cloneBoard(currentBoard)
                    newBoard.animalAt(animal.x, animal.y)
                        .moveTo(move.x, move.y, newBoard)
                    const scores = this.evaluateMinimax(newBoard, depth - 1)
                    if (scores.lowest < lowestScore) {
                        lowestScore = scores.lowest
                    }
                    allScores.push(...scores.all)
                })
            })
            return {
                lowest: lowestScore,
                all: allScores
            }
        }
    }
}

// genereerime laua ja käivitame AI

window.onload = generateNewBoard;

const houndAI = new AI()

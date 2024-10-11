// Board variable to hold the active board
let board

class Board {
    constructor(animals, firstTurn="fox") {
        this.animals = animals
        this.currentTurn = firstTurn
        this.focussedAnimal = null
        this.gameover = false
    }

    isValidMove(animal, x, y) {
        // Uus positsioon on sama mis eelmine
        if (animal.x === x && animal.y === y) {
            return false
        }
        // Koer tahab minna üles
        if (animal.name === "hound" && y <= animal.y) {
            return false
        }
        // Ei ole diagonaalis x teljestikus
        if (animal.x + 1 !== x && animal.x - 1 !== x) {
            return false
        }
        // Ei ole diagonaalis y teljestikus
        if (animal.y + 1 !== y && animal.y - 1 !== y) {
            return false
        }
        // Väljas mängualast
        if (x < 0 || x > 7 || y < 0 || y > 7) {
            return false
        }
        // Keegi on juba ees
        let allGood = true
        this.animals.forEach(a => {
            if (x === a.x && y === a.y) {
                allGood = false
            }
        })
        return allGood
    }

    animalAt(x, y) {
        // leiab looma positsiooni
        let foundAnimal = null
        this.animals.forEach(animal => {
            if (animal.x === x && animal.y === y) {
                foundAnimal = animal
            }
        })
        return foundAnimal
    }

    possibleMoves(animalName) {
        // loome listi kõikidest potensiaalsetest käikudest
        let validMoves = []
        this.animals.forEach(animal => {
            if (animal.name === animalName) {
                validMoves = validMoves.concat(animal.possibleMoves())
            }
        })
        return validMoves
    }

    checkVictory(register=true) {
        // kontrollime, kas keegi on võitnud
        if (this.possibleMoves("fox").length === 0) {
            if (register) {
                alert("Hound wins!")
                this.gameover = true
            }
            return "hound"
        } else if (this.possibleMoves("hound").length === 0) {
            if (register) {
                alert("Fox wins!")
                this.gameover = true
            }
            return "fox"
        } else {
            this.animals.forEach(animal => {
                if (animal.name === "fox" && animal.y === 0) {
                    if (register) {
                        alert("Fox wins!")
                        this.gameover = true
                    }
                    return "fox"
                }
            })
        }
        return ""
    }
}

class Animal {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.name = ""
    }

    moveTo(x, y, place=board) {
        // kui käik sobib, siis käime
        if (this.name !== place.currentTurn || place.gameover) {
            return
        }
        if (place.isValidMove(this, x, y)) {
            this.x = x
            this.y = y
            place.currentTurn = place.currentTurn === "fox" ? "hound" : "fox"
            if (place === board) {
                updateBoard()
                board.checkVictory()
                // koera käik peale rebast
                if (place.currentTurn === 'hound') {
                    houndAI.makeMove();
                }
            }
        };
    }
}

class Hound extends Animal {
    // laual peab olema alati 4 koera
    constructor(x, y) {
        super(x, y)
        this.name = "hound"
    }

    possibleMoves(place=board) {
        // tagastab koera kõik potensiaalsed käigud
        const allMoves = [
            {
                x: this.x + 1,
                y: this.y + 1
            },
            {
                x: this.x - 1,
                y: this.y + 1
            }
        ]
        const validMoves = []
        allMoves.forEach(move => {
            if (place.isValidMove(this, move.x, move.y)) {
                validMoves.push(move)
            }
        })
        return validMoves
    }
}
class Fox extends Animal {
    // laual on alati üks rebane
    constructor(x, y) {
        super(x, y)
        this.name = "fox"
    }

    possibleMoves(place=board) {
        // tagastab rebase kõik potensiaalsed käigud
        const allMoves = [
            {
                x: this.x + 1,
                y: this.y + 1
            },
            {
                x: this.x - 1,
                y: this.y + 1
            },
            {
                x: this.x + 1,
                y: this.y - 1
            },
            {
                x: this.x - 1,
                y: this.y - 1
            }
        ]
        const validMoves = []
        allMoves.forEach(move => {
            if (place.isValidMove(this, move.x, move.y)) {
                validMoves.push(move)
            }
        })
        return validMoves
    }
}

function generateNewBoard() {
    // tagastab alg positsioonid
    board = new Board([
        new Fox(0, 7),
        new Hound(1, 0),
        new Hound(3, 0),
        new Hound(5, 0),
        new Hound(7, 0)
    ])
    updateBoard()
}

function updateBoard() {
    // loob mängulaua
    const boardElement = document.getElementById("board")
    boardElement.innerHTML = `<div id="animals"></div>`
    let squareColor = "white"
    for (let i = 0; i < 64; i++) {
        const square = document.createElement("span")
        square.className = `${squareColor}-square`
        if (squareColor === "black") {
            square.onclick = () => {
                const fox = board.animals.find(animal => animal.name === 'fox')
                fox.moveTo(i % 8, Math.floor(i / 8))
            }
        }
        boardElement.appendChild(square)
        squareColor = squareColor === "black" ? "white" : "black"
        if ((i + 1 )% 8 === 0) {
            boardElement.appendChild(document.createElement("br"))
            squareColor = squareColor === "black" ? "white" : "black"
        }
    }
    // lisame loomad
    const animalsHtml = document.getElementById("animals")
    board.animals.forEach(animal => {
        const animalElement = document.createElement("span")
        animalElement.className = `animal ${animal.name}`
        animalElement.style = `top: ${animal.y * 4}em;left: ${animal.x * 4}em;`
        animalsHtml.appendChild(animalElement)
    })
}

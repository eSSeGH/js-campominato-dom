console.log("Campo Minato")

const btnPlay = document.getElementById("btn-play")

const gridEl = document.querySelector(".grid")

let bombArray = []

let scoreEl = document.querySelector(".score")
let score = 0
let highScoreEl = document.querySelector(".high-score")
let highScore = 0

btnPlay.addEventListener("click", startGame)

// FUNZIONI

// crea un array da 1 a sidegrid, con numeri random, non doppi

function bombGen(bombNum) {

    while (bombArray.length < bombNum) {

        let range = bombNum**2
        let bomb = randMinMax(1, range)


        if (bombArray.includes(bomb)){
            continue
        } else {
            bombArray.push(bomb)
        } 
    }
}

function randMinMax(min, max) {

    variable = Math.floor(Math.random() * (max - min + 1)) + min

    return variable
}


// RESET GAME FUNCTION
function resetGame() {
    scoreEl.style.backgroundColor = "chartreuse"
    score = 0
    scoreEl.innerHTML = "SCORE"
    gridEl.innerHTML = ""
}

// START GAME FUNCTION
function startGame() {
    console.log("click play")

    resetGame()

    let sideGrid = document.getElementById("level-form").value
    let exclamationPoint = "!"

    while (isNaN(sideGrid) || sideGrid > 30 || sideGrid < 10) {
        sideGrid = prompt(`Inserisci un numero compreso tra 10 e 30 ${exclamationPoint} `)
        exclamationPoint += "!!!"

        if (exclamationPoint === "!!!!!!!!!!") {
            alert("Ma sei scemo o mangi i sassi?")
        }
        if (exclamationPoint === "!!!!!!!!!!!!!!!!") {
            alert("Ti diverti? Vabbè, io tempo da perdere ne ho quanto ne vuoi...")
        }
    }

    const controller = new AbortController

    function createGrid(sideOfGrid) {

        let cellNum = sideOfGrid**2
    
        for (i=0; i < cellNum; i++) {
    
            num = i + 1
    
            const cellEl = document.createElement("div")
    
            cellEl.className = "cell"
            cellEl.style.width = `calc(100%/ ${sideOfGrid})`
            cellEl.style.height = `calc(100%/ ${sideOfGrid})`
            cellEl.innerHTML = num
    
            gridEl.append(cellEl)
    
            cellEl.addEventListener("click", onClick, {signal: controller.signal})
        }
    
    }

    createGrid(sideGrid)

    let bombNum = parseInt(sideGrid)

    bombGen(bombNum)
    console.log(bombArray)

    btnPlay.innerHTML = "RESTART"

    function onClick() {

        console.log(bombArray)
    
        const clickedCell = this
        console.dir(clickedCell)
    
        num = parseInt(clickedCell.innerHTML)
        console.log(num)
    
        if (bombArray.includes(num)) {
            console.log("bombArray include num")
            clickedCell.style.backgroundColor = "red"
            clickedCell.innerHTML = "<i class='fa-solid fa-bomb'></i>"
            scoreEl.style.backgroundColor = "red"
            scoreEl.innerHTML = `YOU LOSE: SCORE(${score})`

            console.log(score)
            console.log(highScore)

            if (score > highScore) {
                highScore = parseInt(score)
                highScoreEl.innerHTML = `HS: ${highScore}`
            }

            controller.abort()
    
        } else {
            console.log("bombArray non include num")
            clickedCell.style.backgroundColor = "lightblue"
            score += 1
            scoreEl.innerHTML = score
        }
    
        clickedCell.removeEventListener("click", onClick)
    }
}

// CREATE GRID FUNCTION


// CLICK CELL FUNCTION


// REMVE ALL EVENT LISTENER FROM CELLS

// function removeAllListener() {

//     let cellAllEl = document.querySelectorAll(".cell")
//     console.log(cellAllEl)

//     cellAllEl.removeEventListener("click", onClick)
// }





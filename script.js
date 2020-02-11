let level = 1
let pieceCount = 2 + level
let pegs = document.querySelectorAll(".peg")

function addPieces() {
    //clear pegs
    pegs.forEach(peg => {
        peg.querySelectorAll(".piece").forEach(piece => {
            piece.remove()
        })
    })
    for (let i = (7+level*2); i > 4; i-=2) {
        let piece = document.createElement("div")
        piece.setAttribute("class","piece")
        piece.setAttribute("data-size",i)
        piece.style.width = i + "vw"
        pegs[0].insertBefore(piece, pegs[0].childNodes[0])
    }
}
addPieces()
//add event listener to first child of first peg
let firstPiece = pegs[0].querySelector(".piece")
firstPiece.addEventListener("click", changeColor)

let pieces = document.querySelectorAll(".piece")
let activePiece
// function to change active color 
function changeColor(eve) {
    pieces.forEach(piece => piece.style.backgroundColor = "black")
    eve.target.style.backgroundColor = "darkgreen"
    activePiece = eve.target
}

//add a move piece here function to each moveHere button
let moveButtons = document.querySelectorAll(".moveHere")
moveButtons.forEach(button => button.addEventListener("click", movePiece))
let moves = 0
function movePiece(eve) {
    let piecesPresent = eve.path[1].querySelectorAll(".piece")
    //add all piece sizes to one array
    let pieceSizes = []
    piecesPresent.forEach(piece => {
        pieceSizes.push(parseInt(piece.dataset.size))
    })

    //order pieces from smallest to largest
    pieceSizes.sort(function(a, b){return a - b})

    if (piecesPresent.length == 0) { //if peg is empty, allow new piece to enter
        eve.path[1].insertBefore(activePiece, eve.path[1].childNodes[0])
        moves++
        document.querySelector(".moves").innerHTML = `Moves made: ${moves}`
    } else if (parseInt(activePiece.dataset.size) < pieceSizes[0]) { //add piece if smaller than the smallest piece
        eve.path[1].insertBefore(activePiece, eve.path[1].childNodes[0])
        moves++
        document.querySelector(".moves").innerHTML = `Moves made: ${moves}`
    }

    //remove all event listeners and then add event listener to first piece in each peg
    pieces.forEach(piece => piece.removeEventListener("click", changeColor))
    pegs.forEach(peg => {
        if (peg.querySelector(".piece")) {
            peg.querySelector(".piece").addEventListener("click", changeColor)
        }
    })
    //check for a winning condition
    checkForWin()
}

function checkForWin() {
    let numberInLast = pegs[2].querySelectorAll(".piece").length
    if (numberInLast == pieceCount) {
        //show You've Won!
        toggleWinDiv()

        //add moves to win screen
        document.querySelector(".winScore").innerHTML = `Your Moves: ${moves}`

        //add fewest moves possible to win screen
        document.querySelector(".bestScore").innerHTML = `Lowest Possible Moves: ${2**pieceCount -1}`

        //remove event listeners
        moveButtons.forEach(button => button.removeEventListener("click", movePiece))
        pieces.forEach(piece => piece.removeEventListener("click", changeColor))

        //remove green from active box
        pieces.forEach(piece => piece.style.backgroundColor = "black")
    }
}

document.querySelector(".playAgain").addEventListener("click",resetBoard)

function toggleWinDiv() {
    document.querySelector(".winner").classList.toggle("hidden")
}

function resetBoard() {
    toggleWinDiv()
    addPieces()
}
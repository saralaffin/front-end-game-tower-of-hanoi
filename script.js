let pieces = document.querySelectorAll(".piece")
pieces.forEach(piece => piece.addEventListener("click", changeColor))
let activePiece = null

function changeColor(eve) {
    eve.target.style.backgroundColor = "darkgreen"
    activePiece = eve.target
}

let moveButtons = document.querySelectorAll("button")
moveButtons.forEach(button => button.addEventListener("click", movePiece))

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
    } else if (parseInt(activePiece.dataset.size) < pieceSizes[0]) { //add piece if smaller than the smallest piece
        eve.path[1].insertBefore(activePiece, eve.path[1].childNodes[0])
    }

    //check for a winning condition
    checkForWin()
}

function checkForWin() {
    let lastPeg = document.querySelector(".lastPeg")
    let numberInLast = lastPeg.querySelectorAll(".piece").length
    if (numberInLast == 3) {
        console.log("You've won!")
    }
}
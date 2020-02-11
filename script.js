let pegs = document.querySelectorAll(".peg")
for (let i = 9; i > 4; i-=2) {
    let piece = document.createElement("div")
    piece.setAttribute("class","piece")
    piece.setAttribute("data-size",i)
    piece.style.width = i + "vw"
    pegs[0].insertBefore(piece, pegs[0].childNodes[0])
}

//add event listener to first child of first peg
let firstPiece = pegs[0].querySelector(".piece")
firstPiece.addEventListener("click", changeColor)

let pieces = document.querySelectorAll(".piece")
let activePiece
function changeColor(eve) {
    pieces.forEach(piece => piece.style.backgroundColor = "black")
    eve.target.style.backgroundColor = "darkgreen"
    activePiece = eve.target
}

//add a move piece here function to each button
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

    //remove all event listeners and then add event listener to first piece in each peg
    pieces.forEach(piece => piece.removeEventListener("click", changeColor))
    pegs.forEach(peg => peg.childNodes[0].addEventListener("click", changeColor))
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
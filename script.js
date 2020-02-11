let pieces = document.querySelectorAll(".piece")
pieces.forEach(piece => piece.addEventListener("click", changeColor))
let activePiece = null

function changeColor(eve) {
    eve.target.style.backgroundColor = "darkgreen"
    activePiece = eve.target
    console.log("The size of this piece is: ",parseInt(activePiece.dataset.size))
}

let moveButtons = document.querySelectorAll("button")
moveButtons.forEach(button => button.addEventListener("click", movePiece))

function movePiece(eve) {
    let piecesPresent = eve.path[1].querySelectorAll(".piece")
    console.log("how many pieces already here: ",piecesPresent.length)
    let pieceSizes = []
    piecesPresent.forEach(piece => {
        pieceSizes.push(parseInt(piece.dataset.size))
    })
    console.log("the smallest piece already here is: ",pieceSizes)
    console.log("the smallest piece already here is: ",pieceSizes.sort(function(a, b){return a - b}))
    if (piecesPresent.length == 0) {
        eve.path[1].insertBefore(activePiece, eve.path[1].childNodes[0])
    } else if (parseInt(activePiece.dataset.size) < pieceSizes[0]) {
        eve.path[1].insertBefore(activePiece, eve.path[1].childNodes[0])
    }
}
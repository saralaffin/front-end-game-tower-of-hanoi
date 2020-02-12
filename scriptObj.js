function activePiece(){
    return document.querySelector(".active")
}


class Game {
    constructor(level) {
        this.level = level
        this.pieceCount = 2 + level
        this.moves = 0
        this.pegs = document.querySelectorAll(".peg")
        this.moveButtons = document.querySelectorAll(".moveHere")
        this.pieces = [] //will be filled in on buildBoard
        this.buildBoard()
    }
    buildBoard(){
        console.log(this)
        //reset moves and display on screen
        this.moves = 0
        document.querySelector(".moves").innerHTML = `Moves made: ${this.moves}`

        //clear pegs
        this.pegs.forEach(peg => {
            peg.querySelectorAll(".piece").forEach(pieceNode => {
                pieceNode.remove()
            })
        })
        for (let i = (7+this.level*2); i > 4; i-=2) {
            let pieceDiv = document.createElement("div")
            pieceDiv.setAttribute("class","piece")
            pieceDiv.setAttribute("data-size",i)
            pieceDiv.style.width = i + "vw"
            this.pegs[0].insertBefore(pieceDiv, this.pegs[0].childNodes[0])
        }

        //add pieces to object/class instance
        this.pieces = document.querySelectorAll(".piece")

        //add event listener to first child of first peg
        let firstPiece = this.pegs[0].querySelector(".piece")
        firstPiece.addEventListener("click", this.changeColor)

    }
    changeColor(eve){
        if (document.querySelector(".active")) {
            document.querySelector(".active").classList.toggle(".active")
        }
        eve.target.classList.toggle("active")
    }
    movePiece(eve) {
        let piecesPresent = eve.path[1].querySelectorAll(".piece")
        //add all piece sizes to one array
        let pieceSizes = []
        piecesPresent.forEach(piece => {
            pieceSizes.push(parseInt(piece.dataset.size))
        })
        if (piecesPresent.length == 0) { //if peg is empty, allow new piece to enter
            eve.path[1].insertBefore(activePiece(), eve.path[1].childNodes[0])
            this.moves++
            document.querySelector(".moves").innerHTML = `Moves made: ${this.moves}`
        } else if (parseInt(activePiece().dataset.size) < pieceSizes[0]) { //add piece if smaller than the smallest piece
            eve.path[1].insertBefore(activePiece(), eve.path[1].childNodes[0])
            this.moves++
            document.querySelector(".moves").innerHTML = `Moves made: ${this.moves}`
        }
    
        //remove all event listeners and then add event listener to first piece in each peg
        pieces.forEach(piece => piece.removeEventListener("click", changeColor))
        pegs.forEach(peg => {
            if (peg.querySelector(".piece")) {
                peg.querySelector(".piece").addEventListener("click", changeColor)
            }
        })
        //check for a winning condition
        this.checkForWin()
    }
    checkForWin(){
        let numberInLastPeg = this.pegs[2].querySelectorAll(".piece").length
        if (numberInLastPeg == this.pieceCount) {
            //show You've Won!
            this.toggleWinDiv()

            //add moves to win screen
            document.querySelector(".winScore").innerHTML = `Your Moves: ${moves}`

            //add fewest moves possible to win screen
            document.querySelector(".bestScore").innerHTML = `Lowest Possible Moves: ${2**this.pieceCount -1}`

            //remove event listeners
            // this.moveButtons.forEach(button => button.removeEventListener("click", this.movePiece))
            this.pieces.forEach(piece => piece.removeEventListener("click", this.changeColor))

            //remove green from active box
            this.pieces.forEach(piece => piece.style.backgroundColor = "#2D0922")
        }
    }
    toggleWinDiv(){
        document.querySelector(".winner").classList.toggle("hidden")
    }
}

let level1 = new Game(1)
//set event listeners to move buttons
level1.moveButtons.forEach(button => button.addEventListener("click", level1.movePiece))

//set event lister to reset and play again buttons
document.querySelector(".reset").addEventListener("click",level1.buildBoard)
document.querySelector(".playAgain").addEventListener("click",level1.buildBoard)
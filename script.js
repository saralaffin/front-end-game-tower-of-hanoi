function game(level) {
    let pieceCount = 2 + level
    let pegs = document.querySelectorAll(".peg")
    let pieces
    let activePiece
    let moves
    let moveButtons

    function setPieces() {
        moves = 0
        document.querySelector(".moves").innerHTML = `Moves made: ${moves}`
        //clear pegs
        pegs.forEach(peg => {
            peg.querySelectorAll(".piece").forEach(node => {
                node.remove()
            })
        })
        for (let i = (7+level*2); i > 4; i-=2) {
            let pieceDiv = document.createElement("div")
            pieceDiv.setAttribute("class","piece")
            pieceDiv.setAttribute("data-size",i)
            pieceDiv.style.width = i + "vw"
            pegs[0].insertBefore(pieceDiv, pegs[0].childNodes[0])
        }
        pieces = document.querySelectorAll(".piece")
        //add event listener to first child of first peg
        let firstPiece = pegs[0].querySelector(".piece")
        firstPiece.addEventListener("click", changeColor)

        //add a move piece function to each moveHere button
        moveButtons = document.querySelectorAll(".moveHere")
        moveButtons.forEach(button => button.addEventListener("click", movePiece))
    }
    setPieces()

        // function to change active color 
    function changeColor(eve) {
        pieces.forEach(piece => piece.style.backgroundColor = "#2D0922")
        eve.target.style.backgroundColor = "#8AE234"
        activePiece = eve.target
    }

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
            pieces.forEach(piece => piece.style.backgroundColor = "#2D0922")
        }
    }

    document.querySelector(".playAgain").addEventListener("click",resetWinBoard)

    function toggleWinDiv() {
        document.querySelector(".winner").classList.toggle("hidden")
    }

    function resetWinBoard() {
        toggleWinDiv()
        setPieces()
    }

    document.querySelector(".reset").addEventListener("click",setPieces)
}
game(2)
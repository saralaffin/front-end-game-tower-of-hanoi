let pieceCount
let pegs = document.querySelectorAll(".peg")
let pieces
let activePiece
let moves
let moveButtons
let level

function setPieces() {
    pieceCount = 2 + level
    moves = 0
    document.querySelector(".moves").innerHTML = `Moves made: ${moves}`
    //clear pegs
    pegs.forEach(peg => {
        peg.querySelectorAll(".piece").forEach(node => {
            node.remove()
        })
    })
    for (let i = (5+level*2), j = 0; i > 1; i-=2, j++) {
        let pieceDiv = document.createElement("div")
        if (level == 0) { 
            //do not include animated class for intro to help things line up
            pieceDiv.setAttribute("class",`piece`)
        } else {
            pieceDiv.setAttribute("class",`piece animated fadeInDown delay-${j}`)
        }
        pieceDiv.setAttribute("data-size",i)
        pieceDiv.style.width = i + "em"
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

    // function to change active color 
function changeColor(eve) {
    if (document.querySelectorAll(".fadeInDown").length != 0) {
        document.querySelectorAll(".fadeInDown").forEach(animatedPiece => {
            animatedPiece.classList.remove("animated")
        })
    }
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


function setLevel(n) {
    level = n
    
    if (document.querySelector(".active-tab")) {
        document.querySelector(".active-tab").classList.remove("active-tab")
    }
    document.querySelector(`.level-${n}`).classList.add("active-tab")
}

let levels = [1,2,3,4]
levels.forEach(num => document.querySelector(`.level-${num}`).addEventListener("click",getLevel))
function getLevel(e){
        let lev = parseInt(e.target.innerHTML.split(" ")[1])
        setLevel(lev)
        setPieces()
    }


setLevel(1)
setPieces()

//start introJS when how to play tab is clicked
document.querySelector(".how-to-play").addEventListener("click",startIntro)

function startIntro(){
    level = 0
    setPieces()
    
    document.querySelector(".active-tab").classList.remove("active-tab")
    document.querySelector(".how-to-play").classList.add("active-tab")

    var intro = introJs();
    intro.setOptions({
        steps: [
            { 
                element: document.querySelector(".piece"),
                intro: "Click on the top piece! (it should turn green). Rule #1: you can only select one piece at a time, and it must be the one on top.",
                highlightClass: "animated infinite heartBeat"
            },
            {
                element: document.querySelectorAll(".moveHere")[1],
                intro: "Click here to move the active piece. Rule #2: every move involves taking the top piece from one of the stacks and placing it on top of another stack (or an empty one)",
                highlightClass: "animated infinite heartBeat"
            },
            {
                element: document.querySelectorAll(".piece")[1],
                intro: "Click on another piece!",
                highlightClass: "animated infinite heartBeat"
            },
            {
                element: document.querySelector(".pegs"),
                intro: 'Rule #3: No piece can be put on top of one smaller than itself. Try moving this next piece and see where you can place it.'
            },
            {
                element: document.querySelector(".one-more-for-introJS"),
                intro: 'Win the game by building the tower completely in the last row!'
            }
        ]
    });
    
    intro.start()
}
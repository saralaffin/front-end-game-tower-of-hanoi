let disks = document.querySelectorAll(".disk")
disks.forEach(disk => disk.addEventListener("click", changeColor))
let activeDisk = null
function changeColor(eve) {
    eve.target.style.backgroundColor = "darkgreen"
    activeDisk = eve.target
}

let moveButtons = document.querySelectorAll("button")
moveButtons.forEach(button => button.addEventListener("click", moveDisk))

function moveDisk(eve) {
    eve.target.parentNode.appendChild(activeDisk)
}
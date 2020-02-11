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
    let disksPresent = eve.path[1].querySelectorAll(".disk")
    console.log("how many disks already here: ",disksPresent.length)
    if (disksPresent.length == 0) {
        eve.target.parentNode.appendChild(activeDisk)
    }
    disksPresent.forEach(disk => console.log("the size of box already here is: ",parseInt(disk.dataset.size)))
}
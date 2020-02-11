let disks = document.querySelectorAll(".disk")
disks.forEach(disk => disk.addEventListener("click", changeColor))

function changeColor(eve) {
    eve.target.style.backgroundColor = "darkgreen"
}
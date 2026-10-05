let imgToToggle = document.getElementById("imgToToggle")
let playBtn = document.getElementById("playButton")
let pauseBtn = document.getElementById("pauseButton")
let imageCount = document.getElementById("imageCount")
let playStatus = document.getElementById("playStatus")

// Select all five thumbnail buttons with the same class.
let thumbnailButtons = document.querySelectorAll(".thumbnail")
let currentImage = 0
let timer = null
let switchTime = 3000 // Time between photos, in milliseconds.

let changingImage = (imageNumber)=>{
    currentImage = imageNumber
    let smallImage = thumbnailButtons[currentImage].querySelector("img")

    // Use the thumbnail's relative file path for the large image.
    imgToToggle.src = smallImage.getAttribute("src")
    imgToToggle.alt = smallImage.alt
    imageCount.textContent = (currentImage + 1) + " / " + thumbnailButtons.length

    thumbnailButtons.forEach((button, index)=>{
        if (index == currentImage){
            button.classList.add("selected")
            button.setAttribute("aria-pressed", "true")
        }
        else {
            button.classList.remove("selected")
            button.setAttribute("aria-pressed", "false")
        }
    })
}

let nextImage = ()=>{
    let nextNumber = currentImage + 1

    // Return to the first photo after reaching the last one.
    if (nextNumber == thumbnailButtons.length){
        nextNumber = 0
    }

    changingImage(nextNumber)
}

let playingGallery = ()=>{
    // Only create a timer if one is not already running.
    if (timer == null){
        timer = setInterval(nextImage, switchTime)
        playBtn.disabled = true
        pauseBtn.disabled = false
        playStatus.textContent = "Playing"
    }
}

let pausingGallery = ()=>{
    clearInterval(timer)
    timer = null
    playBtn.disabled = false
    pauseBtn.disabled = true
    playStatus.textContent = "Paused"
}

thumbnailButtons.forEach((button, index)=>{
    button.addEventListener("click", ()=>{
        changingImage(index)

        // Give a clicked photo a full 3 seconds. Stay paused if already paused.
        if (timer != null){
            pausingGallery()
            playingGallery()
        }
    })
})

playBtn.addEventListener("click", playingGallery)
pauseBtn.addEventListener("click", pausingGallery)

changingImage(0)
playingGallery()
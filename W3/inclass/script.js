let clrArea = document.getElementById("colorArea")
console.log(clrArea)
let clrBtn = document.getElementById("colorButton")
let txtBtn = document.getElementById("textButton")
let imgBtn = document.getElementById("imgButton")
let imgToToggle = document.getElementById("imgToToggle")


let changingColor = ()=>{
    let redC = Math.random()*255
    let greenC = Math.random()*255
    let blueC = Math.random()*255
    clrArea.style.backgroundColor = "rgb(" + redC + "," + greenC + "," + blueC + ")"
}
clrBtn.addEventListener("click", changingColor)
let addingText = ()=>{
    let p = document.createElement("p")
    console.log(p)
    p.innerHTML = "lorem ipsum dolor sit amet consectetur adipiscing elit minus id quo deleniti blanditiis ea mollit cupidatat expedita consequat excepturi vel duis imperdiet ut occaecat sunt fugiat eum dignissimos est sint in temporibus ea occaecat aute amet quidem laboris minus quos distinctio culpa fugiat ducimus esse dolorem incididunt nobis officia amet nobis facere sit assumenda aliqua voluptatum qui deserunt ea dolorum pariatur nulla quos quibusdam aliquip consectetur quod cumque amet reprehenderit culpa aute ut provident voluptatum cumque dolor in duis autem est iusto officia dolore accusamus ipsum est animi cumque omnis eum praesentium qui in mollit dolor autem pariatur quos repellendus odio proident nostrud similique eum elit elit reprehenderit possimus id deserunt quibusdam qui quos animi proident quod id nisi anim distinctio blanditiis et animi autem quo ut fugiat distinctio commodo"
    clrArea.after(p)
}
let changingImage = ()=>{
    if (imgToToggle.alt == "cat picture"){
        imgToToggle.src = "cat2.jpg"
        imgToToggle.alt = "cat picture2"
    }
    else {
        imgToToggle.src = "cat1.jpg"
        imgToToggle.alt == "cat picture"
    }
}
imgBtn.addEventListener("click", changingImage)
txtBtn.addEventListener("click", addingText)
clrBtn.addEventListener("click", changingColor)
        
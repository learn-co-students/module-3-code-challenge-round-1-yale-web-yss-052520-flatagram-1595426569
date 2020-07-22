// write your code here
document.addEventListener("DOMContentLoaded", ()=> {
    showImage()
    let charCard = qs('div.image-card')
    let charCont = qs(".image-container")
    // charCard.innerHTML = ""
})


function ce(element) {
    return document.createElement(element)
}

function qs(element) {
    return document.querySelector(element)
}

function showImage() {
    fetch("http://localhost:3000/images/1")
    .then(response => response.json())
    .then(imag => showoneImage(imag))
}


function showoneImage(imag) {
    let div = qs('div.image-card')
    div.className = "image-card"

    let h2 = qs('h2.title')
    h2.innerText = imag.title
    h2.className = "title"

    let img = qs("img.image")
    img.src = imag.image
    img.className = "image"

    let likesSection = qs('div.likes-section')
    likesSection.className = "likes-section"

    let imglikes = qs("span.likes")
    imglikes.className = "likes"
    imglikes.innerText = imag.likes + " likes"

    let btn = qs("button.like-button")
    btn.className = "like-button"
    btn.innerText = "♥"

    let ul = qs('ul.comments')
    ul.className = "comments"

    let li = qs('ul > li')
    li.innerText = ""

    let charCard = qs('div.image-card')

    // likesSection.append(imglikes, btn)
    // ul.appendChild(li)
    // div.append(h2, img, likesSection, imglikes, btn, ul)
    // charCard.append(div)

    btn.addEventListener("click", () => {
        fetch("http://localhost:3000/images/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: imag.likes + 1
            })
        })
        .then(res => res.json())
        .then(updatedImag => {
            imglikes.innerText = updatedImag.likes + " likes"
            imag = updatedImag
        })
    })

    const form = qs('form.comment-form')
    form.addEventListener("submit", ()=> {
    event.preventDefault()
    let comment = event.target[0].value
    // debugger
    fetch("http://localhost:3000/images", {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            comment: comment
        })
    })
.then(response => response.json())
.then(ocomment => {
    li.innerText = ocomment.comment
})
form.reset()
})
}



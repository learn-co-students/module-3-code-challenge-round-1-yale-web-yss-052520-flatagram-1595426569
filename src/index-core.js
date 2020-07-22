// Backup index.js just in case I mess up the main one.

function qs(element) {
    return document.querySelector(element)
}

function ce(element) {
    return document.createElement(element)
}

function fetchImage() {
    fetch("http://localhost:3000/images/1")
        .then(response => response.json())
        .then(image => displayImage(image))
}

function displayImage(image) {

    // <h2 class="title">Title of image goes here</h2>
    // <img src="./assets/image-placeholder.jpg" class="image" />
    // <span class="likes">0 likes</span>
    // <button class="like-button">♥</button>

    let h2 = qs("h2")
    h2.innerText = image.title

    let img = qs(".image")
    img.src = image.image

    let span = qs(".likes")
    span.innerText = image.likes + " Likes"

    // debugger
    let ul = qs(".comments")
    ul.textContent = ""

    // Delete Comment by Clicking
    ul.addEventListener("click", e => {
        e.target.remove()
    })

    image.comments.map(comment => comment.content).forEach(function (item) {
        let li = ce("li")
        let text = document.createTextNode(item)
        li.append(text)
        ul.append(li)
    })

    let button = qs(".like-button")

    button.addEventListener("click", () => {
        fetch("http://localhost:3000/images/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: ++image.likes
            })
        })
            .then(response => response.json())
            .then(updatedImage => {
                span.innerText = updatedImage.likes + " Likes"
                image = updatedImage
            })
    })

    let form = qs(".comment-form")
    let input = qs(".comment-input")

    form.addEventListener("submit", () => {
        event.preventDefault()

        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: event.target[0].value,
                imageId: 1
            })
        })
        .then(response => response.json())
        .then(newComment => {
            let li = ce("li")
            li.textContent = newComment.content
            ul.appendChild(li)
            input.value = ""
        })
    })
}

fetchImage()
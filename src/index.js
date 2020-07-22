// helper functions
function qs(selector){
    return document.querySelector(selector)
}
function ce(element){
    return document.createElement(element)
}

// varibles
const title = qs("h2.title")
const img = qs("img.image")
const commentList = qs("ul.comments")
const likes = qs("span.likes")
// const addComment = ce("li")
let current = {}
const likeBtn = qs("button.like-button")
const commentForm = qs("form.comment-form")
const commentBtn = qs("button.comment-button")
const dvBtn = qs("button.dv-button")
const dv = qs("span.dv")

// fetch GET images
function fetchImg(){
    fetch("http://localhost:3000/images/1")
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(displayImg)
}

// display Img on DOM
function displayImg(pic){
    // debugger
    img.src = pic.image 
    title.innerText = pic.title
    likes.innerText = `${pic.likes} Likes`
    commentList.innerHTML = "" // be careful
    current = pic
    dv.innerText = `${pic.downvotes} downvotes`

    showComments(pic)
}

function showComments(current){
    current.comments.forEach(com => {
        const addComment = ce("li") // need inside func scope so that it creates a new one for each comment
        addComment.innerText = com.content
    
        const deleteBtn = ce("button")
        deleteBtn.className="delete-button"
        deleteBtn.innerText= "x"
        
        addComment.append(deleteBtn)
        commentList.append(addComment)
        // debugger
    
        deleteBtn.addEventListener("click", ()=>{
            commentList.removeChild(addComment)

            let configObj = {
                method: "DELETE"
            }
            fetch ("http://localhost:3000/comments/"+com.id, configObj)
        })
    })
}

// increase image likes (PATCH)
likeBtn.addEventListener("click", ()=> {
    let currentLikes = likes.innerText.split(" ")[0]
    let newLikeTotal = parseInt(currentLikes, 10) + 1 
    // debugger
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            likes: newLikeTotal
        })
    }
    
    fetch ("http://localhost:3000/images/1", configObj)
    .then(res => res.json())
    .then(obj => likes.innerText = `${obj.likes} Likes`)
})

// downvoting ADV DELIVERABLE
dvBtn.addEventListener("click", ()=> {
    dvBtn.removeEventListener("click", callbackfunc(), true )
    callbackfunc()})

function callbackfunc(){
    // debugger
    dv.innerText = `${current.downvotes} downvotes`
    let currentDV = dv.innerText.split(" ")[0]
    let newDVTotal = parseInt(currentDV, 10) + 1 
    // debugger
    let configObj = {
        method: "PATCH",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            downvotes: newDVTotal
        })
    }
    
    fetch ("http://localhost:3000/images/1", configObj)
    .then(res => res.json())
    .then(obj => dv.innerText = `${newDVTotal} downvotes`)
    // .then(obj => displayImg(obj))
    // debugger

    fetchImg(current) 
}


// add comment (not persisting)
commentBtn.addEventListener("click", () => {
    event.preventDefault()
    // debugger

    const newComment = ce("li")

    const deleteBtn = ce("button")
    deleteBtn.className="delete-button"
    deleteBtn.innerText= "x"

    newComment.innerText = commentForm[0].value 
    

    // ADV DELIVERABLE
    let configObj = {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Accept":"application/json"
        },
        body: JSON.stringify({
            content: commentForm[0].value,
            imageId: current.id
        })
    }
    
    fetch ("http://localhost:3000/comments", configObj)
    .then(
        newComment.append(deleteBtn),
        commentList.append(newComment)
    )

    // currentComment = current.comments.find(com => com.content == newComment.innerText) // doesn't work bc newComment hasn't been added to server yet

    deleteBtn.addEventListener("click", ()=>{
        commentList.removeChild(newComment)
    
        let configObj = {
            method: "DELETE"
        }
        // debugger
        fetch ("http://localhost:3000/comments/"+newComment.id, configObj) //newComment is an li so this doesn't work, but I can't figure out how to grab the just created object
    })
    // .then(res => res.json())
    // .then(console.log)
    
    commentForm.reset() // is this waiting even thought it's not async
})





fetchImg()
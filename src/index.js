document.addEventListener('DOMContentLoaded', () => {
    /* DOM Elements */
    const title = document.querySelector('h2.title')
    const imageBar = document.querySelector('img.image')
    const span = document.querySelector('span.likes')
    const likeButton = document.querySelector('button.like-button')
    const comments = document.querySelector('ul.comments')
    const form = document.querySelector('form.comment-form')
    const likesBar = document.querySelector('div.likes-section')
    const dislikeBtn = createDownVoteButton()
    
    // Comment Form Post Listener
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        
        const configObj = {
            method: "POST" ,
            headers: 
            {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            imageId: 1,
            "content": form[0].value
            })
        }

        fetch('http://localhost:3000/comments', configObj)
        .then(res => res.json())
        .then(comment => renderComment(comment))
        .then(form.reset())
    })


    /* Functions */
    function fetchImage(){
        fetch('http://localhost:3000/images/1')
        .then(res => res.json())
        .then( imageObj => {
            title.innerText = imageObj.title
            imageBar.src = imageObj.image
            span.innerText = `${imageObj.likes} likes`

        // Like Button Listener
        likeButton.addEventListener('click', () => {
            const configObj = {
                method: "PATCH" ,
                headers: 
                {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                likes: ++imageObj.likes
                })
            }

            fetch('http://localhost:3000/images/1', configObj)
            .then(res => res.json())
            .then(updatedImg => {
                imageObj = updatedImg
                span.innerText = `${imageObj.likes} likes`
            })
        })

        // Dislike Button Listener
        dislikeBtn.addEventListener('click', () => {
            const configObj = {
                method: "PATCH" ,
                headers: 
                {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({
                likes: --imageObj.likes
                })
            }

            fetch('http://localhost:3000/images/1', configObj)
            .then(res => res.json())
            .then(updatedImg => {
                imageObj = updatedImg
                span.innerText = `${imageObj.likes} likes`
            })

        })
    })
    }

    function fetchComments(){
        fetch('http://localhost:3000/comments')
        .then(res => res.json())
        .then( imageObj => {
            comments.innerHTML = ''
            imageObj.forEach(comment => renderComment(comment))
        })
       
    }

    function renderComment(comment){
        // console.log(comment)
        const li = document.createElement('li')
        li.innerText = comment.content

        const deleteBtn = document.createElement('li')
        deleteBtn.innerText = 'Delete'
        deleteBtn.className = 'like-button '

        // Delete Comment Button Listener
        deleteBtn.addEventListener('click', () => {
        fetch(`http://localhost:3000/comments/${comment.id}`, {method: 'DELETE'})
        .then( () => {
           li.remove(),
           deleteBtn.remove()
        })
        })
        comments.append(li, deleteBtn)

    }

    function createDownVoteButton(){
        const dislike = document.createElement('button')
        dislike.innerText = '⇩'
        dislike.className = "dislike"
        likesBar.append(dislike)
        return dislike
    }

    /* Function Calls */
    fetchImage()
    fetchComments()
    
})
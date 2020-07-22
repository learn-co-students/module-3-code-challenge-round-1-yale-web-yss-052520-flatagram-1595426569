// write your code here
document.addEventListener("DOMContentLoaded", () =>{
    function ce(element){
        return document.createElement(element)
    }

    function qs(selector){
        return document.querySelector(selector)
    }

    const pic = qs(".image")
    const title = qs(".title")
    const likebtn = qs(".like-button")
    const comments = qs(".comments")
    const likez = qs(".likes")
    const form = qs(".comment-form")

    function fetchpost(){
        fetch("http://localhost:3000/images/1")
        .then(res => res.json())
        .then(image => show(image))
    }

    function show(image){
        title.innerText = image.title 
        pic.src = image.image 
        likez.innerText = image.likes 

        comments.innerHTML = ""

        image.comments.forEach(comment => addcomment(comment))
    
        
        likebtn.addEventListener("click", () => {
            const objConfig= {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    likes: image.likes + 1 
                })
            }
    
            fetch("http://localhost:3000/images/1", objConfig)
            .then(resp => resp.json())
            .then(updatedimage =>{
                image = updatedimage
                likez.innerText = updatedimage.likes
            })
         
            
    
        })

    }

    function addcomment(comment){
        let newcomment = ce("li")
        newcomment.innerText = comment.content
        comments.append(newcomment)
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault() 
        // console.log(form.elements)
        let comment = ce("li")
        comment.innerText = e.target[0].value
        comments.append(comment)
        form.reset ()

    })

    

    


    fetchpost()
})
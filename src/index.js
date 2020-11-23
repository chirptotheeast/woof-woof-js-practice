const URL = "http://localhost:3000/pups"



document.addEventListener('DOMContentLoaded', () => {


    getDog()

    
})


function getDog(){
    fetch(URL)
        .then(res => res.json())
        .then(dogArray => dogArray.forEach(dog => {
            renderDog(dog)
            // console.log(dog.name)
        }))

}

function renderDog(dog){
 
    let dogNavbar = document.getElementById("dog-bar")
    let dogSpan = document.createElement('span')
        //dogSpan.classList = "dog-span"
        dogSpan.innerText = dog.name
        //  console.log(dogSpan.innerText)

    dogSpan.addEventListener('click', (event) => {renderSoloDog(dog)})

     dogNavbar.appendChild(dogSpan)
}

function renderSoloDog(dog){
   let dogInfo = document.getElementById('dog-info')
        // dogInfo.id = dog.id
        // console.log(dogInfo.id)
   let image = document.createElement('img')
        // image.classList.add('dog-avatar')
        image.src = dog.image

    let h2 = document.createElement('h2')
        h2.id = dog.id
        h2.innerText = dog.name
    
    let button= document.createElement('button')
        button.id = 'good'
        if (dog.isGoodDog === true){
           button.innerText = "Good Dog!"
        } else {
           button.innerText = "Bad Dog!"
        }
        
          button.addEventListener("click", (event)  => {
            // debugger
            //    console.log(event)
            toggleDogGood(event, dog)
             
            })
        dogInfo.innerHTML = ""
        dogInfo.append(image, h2, button)

      
           
    }

    function toggleDogGood(event, dog){
        
       let buttonId = document.getElementById('good')
            //console.log(dog)
    let id = event.currentTarget.parentNode.childNodes[1].id
        // console.log(id, isGoodDog)
         if (buttonId.innerText === "Good Dog!"){
             buttonId.innerText = "Bad Dog!"
             dog.isGoodDog = false
         } else if (buttonId.innerText === "Bad Dog!"){
            buttonId.innerText = "Good Dog!"
            dog.isGoodDog = true
         }


          


  fetch(`${URL}/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({isGoodDog: dog.isGoodDog})
  }).then((res) => res.json())
    .then((dog) => console.log(dog)) 
      

    //    let dog document.getElementById('dog-info')


    }

// function likeMe(event, ptag){
//   //Event.currentTarget ALWAYS returns the element that the 
//   // listener was attached to
  
//   let id = event.currentTarget.parentNode.id

//   let likes = +ptag.innerText.split(" ")[0] + 1;

//   console.log(id, likes);

//   fetch(`${URL}/${id}`, {
//     method: "PATCH",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({likes: likes})
//   }).then((res) => res.json())
//     .then((toy) => ptag.innerText = `${toy.likes} likes`) 


// }
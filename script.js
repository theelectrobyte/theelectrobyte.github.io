const posts = ["P7", "P6", "P5", "P4", "P3", "P2", "P1"]

const grid = document.getElementById("postGrid")
const overlay = document.getElementById("overlay")
const carousel = document.getElementById("carousel")

const title = document.getElementById("postTitle")
const desc = document.getElementById("postDesc")
const links = document.getElementById("postLinks")

posts.forEach(post => {

    let img = document.createElement("img")
    img.src = `posts/${post}/1.png`

    img.onclick = () => openPost(post)

    grid.appendChild(img)

})

function resetCarousel(){

requestAnimationFrame(()=>{
carousel.scrollLeft = 0;
});

}

function openPost(post) {

    carousel.innerHTML = ""
    links.innerHTML = ""

    for (let i = 1; i <= 10; i++) {

        let image = new Image()
        image.src = `posts/${post}/${i}.png`

        image.onerror = () => image.remove()

        carousel.appendChild(image)

    }

    fetch(`posts/${post}/info.json`)
        .then(res => res.json())
        .then(data => {

            title.innerText = data.title
            desc.innerText = data.description

            data.links.forEach(link => {

                let a = document.createElement("a")
                a.href = link.url
                a.innerText = link.name
                a.target = "_blank"

                links.appendChild(a)
                links.appendChild(document.createElement("br"))

            })

        })
    
    overlay.style.display = "flex";
    resetCarousel();

}


document.getElementById("closeBtn").onclick = () => {
    overlay.style.display = "none"
}

overlay.onclick = (e) => {
    if (e.target === overlay) {
        overlay.style.display = "none"
    }
}

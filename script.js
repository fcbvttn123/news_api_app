let options = ["General", "Entertainment", "Health", "Science", "Sport", "Technology"];

let cardContainer = document.querySelector(".card-container")

let optionBtn = Array.from(document.querySelectorAll(".option-container > button"))

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

// Create "3 days ago" date 

let date = new Date()

let currentTime = date.getTime()

let threeDaysAgo = currentTime - (86400000*3)

threeDaysAgo = new Date(threeDaysAgo)

// Done

async function printNews(newsType) {

    cardContainer.innerHTML = ""

    const URL = `https://newsapi.org/v2/everything?q=${newsType}&from=${threeDaysAgo.getFullYear()}-${months[threeDaysAgo.getMonth()]}-${threeDaysAgo.getDate()}&language=en&sortBy=popularity&apiKey=98babde343e84505aa1326975203cba1`;

    console.log(URL)

    let res = await fetch(URL)

    let data = await res.json() 

    let news = data.articles

    news.forEach(element => {

        if(!element.urlToImage) {
            return
        }
        
        let temp = document.getElementsByTagName("template")[0];

        let clon = temp.content.cloneNode(true);

        clon.querySelector("img").src = element.urlToImage;

        clon.querySelector(".title").innerText = element.title;

        clon.querySelector(".subtitle").innerText = element.description;

        clon.querySelector("a").href = element.url;

        cardContainer.appendChild(clon)

    })

}

printNews("general")

optionBtn.forEach(element => {

    element.addEventListener("click", e => {

        printNews(e.target.innerText)

    })

})
//On Window load
window.addEventListener("load", getTopAnime);

//Getting the searched anime 
const searchInput = document.getElementById("search-box");

// the "change" event only fires when the value is committed unlike
// "input" which is fired every time the value of the element changes
searchInput.addEventListener("change", searchAnime);

//Functions
//For getting the top animes
async function getTopAnime() {
  const url = `https://api.jikan.moe/v4/top/anime`;

    const res = await fetch(url).catch((err) => {
        displayError(err.message);
    });
    const data = await res.json();

    //if any error occurs, the api returns res containing status = 400
    if (data.status !== 400) {
        //Getting the animeList div
        const animeList = document.getElementById("anime-list");

        const animeArray = data.data;

        //Looping through the animArray
        animeArray.forEach(anime => {
            const animeCard = document.createElement("div");
            animeCard.classList.add("anime-card");
            animeCard.innerHTML = `<img src="${anime.images.jpg.image_url}" alt="">
                <p class="anime-title">${anime.title},</br> 
                    Episodes: ${anime.episodes},</br> 
                    Rating: ${anime.score},</br>
                    <a href="${anime.url}" target="_blank" class="myanimelist-url">LEARN MORE</a>
                </p>`;
            //Appeding each animeCard to animeList
            animeList.appendChild(animeCard);
        });
    }
    else {
        //Calling displayError if error occurs
        displayError("Some Error Occurred!!!");
    }
}


// For searching the anime by name, given user input
function searchAnime(e) {
    //Getting the entered anime name
    const animeName = e.target.value;

  const url = `https://api.jikan.moe/v4/anime?q=${animeName}&page=1`;

    fetch(url).then(res => {
        return res.json();

    }).then(data => {
        //Getting the h1 aka heading element to change it's innnertext 
        const heading = document.getElementById("heading");
        heading.innerText = `Results for "${animeName}"`;
        setTimeout(() => {
            heading.innerText = ``;
        }, 3000);

        //Getting the animeList div
        const animeList = document.getElementById("anime-list");

        //Getting the results array
        const searchResults = data.data;

        //Looping through the resultsArray
        searchResults.forEach(anime => {
            const animeCard = document.querySelector(".anime-card");
            animeCard.innerHTML = `<img src="${anime.images.jpg.image_url}" alt="">
                    <p class="anime-title">${anime.title}, </br> Episodes: ${anime.episodes}, </br> Rating: ${anime.score}</br>
                    <a href="${anime.url}" target="_blank" class="myanimelist-url">LEARN MORE</a></p>`;
            animeList.appendChild(animeCard);
        });

    }).catch((err) => {
        //Calling the function if error occurs
        displayError(err.message);
    })
    //Clearing the textbox input
    searchInput.value = "";
}


//For displaying error 
function displayError(errorMsg) {
    //Getting the error div
    const error = document.getElementById("error");

    //Creating a div
    const errorDiv = document.createElement("div");

    //Adding class and innerHTML
    errorDiv.classList.add("error-div");
    errorDiv.innerHTML = `<p>${errorMsg}</p>`;

    //Appending to error div
    error.appendChild(errorDiv);

    //Removing newly created div for error after 2 sec
    setTimeout(() => {
        errorDiv.remove(errorDiv);
    }, 3000);
}
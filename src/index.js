import "./styles/style.css";

// declare
const limit = '&limit=20';
const apiKey = "2Od9A5B5VJRzJhtCeLaKsIQLuuACsiix";
const Url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}`;
const basicRenderingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
const main = document.querySelector(".search-result");
const form = document.querySelector(".search-form");
const searchInput = document.getElementById("search");
//https://api.giphy.com/v1/gifs/random?api_key=2Od9A5B5VJRzJhtCeLaKsIQLuuACsiix

//function
const beforeRender = ()=>{
    while(main.hasChildNodes()){
        main.removeChild(main.firstChild)
    }
}

const firstRender = async()=>{
    const response = await fetch(basicRenderingUrl+limit)
    const data = await response.json();
    const gifData = await data.data;
    createImages(gifData);

}

const createImages = (gifs)=>{
    if(gifs !== null){
    gifs.map((gif)=>{
        let img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        img.classList.add("results-gif");
        main.appendChild(img);
    })}
}

const getGifs = async(event)=>{
    event.preventDefault();
    beforeRender();
    const searchInputValue = searchInput.value;
    const gifyUrl = `${Url}${searchInputValue}${limit}`;
    const response = await fetch(gifyUrl);
    const data = await response.json();
    const gifData = await data.data;
    createImages(gifData);
    searchInput.value = "";  
}

// eventlistener
form.addEventListener("submit",getGifs);

// function call
firstRender();
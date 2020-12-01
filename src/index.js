import "./styles/style.css";

//config

// declare
const limit = '&limit=20';
const apiKey = "2Od9A5B5VJRzJhtCeLaKsIQLuuACsiix";
console.log(apiKey);
const Url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`;
const basicRenderingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
const main = document.querySelector(".search-result");
const form = document.querySelector(".search-form");
const searchInput = document.querySelector("input");
const container = document.querySelector(".popup-container");
const popupCloseBtn = document.getElementById("close");
const popUp = document.querySelector(".popup");

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
    if(gifs !== (null || undefined)){
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
    const gifyUrl = `${Url}${searchInputValue}`;
    const response = await fetch(gifyUrl);
    const data = await response.json();
    const gifData = await data.data;
    createImages(gifData);
    searchInput.value = "";  
}


// eventlistener
form.addEventListener("submit",getGifs);
main.addEventListener("click",(e)=>{
    if(e.target.classList.value === "results-gif"){
        const imgUrl = e.target.src;
        let popupImg = document.createElement("img");
        let span = document.createElement("span");
        let popupInput = document.createElement("input");
        let input = document.createElement("input");

        input.type = "checkbox";
        input.classList.add("check");
        popupInput.value = imgUrl;
        popupImg.src = imgUrl;
        popupImg.classList.add("results-gif");
        popupInput.classList.add("copy-input");
        span.classList.add("url-copy");
        span.appendChild(popupInput);
        span.appendChild(input);
        popUp.appendChild(popupImg);
        popUp.appendChild(span);
        container.classList.add("active");
    }    
});
popupCloseBtn.addEventListener("click",()=>{
    container.classList.remove("active");
    const gifImg = popUp.querySelector(".results-gif");
    const copytags = popUp.querySelector(".url-copy")
    popUp.removeChild(gifImg);
    popUp.removeChild(copytags);
});

popUp.addEventListener("click",(e)=>{
    if(e.target.classList.value === "check"){
        const copyInput = document.querySelector(".copy-input");
        let tempElem = document.createElement("textarea");

        //Copy
        document.body.appendChild(tempElem);
        tempElem.value = copyInput.value;
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);
    }
})

// function call
firstRender();
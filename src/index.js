import "./styles/style.css";

// declare
const limit = '&limit=20';
const apiKey = "2Od9A5B5VJRzJhtCeLaKsIQLuuACsiix";
const Url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=`;
const basicRenderingUrl = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}`;
const main = document.querySelector(".search-result");
const form = document.querySelector(".search-form");
const searchInput = document.querySelector("input");
const container = document.querySelector(".popup-container");
const popupCloseBtn = document.getElementById("close");
const popUp = document.querySelector(".popup");
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
        let icon = document.createElement("f");
        const iconList = ["far","fa-clone","copy"];
        iconList.forEach((iconClass)=>{
            icon.classList.add(iconClass)
        });
        popupInput.value = imgUrl;
        popupImg.src = imgUrl;
        popupImg.classList.add("results-gif");
        popupInput.classList.add("copy-input");
        span.appendChild(popupInput);
        span.appendChild(icon);
        popUp.appendChild(popupImg);
        popUp.appendChild(span);
        container.classList.add("active");
    }    
});
popupCloseBtn.addEventListener("click",()=>{
    container.classList.remove("active");
    const gifImg = popUp.querySelector(".results-gif");
    const copytags = popUp.querySelector("span")
    popUp.removeChild(gifImg);
    popUp.removeChild(copytags);
});

popUp.addEventListener("click",(e)=>{
    if(e.target.tagName === "F"){
        const copyInput = document.querySelector(".copy-input");
        const icon = document.querySelector("f.fa-clone");
        let tempElem = document.createElement("textarea");
        const copyComplete = document.querySelector(".complete");
        //Copy
        document.body.appendChild(tempElem);
        tempElem.value = copyInput.value;
        tempElem.select();
        document.execCommand("copy");
        document.body.removeChild(tempElem);
        copyComplete.classList.toggle("hide");

        
        // setTimeout(copyBtn.addEventListener("click",()=>{
        //     copyBtn.classList.remove("active");
        // }),3000);
    }
})

// function call
firstRender();
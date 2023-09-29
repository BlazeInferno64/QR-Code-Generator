const textInput = document.querySelector("#text");

const heightSelect = document.querySelector("#height");
const widthSelect = document.querySelector("#width");

const generateBtn = document.querySelector(".gen");

const downloadImgBtn = document.querySelector(".dwn");
const closeImgBtn = document.querySelector(".close");

const img = document.querySelector(".img");

const outputCard = document.querySelector(".res-card");

const outputBg = document.querySelector(".output");


let preValue;

const width = widthSelect.options[widthSelect.selectedIndex].text;
const height = heightSelect.options[heightSelect.selectedIndex].text;

let enteredValue = textInput.value;


generateBtn.addEventListener("click",(e) => {

    //let api = `https://api.qrserver.com/v1/create-qr-code/?size=${width}x${length}&data=${textInput.value}`;

    let qrValue = textInput.value.trim();
    if(!qrValue || preValue === qrValue) return;
    preValue = qrValue;
    generateBtn.innerText = 'Generating QR Code...';
    
    fetchCode(`https://api.qrserver.com/v1/create-qr-code/?size=${width}x${length}&data=${textInput.value}`);
    //img.src = api;
    outputBg.classList.remove("hide");

    setTimeout(() => {
        outputCard.classList.remove("hide");
        outputCard.classList.remove("bottom");

    }, 500);
    setTimeout(() => {
        img.classList.remove("hide");
    }, 1000);

    img.addEventListener("load",(e) => {
        if(img.src === '' || img.src == null){
            downloadImgBtn.classList.add("no");
        }
        else{
            downloadImgBtn.classList.remove("no");
        }
        generateBtn.innerText = 'Generate QR Code';
    });

    

    textInput.addEventListener("keyup",(e) => {
        if(!textInput.value.trim()) {
            textInput.value = '';
            img.src = '';
        }
    });

})


function fetchCode(url){
    fetch(url,{
    })
    .then(res => res.blob())
    .then(file => {
        img.src = URL.createObjectURL(file);
    })
    .catch((err) => {
        alert(err);
    })
}


closeImgBtn.addEventListener("click",(e) => {
    outputCard.classList.add("bottom");
    outputCard.classList.add("hide");

    setTimeout(() => {
        outputBg.classList.add("hide");
    }, 500);
})

downloadImgBtn.addEventListener("click",(e) => {
    const aTag = document.createElement("a");
    aTag.href = img.src;
    //img.src.replace(/^.*[\\\/]/, '')
    aTag.download = "QR-Code";
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
})

textInput.addEventListener("input",(e) => {
    if(textInput.value.length <= 0){
        generateBtn.classList.add("no");
    }
    else{
        generateBtn.classList.remove("no");
    }
})
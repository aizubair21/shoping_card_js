const cartBtn = document.querySelectorAll('.cardBtn');
const title = document.getElementsByClassName('title');
const favBtn = document.getElementsByClassName('favourite');
const compBtn = document.getElementsByClassName('compare');
let data = {}


// favourite button click event
// for (let fb = 0; fb < favBtn.length; fb++) {
//     favBtn[fb].addEventListener("click", (e)=>{
//         console.log(fb);
//     })
// }


for (let index = 0; index < cartBtn.length; index++) {
    //card button click event 
    cartBtn[index].addEventListener("click", (e)=>{
        data = {
            "p":e.target.dataset.p,
            "q":e.target.dataset.q,
            "id":index,
            // "name":"Product "+(Math.floor(Math.random() * 99))+"-"+cbI,
            "name":title[index].innerHTML,
        };
        
        // getLocalData(1);
        setLocalData();
        hasAlreadyInCard();
    });     
    
    // favourite button click event 
    favBtn[index].addEventListener("click", (e)=>{
    });

    
    // compare button click evetn 
    compBtn[index].addEventListener("click", (e)=>{

    });
}

//function to get localstorage data
async function getLocalData(targetId) {
    if (targetId) {
        let getTargetData = JSON.parse(localStorage.getItem('product'));
        return getTargetData;
    }else{
        return JSON.parse(localStorage.getItem('product'));
    }
}

//function to set data to localstorage
async function setLocalData() {
    let localData = localStorage.getItem('product');
    // console.log(data);
    if (localData == "" || localData == undefined || localData == null ) {
        // localStorage.setItem("product",[]);
        localStorage.setItem("product", JSON.stringify(data));
    }
    if (localData) {   
        let dataArray = [];
        let localJsonData = JSON.parse(localData);

       
        if (localJsonData.length > 1) {
            localJsonData.push(data);
            // dataArray = localJsonData;
            localStorage.setItem("product", JSON.stringify(localJsonData));

        }else{
            dataArray.push(data);
            dataArray.push(localJsonData);
            // console.log(JSON.stringify(dataArray));
            // console.log(dataArray.length);
            localStorage.setItem("product", JSON.stringify(dataArray));
        }

        // console.log(localJsonData);
        // localStorage.setItem("product", JSON.stringify(dataArray));
    }
}

//function to determined if this already in card
function hasAlreadyInCard(){
    const localStorateData = JSON.parse(localStorage.getItem('product'));
    
    localStorateData.forEach(ls=>{
        // console.log(ls.id);
        
        for (let cb = 0; cb < cartBtn.length; cb++) {
            if (cb == ls.id) {
                cartBtn[cb].classList.add('disabled');
            }
        }
    })
}

//function loop over ana over to dynamic change in dom
// function animation(){
//     requestAnimationFrame(animation)
// }
// animation();
    
hasAlreadyInCard();

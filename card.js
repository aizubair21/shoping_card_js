const cartBtn = document.querySelectorAll('.cardBtn');
const title = document.getElementsByClassName('title');
const favBtn = document.getElementsByClassName('favourite');
const compBtn = document.getElementsByClassName('compare');
const compCheckBox = document.getElementsByClassName('compareBtn');
const viewCardElem = document.getElementById('view_card');
const cardPriceElm = document.getElementById('card_price');
let alreadyInserted = false;

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
        
        // get local data 
        let lsd = JSON.parse(localStorage.getItem('product'));
        
        data = {
            "p":e.target.dataset.p,
            "q":e.target.dataset.q,
            "id":index,
            // "name":"Product "+(Math.floor(Math.random() * 99))+"-"+cbI,
            "name":title[index].innerHTML,
        };
        if(lsd){
            lsd.forEach((ls, lsi)=>{
                if(data.id == ls.id){
                    lsd.splice(lsi, 1);
                    alreadyInserted = true;
                    if (lsd.length == 0) {
                        localStorage.clear()
                    }else{
                        localStorage.setItem('product', JSON.stringify(lsd));
                    }
                }
            });
        }
        setLocalData();
        hasAlreadyInCard();
        showCardItemToIcon()
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
    if (!alreadyInserted) {
        // console.log("call setLocalData and set");
        if (localData == "" || localData == undefined || localData == null ) {
        // localStorage.setItem("product",[]);
        let objAr = [];
        objAr.push(data);
        localStorage.setItem("product", JSON.stringify(objAr));
        }   
        let dataArray = [];
        let localJsonData = JSON.parse(localData);

        if (localJsonData.length > 0) {
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
alreadyInserted = false;
}

//function to determined if this in card, then disabled the button triggered
async function hasAlreadyInCard(){
    let localStorateData = JSON.parse(localStorage.getItem('product'));
    
    for (let cb = 0; cb < cartBtn.length; cb++) {
        // cartBtn[cb].classList.add('disabled');
        // cartBtn[cb].classList.remove('cardBtn');
        cartBtn[cb].classList.remove("btn-danger");
        cartBtn[cb].innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart `;

    }
    if(localStorateData){
        if (localStorateData.length > 0) {
                
            localStorateData.forEach((ls, lsi)=>{
                // console.log(ls.id);
                for (let cb = 0; cb < cartBtn.length; cb++) {
                    if (cb == ls.id) {
                        // cartBtn[cb].classList.add('disabled');
                        // cartBtn[cb].classList.remove('cardBtn');
                        cartBtn[cb].classList.add("btn-danger");
                        cartBtn[cb].innerHTML = "remove from cart";
                        // localStorateData
                        // setLocalData();
                    }
                }
            })
        }else{
            for (let cb = 0; cb < cartBtn.length; cb++) {
                if (cb == localStorateData.id) {
                    // cartBtn[cb].classList.add('disabled');
                    // cartBtn[cb].classList.remove('cardBtn');
                    cartBtn[cb].classList.add("btn-danger");
                    cartBtn[cb].innerHTML = `<i class="fas fa-shopping-cart"></i>add to cart `;
                }
            }
        }
    }
}

//function loop over ana over to dynamic change in dom
// function animation(){
//     requestAnimationFrame(animation)
// }
// animation();
    
hasAlreadyInCard();



//function to show card item on nav section
function showCardItemToIcon(){
    let getLocalData = JSON.parse(localStorage.getItem('product'));
    let cPrice = 0;
    viewCardElem.innerHTML = "0";
    cardPriceElm.innerHTML = "0 TK";

    // console.log(getLocalData);
    //cart item 

    if (getLocalData) {
        if (getLocalData.length > 0) {
            // let ln = ;
            //card item
            viewCardElem.innerHTML = getLocalData.length;
    
            //card price
            getLocalData.forEach((crd)=>{
                if (crd.p != "") {   
                    cPrice += parseInt(crd.p);
                    // console.log(crd.p);
                }
            })
            cardPriceElm.innerHTML = cPrice ?? "0" +" TK";
            // console.log(cPrice);
        }else{
            viewCardElem.innerHTML = 1;
            cardPriceElm.innerHTML = "0 TK";
        }    
    }
    // console.log("local count: "+getLocalData.length);
}
showCardItemToIcon()
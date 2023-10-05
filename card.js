const cartBtn = document.querySelectorAll('.cardBtn');
const title = document.getElementsByClassName('title');
const favBtn = document.getElementsByClassName('favourite');
const compBtn = document.getElementsByClassName('compare');
const compCheckBox = document.getElementsByClassName('compareBtn');
const viewCardElem = document.getElementById('view_card');
const cardPriceElm = document.getElementById('card_price');
const rowItem = document.getElementsByClassName("rowItem");


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

// function loop over ana over to dynamic change in dom
async function animation(){
    hasAlreadyInCard();
    showCardItemToIcon()
    viewCard();
    // removeFromCart();
    requestAnimationFrame(animation)
}
// animation();
    



//function to show card item on nav section
async function showCardItemToIcon(){
    let getLocalData = JSON.parse(localStorage.getItem('product'));
    let cPrice = 0;
    viewCardElem.innerHTML = "0";
    cardPriceElm.innerHTML = "0 TK";

    // console.log(getLocalData);
    //cart item 

    if (getLocalData) {
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

    }
    // console.log("local count: "+getLocalData.length);
}


// function to show cart item on card view page 
function viewCard() {
    let localData = JSON.parse(localStorage.getItem("product"));
    let html = "";
    let inc = 0;
    let subTotal = 0;
    let vat = 0;
    let total = 0;
   if (localData) {
        for (let ld = 0; ld < localData.length; ld++) {
            let targetRowItem = rowItem[localData[ld].id];
            ++inc;
            total += parseInt(localData[ld].p);
            html += 
            `
            <div class="cwb_item">
                
                <img width="45" height="45" src="img/img.png" alt="cart img" />
                <div>
                    <p style="font-size:13px; display:inline-block; width:300px">${localData[ld].name}</p> 
                    <div class="cwbi_vat"> Discount: 05%</div>

                </div>
                <div class="cwbi_prz">${localData[ld].p}</div>
                <button class="cwbi_index cwbi_remove" onclick="removeFromCart(${ld})">&times;</button>
            </div>
            `;
            
            // console.log(ld);

        } 
        document.getElementsByClassName("cw_body")[0].innerHTML = html; 
        html = "";
        // console.log(html);

        document.getElementsByClassName("cw_footer")[0].innerHTML = 
        `
            <div class="left">
                ${inc }  items.
            </div>
            <div class="right">
                Total : ${total} TK
            </div>
        `;
   }else{
    html = 
    `
    <div class="alert alert-info">You card is empty !</div>
    `;
    document.getElementsByClassName("cw_body")[0].innerHTML = html; 
   }
}
// viewCard();



// function to remove item from card 
function removeFromCart(tg) {
    let localData = JSON.parse(localStorage.getItem("product"));
    localData.splice(tg, 1);
    localStorage.setItem("product", JSON.stringify(localData));

    hasAlreadyInCard();
    showCardItemToIcon()
    viewCard();
}

// function to open shoping card
function openShopingCard() {
    document.getElementById('shoping_card').classList.add('shoping_show');
    hasAlreadyInCard();
    showCardItemToIcon()
    viewCard();
}

//function hide shoping card 
function hideShopingCard() {
    document.getElementById('shoping_card').classList.remove('shoping_show');
    hasAlreadyInCard();
    showCardItemToIcon()
    viewCard();    
}

// clear cart 
function clearCart() {
    localStorage.clear();
    viewCard();
    showCardItemToIcon()
    hasAlreadyInCard();
}

hasAlreadyInCard();
showCardItemToIcon()
viewCard();
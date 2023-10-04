const cartBtn = document.querySelectorAll('.cardBtn');








cartBtn.forEach((cb, cbI) => {
    cb.addEventListener('click', (e)=>{
        // json data 
        let data = {
            "p":20,
            "q":1,
            "id":cbI,
            // "name":"Product "+(Math.floor(Math.random() * 99))+"-"+cbI,
            "name":"lorem",
        };

        getLocalData(1);
        // setLocalData(data);
    })
});

//function to get localstorage data
async function getLocalData(targetId) {
    if (targetId) {
        let getLocalDatas = localStorage.getItem('product');
        // console.log(getLocalDatas[1]);
    }else{
        return JSON.parse(localStorage.getItem('product'));
    }
}

//function to set data to localstorage
async function setLocalData(data) {
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
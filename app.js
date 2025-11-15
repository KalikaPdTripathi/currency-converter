const url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".drop-down select");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns)
{
    for(currCode in countryList)
    {
        let opt = document.createElement("option");
        opt.innerText = currCode;
        opt.value = currCode;
        if(select.name == "from" && currCode=="USD")
        {
            opt.selected = "selected";
        }
        else if(select.name=="to" && currCode =="INR")
        {
            opt.selected="selected";
        }
        select.append(opt);
        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target);
    });
    }
}

const updateExchangeRate = async()=>{
      let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal=="" || amtVal < 1)
    {
        amtVal = 1;
        amount.value="1";
    }

   try {
        // CORRECT API URL - Get all currencies for the base currency
        const URL = `${url}/${fromCurr.value.toLowerCase()}.json`;
        console.log("Fetching from:", URL);
        
        let response = await fetch(URL);
        let data = await response.json();
        
        console.log("API Response:", data);
        
        let fromCurrency = fromCurr.value.toLowerCase();
        let toCurrency = toCurr.value.toLowerCase();
        
        // Access the rates correctly
        let exchangeRate = data[fromCurrency][toCurrency];
        let finalAmount = (amtVal * exchangeRate).toFixed(2);
        
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        msg.innerText = "Error fetching exchange rate. Please try again.";
    }
}

const updateFlag = (ele)=>{
    let currCode = ele.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = ele.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
  
})

window.addEventListener("load", (evt)=>{
    updateExchangeRate();
})


const amount1 = document.getElementById('value1')
const amount2 = document.getElementById('value2')
const currency1 = document.getElementById('currency1')
const currency2 = document.getElementById('currency2')
let rates

fetch('https://api.currencybeacon.com/v1/latest?api_key=wPMvk6TXDXOnqEKs8rJH0khNZfiBc3P1')
.then(response => response.json())
.then(data => {
    rates= data.rates
    loadOption()
})
.catch(error => console.error('Error:', error));

function loadOption(){
    const currencies = (Object.keys(rates))
    currencies.map((currency) => {
        currency1.innerHTML += `<option value="${currency}">${currency}</option>`;
        currency2.innerHTML += `<option value="${currency}">${currency}</option>`;
    })
    currency1.value='USD'
    currency2.value='EUR'
    amount2.value = amount1.value
    console.log(currency1.value.keys)
}

document.addEventListener("DOMContentLoaded", function(){
    
})


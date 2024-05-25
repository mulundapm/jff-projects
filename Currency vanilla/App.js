const amount1 = document.getElementById('value1')
const amount2 = document.getElementById('value2')
const currency1 = document.getElementById('currency1')
const currency2 = document.getElementById('currency2')
const group1 = document.querySelectorAll(".group1")
const group2 = document.querySelectorAll(".group2")
let rates
let rate1
let rate2


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
    assignRate()
    Math.round(amount2.value = amount1.value* rate2/rate1)
}

function getRate(rates, row){
    return rates[row]
}

function assignRate(){
    rate1= getRate(rates, currency1.value)
    rate2= getRate(rates, currency2.value)
}

function computeValue2(){
    assignRate()
    Math.round(amount2.value = amount1.value* rate2/rate1)
}

function computeValue1(){
    assignRate()
    Math.round(amount1.value = amount2.value* rate1/rate2)
}

group1.forEach(input => addEventListener("change", function(){
    computeValue2()
}))

group2.forEach(input => addEventListener("change", function(){
    computeValue1()
}))


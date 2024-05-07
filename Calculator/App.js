// display clicked number into the input field
//save that value and when the next operator is clicked, run and function to add it into the equation
// when new number is clicked, clear the input field 

const display = document.querySelector(".numberDisplay")
const numbers = document.querySelectorAll(".number")
const plus = document.querySelector(".plus")
const minus = document.querySelector(".minus")
const times = document.querySelector(".times")
const divide = document.querySelector(".divide")
let num1
let num2

numbers.forEach(function(number){
    number.addEventListener("click", function(e){
        console.log(e.target.value)
        display.value += e.target.value
    })
    }
)

plus.addEventListener("click", function(){
    display.value="";
    
})
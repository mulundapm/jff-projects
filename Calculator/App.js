// display clicked number into the input field
//save that value and when the next operator is clicked, run and function to add it into the equation
// when new number is clicked, clear the input field 

const display = document.querySelector(".numberDisplay")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equal = document.querySelector(".equal")
const cancel = document.querySelector(".cancel")
const dot =document.querySelector(".dot")
let num2
let operatorFunction =""
let result

numbers.forEach(function(number){
    number.addEventListener("click", function(e){
        display.value += e.target.value
    })
    }
)

operators.forEach(function(operator){
    operator.addEventListener("click", function(e){
        if (operatorFunction === ""){
            operatorFunction = e.target.id
            result = parseFloat(display.value)
            display.value="";}
        else if(operatorFunction !== ""){
            num2 = parseFloat(display.value)
            performOperation();
            operatorFunction = e.target.id
            display.value="";
            }
    }) 
})

equal.addEventListener("click", function(){
    num2 = parseFloat(display.value)
    performOperation()
    display.value = result
    operatorFunction= ""
})

function performOperation(){
    if (operatorFunction=== "plus"){
        result= result+num2
    } else if (operatorFunction=== "minus"){
        result= result-num2
    }else if (operatorFunction=== "times"){
        result= result*num2
    }else if (operatorFunction=== "divide"){
        result= result/num2
    }
}


cancel.addEventListener("click", function(){
    num1 = 0
    num2 = 0
    display.value=""
    operatorFunction= ""
})

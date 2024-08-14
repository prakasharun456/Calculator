const display = document.querySelector("#display")
const buttons = document.querySelectorAll(".btn")

let currentInput='';
// every numbers and operators as buttons 
buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        const value = button.value;
        handleInput(value)
    })
})

function handleInput(value){
    switch(value){
        case 'AC':
            clearDisplay();
            break;
        case 'DEL':
            deleteLastChar();
            break;
        case '=':
            calculate();
            break;
        default:
            currentInput+=value;
            display.value=currentInput;
            break;
    }
}
// validating the inputs 
function validateInput(input) {
    return /^[\d+\-*/().%]*$/.test(input);
}
// AC - All clear
function clearDisplay(){
    currentInput=''
    updateDisplay(currentInput)
}
// DEL (or) Backspace - deletes last value
function deleteLastChar(){
    currentInput=currentInput.slice(0,-1);
    updateDisplay(currentInput)
}
// calculating the input expression
function calculate(){
    if (!validateInput(currentInput)) {
        updateDisplay('Invalid input');
        currentInput = '';
        return;
    }
    try{
    const result = math.evaluate(currentInput)
    currentInput=result.toString()
    updateDisplay(currentInput)
    }
    catch(error){
        updateDisplay(error)
        currentInput='';
    }
}
// updating the display value
function updateDisplay(val){
    display.value=val;
    adjustFontSize();
}

function adjustFontSize() {
    const maxFontSize = 45; // Maximum font size
    const minFontSize = 3; // Minimum font size
    const length = display.value.length;
    if (length > 5) { 
        let fontSize = Math.max(minFontSize, maxFontSize - (length - 5) * 2);
        display.style.fontSize = fontSize + 'px';
    } else {
        display.style.fontSize = maxFontSize + 'px'; // Reset to max font size if 5 or fewer characters
    }
}
// for keyboard inputs
document.addEventListener("keydown",(event)=>{
    const keyValue= event.key;
    handleKeyboardInput(keyValue);
})
// keyboard inputs validation and functionality
function handleKeyboardInput(key){
   if((key>='0' && key<='9')|| key ==='+'|| key ==='-'|| key ==='*'||key==='/'||key=='.'||key==='%'){
    currentInput+=key;
    updateDisplay(currentInput);
   }
   else if(key==='Enter'){
    calculate();
   }
   else if(key==='Backspace'){
    deleteLastChar();
   }
   else if(key==='Escape'){
    clearDisplay();
   }
}
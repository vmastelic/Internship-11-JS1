const buttons = [
    {
        id: "onoff",
        label: "ON/OFF",
        shiftLabel: null,
        type: "action",
        value: "power"
    },

    {
        id: "shift",
        label: "shift",
        shiftLabel: null,
        type: "action",
        value: "shift"
    },

    {
        id: "clear",
        label: "clear",
        shiftLabel: null,
        type: "action",
        value: "clear"
    },
    
    {
        id: "div",
        label: "÷",
        shiftLabel: "√",
        type: "operation",
        value: "div",
        shiftValue: "sqrt"
    },
    
    {id: "n7", label: "7", type: "number", value: 7 },
    {id: "n8", label: "8", type: "number", value: 8 },
    {id: "n9", label: "9", type: "number", value: 9 },

    {
        id: "sub",
        label: "-",
        shiftLabel: "x³",
        type: "operation",
        value: "sub",
        shiftValue: "cube"
    },    
    
    {id: "n4", label: "4", type: "number", value: 4 },
    {id: "n5", label: "5", type: "number", value: 5 },
    {id: "n6", label: "6", type: "number", value: 6 },
    {
        id: "add",
        label: "+",
        shiftLabel: "!",
        type: "operation",
        value: "add",
        shiftValue: "factorial"
    },
    
    {id: "n1", label: "1", type: "number", value: 1 },
    {id: "n2", label: "2", type: "number", value: 2 },
    {id: "n3", label: "3", type: "number", value: 3 },
    
    {
        id: "mul",
        label: "x",
        shiftLabel: "log",
        type: "operation",
        value: "mul",
        shiftValue: "log"
    },

    {id: "n0", label: "0", type: "number", value: 0},

    {
        id: "sq",
        label: "x²",
        shiftLabel: "³√",
        type: "operation",
        value: "sq",
        shiftValue: "cuberoot"
    },

    {
        id: "equal",
        label: "=",
        shiftLabel: "=",
        type: "equal",
        value: "equal",
    }
]

const buttonsContainer = document.getElementById("buttons");

let shiftMode = false;

buttons.forEach(btn => {
    const button = document.createElement("button");

    button.textContent = btn.label;
    button.dataset.id = btn.id;

    button.addEventListener("click", () =>{
        handleButtonClick(btn);
    });

    button.classList.add("button", btn.type);

    buttonsContainer.appendChild(button)

});

const display = document.getElementById("display");

let number = null;
let operation = null;

let currentValue = "";
let displayValue = "";

function handleButtonClick(btn){

    if(btn.type === "number")addNumber(btn.value);
    else if(btn.type === "operation")addOperation(btn);
    else if(btn.type === "equal")isEqual(number, operation, currentValue);
    else if(btn.type === "action")handleAction(btn);
    
    updateDisplay();
}

function updateDisplay(){
    display.textContent = displayValue;
}

function addNumber(value){
    currentValue += String(value);

    if (operation === null)
        displayValue = currentValue;

    else
    displayValue = `${number} ${operation} ${currentValue}`;
}

function addOperation(btn){

    const opKey = (shiftMode && btn.shiftValue) ? btn.shiftValue : btn.value;

    if(operation !== null)return;
    else if(currentValue === "")return;

    else if (opKey === "sq") {
        const num = Number(currentValue);
        const result = num * num;

        displayValue = String(result);
        currentValue = String(result);

        number = null;
        operation = null;
        return;
    }
    
    else if(opKey === "factorial"){
        const num = Number(currentValue);
        
        if(num < 0){
            displayValue = "ERROR: Samo za brojeve >= 0!";
            number = null;
            operation = null;
            currentValue = "";
            return;
        }
        
        const result = factorial(num);
        displayValue = String(result);
        currentValue = String(result);
        return;        
    }
    
    else if (opKey === "cube") {

        const num = Number(currentValue);
        const result = num * num * num;

        displayValue = String(result);
        currentValue = String(result);

        number = null;
        operation = null;
        return;
    }

    else if(opKey === "sqrt"){
        const num = Number(currentValue);
        if(num < 0){
            displayValue = "ERROR: Samo za brojeve >= 0!";
            number = null;
            operation = null;
            currentValue = "";
            return;
        }
        const result = Math.sqrt(num);

        displayValue = String(result);
        currentValue = String(result);
        return;
    }

    else if(opKey === "cuberoot"){
        const num = Number(currentValue);
        const result = Math.cbrt(num);

        displayValue = String(result);
        currentValue = String(result);
        return;
    }

    else if(opKey === "log"){
        const num = Number(currentValue);
        const result = Math.log10(num);

        displayValue = String(result);
        currentValue = String(result);
        return;
    }

    number = currentValue;
    displayValue += " " + btn.label + " ";
    operation = btn.label;
    currentValue = "";
}

function isEqual(first, op, second){

    if(first === null || op === null)return;
    if(currentValue === "")return;

    let result;
    first = Number(first);
    second = Number(second);

    if(op === "+")result = first + second;
    else if(op === "-")result = first - second;
    else if(op === "x")result = first * second;
    else if(op === "÷"){

        if(second === 0){
            displayValue = "ERROR: Nemoguće dijeliti sa nulom!";
            number = null;
            operation = null;
            currentValue = "";
            return;
        }
        else
            result = first / second;
    }

    number = null;
    operation = null;
    currentValue = String(result);
    displayValue = currentValue;
}

function handleAction(btn){

    if(btn.value === "clear"){
        number = null;
        currentValue = "";
        operation = null;
        displayValue = "";
    }

    else if(btn.value === "shift"){
        shiftMode = !shiftMode;
        updateButtonLabels();
    }

}

function updateButtonLabels() {
    const domButtons = document.querySelectorAll("#buttons button");

    domButtons.forEach(domBtn => {
        
        const id = domBtn.dataset.id;
        const btnData = buttons.find(b => b.id === id);

        if (!btnData) return;

        if (shiftMode && btnData.shiftLabel) {
            domBtn.textContent = btnData.shiftLabel;
        } else {
            domBtn.textContent = btnData.label;
        }
    });    

}

function factorial(n) {
    if (n < 0) return null;      
    if (n === 0) return 1;       
    return n * factorial(n - 1); 
}
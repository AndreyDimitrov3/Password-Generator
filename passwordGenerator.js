document.addEventListener('DOMContentLoaded', function(){
    //Declare Variables
    const upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const lowerCaseLetters = ['a', 'b','c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z'];
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const symbols = ['^', '(', '!', ')', '$', '*', '#', '%', '&', '@', '_', '-', '?', '^'];
    let allowedSymbols = [];
    let randomPassword = '';
    let securityChecker = 0;
    const range = document.getElementById("range");
    const inputValue = document.getElementById('inputValue');
    const securityText = document.getElementById('strengthIndicatorP');
    
    // Generate Random Password
    document.getElementById('generate').addEventListener('click', generatePassword);
    function generatePassword() {
        allowedSymbols = [];
        randomPassword = '';
        securityChecker = 0;

        if(document.getElementById('upperCase').checked) allowedSymbols = allowedSymbols.concat(upperCaseLetters);
        if(document.getElementById('lowerCase').checked) allowedSymbols = allowedSymbols.concat(lowerCaseLetters);
        if(document.getElementById('numbers').checked) allowedSymbols = allowedSymbols.concat(numbers); securityChecker += 80;
        if(document.getElementById('symbols').checked) allowedSymbols = allowedSymbols.concat(symbols); securityChecker += 80;
        if(allowedSymbols.length === 0) return;

        securityChecker += (allowedSymbols.length * 0.2) * (range.value * 10);
        console.log(securityChecker);

        if(securityChecker > 2050) {
            securityText.innerText = 'Strong';
            document.querySelectorAll('.strengthIndicator').forEach(function(el) {
                el.style.backgroundColor = 'rgb(163, 255, 174)';
                el.style.borderColor = 'rgb(163, 255, 174)'
            })
        } else if (securityChecker > 1300) {
            securityText.innerText = 'Medium';
            for(let i = 1; i < 4; i++) {
                document.getElementById(`strengthIndicator${i}`).style.backgroundColor = 'rgb(248, 203, 99)';
                document.getElementById(`strengthIndicator${i}`).style.borderColor = 'rgb(248, 203, 99)';
            }
            document.getElementById(`strengthIndicator4`).style.backgroundColor = 'transparent';
            document.getElementById(`strengthIndicator4`).style.borderColor = 'white';
        } else if (securityChecker > 500) {
            securityText.innerText = 'Weak';
            for(let i = 1; i < 3; i++) {
                document.getElementById(`strengthIndicator${i}`).style.backgroundColor = 'rgb(251, 122, 86)';
                document.getElementById(`strengthIndicator${i}`).style.borderColor = 'rgb(251, 122, 86)'
            }

            for(let i = 3; i < 5; i++) {
                document.getElementById(`strengthIndicator${i}`).style.backgroundColor = 'transparent';
                document.getElementById(`strengthIndicator${i}`).style.borderColor = 'white'
            }
        } else{
            securityText.innerText = 'Too Weak!';
            for(let i = 2; i < 5; i++) {
                document.getElementById(`strengthIndicator${i}`).style.backgroundColor = 'transparent';
                document.getElementById(`strengthIndicator${i}`).style.borderColor = 'white'
            }
            document.getElementById(`strengthIndicator1`).style.backgroundColor = 'rgb(247, 75, 75)';
            document.getElementById(`strengthIndicator1`).style.borderColor = 'rgb(247, 75, 75)'
        }

        for(let i = 0; i < range.value; i++) {
            let randomNumber = randomInt();
            randomPassword += allowedSymbols[randomNumber];
        }

        inputValue.value = randomPassword;
    }


    document.getElementById('copyIcon').addEventListener('click', copyPassword);
    function copyPassword() {
        inputValue.select();
        inputValue.setSelectionRange(0, 21);
        navigator.clipboard.writeText(inputValue.value);
        window.getSelection().removeAllRanges();
    }

    range.addEventListener('input', updateRangeValue);
    function updateRangeValue()  {
        document.getElementById('characterLengthValue').innerText = range.value
    }

    // Update the background based on the slider value
    range.oninput = updateBackground;
    window.onload = updateBackground;
    function updateBackground() {
        let value = (range.value - range.min) / (range.max - range.min) * 100;
        range.style.background = 'linear-gradient(to right, hsl(127, 100%, 82%) 0%, hsl(127, 100%, 82%) ' + value + '%, hsl(248, 15%, 11%) ' + value + '%, hsl(248, 15%, 11%) 100%)';
    }

    function randomInt() {
        let allowedSymbolsLength = allowedSymbols.length;
        return Math.floor(Math.random() * allowedSymbolsLength);
    }
})

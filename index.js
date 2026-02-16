const displayInput = document.getElementById('inputValue')

const operators = ['-', '+', '%', '*', '/']
let operations = []
let currValue = ''

function handleInteraction(value) {
    if (operators.includes(value)) {
        handleOperatorInput(value)
    } else {
        handleNumericInput(value)
    }
    updateUI()
}

function handleNumericInput(value) {
    // Prevent multiple decimals
    if (value === '.' && currValue.includes('.')) return

    currValue += value
}

function handleOperatorInput(value) {
    if (!currValue) return

    operations.push(currValue)
    operations.push(value)
    currValue = ''
}

function handleEvaluate() {

    // If user presses "=" with only one number
    if (operations.length === 0 && currValue) {
        currValue = parseFloat(currValue).toFixed(2)
        updateUI()
        return
    }

    if (operations.length === 0) return

    if (currValue) {
        operations.push(currValue)
    } else {
        operations.pop() // remove trailing operator
    }

    let finalAmount = parseFloat(operations[0])

    for (let i = 2; i < operations.length; i += 2) {
        const operator = operations[i - 1]
        const nextValue = parseFloat(operations[i])

        switch (operator) {
            case '+':
                finalAmount += nextValue
                break
            case '-':
                finalAmount -= nextValue
                break
            case '*':
                finalAmount *= nextValue
                break
            case '/':
                finalAmount /= nextValue
                break
            case '%':
                finalAmount %= nextValue
                break
        }
    }

    operations = []
    currValue = finalAmount.toFixed(2)
    updateUI()
}

function handleReset() {
    currValue = ''
    operations = []
    updateUI()
}

function updateUI() {
    const displayString = operations.join(' ') + ' ' + currValue
    displayInput.innerText = displayString.trim() ? displayString : '0'
}

// global variables
let inventory = {
    items: [
        {
            name: "Sword",
            actions: ["Drop", "Attack"]
        },
        {
            name: "Mysterious box",
            actions: ["Use", "Drop"]
        },
        {
            name: "Dagger",
            actions: ["Use", "Drop"]
        }
    ]
}

let outputHistory = ''

let prompt = `You will respond to input as a classic text adventure game. You will never break
character and you will only respond with the appropriate output for the command given. If I enter a new room, give a detailed description of the new room. Each response will contain directions of where the user can go. If a user cannot reasonably perform a
command given, respond with 'You can't do that' and the reason why. Occasionally make sarcastic comments about the player's choices.

Here is the context of previous messages:`

async function handleInput() {

    // Assign variables
    inputBox = document.getElementById('input')
    output = document.getElementById('output')
    
    // Check for empty command
    if(inputBox.value == '') {
        return
    }

    printToOutput('\n' + '> '+ inputBox.value)
    inputBox.value = ''
    await callGPT(inputBox.value, outputHistory)
}

function toggleLoading() {
    let loading = document.getElementById('loading')
    loading.style.color = (loading.style.display === 'none' ? loading.style.display = 'flex' : loading.style.display = 'none')
}

function printInventory() {
    let inventoryContainer = document.getElementById('invDiv')
    inventoryContainer.innerHTML = 'Inventory ------------'
    inventory.items.forEach(item => {
        const itemDiv = document.createElement('div')
        itemDiv.classList.add('inv-item')

        const itemName = document.createElement('span')
        itemName.classList.add('item-name')
        itemName.innerText = '--' + item.name
        itemDiv.appendChild(itemName)

        const actionDiv = document.createElement('div')
        actionDiv.classList.add('action-div')
        itemDiv.appendChild(actionDiv)

        item.actions.forEach(action => {
            const actionButton = document.createElement('button')
            actionButton.classList.add('action-button')
            actionButton.classList.add('rounded')
            actionButton.innerText = action
            actionDiv.appendChild(actionButton)
        })
        inventoryContainer.appendChild(itemDiv)
    })

}

function printToOutput(outputText) {
    let output = document.getElementById('output')
    // output.innerText += outputText + '\n'
    outputText += '\n'
    outputHistory += outputText
    animateText(outputText, 'output')
    output.scrollTop = output.scrollHeight
}

async function handleSeed() {
    output = document.getElementById('output')
    input = document.getElementById('input')
    output.style.display = "block"
    document.getElementById('invDiv').style.display = "block"
    let seed = document.getElementById('seed')
    console.log('Seed: ' + seed.value)
    seed.style.display = "none"
    document.getElementById('seedP').style.display = "none"
    let prompt = 'The genre for this text adventure is inspired by ' + seed.value
    toggleLoading() // So that the loading div starts in the correct state
    await callGPT(prompt, "Where am I?")
    input.style.display = "block"
}

async function callGPT(input, context, tries = '3') {
    toggleLoading()
    let apiKeyRes = await (await fetch("./config.json")).json()
    let apiKey = apiKeyRes.apiKey
    let apiUrl = 'https://api.openai.com/v1/chat/completions'
    const requestData = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": `${prompt + context}`},
            {"role": "user", "content": `${input}`}
        ],
        "temperature": 0.50
      };
      console.log("Request body:")
      // console.log(requestData)
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      };
      
      try {
        let response = await fetch(apiUrl, requestOptions)
        let data = await response.json()
        toggleLoading()
        let message = (data.choices[0].message.content)
        printInventory()
        printToOutput(message)
    } catch (e) {
        toggleLoading()
        console.error('API Request Error:', error)
        if (tries != 0) {
            console.log(`Automatically retrying... ${tries} left`)
            callGPT(input, context, (tries - 1))
        }
        else {
            printToOutput(`Network error ${error}. Please try again or refresh if issue persists.`)
        }
    }
}

function animateText(sentence, outputElement) {
    const words = sentence.split(' ');
    
    const outputDiv = document.getElementById(outputElement);
    words.forEach((word, index) => {
      const wordDiv = document.createElement('span');
      wordDiv.textContent = word + ' ';
      wordDiv.classList.add('word');
      wordDiv.style.animationDelay = `${0.04 * (index + 1)}s`;
      outputDiv.appendChild(wordDiv);
    })
    outputDiv.appendChild(document.createElement('br'))
    outputDiv.appendChild(document.createElement('br'))
    }
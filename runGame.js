// global variables
let inventory = []

let outputHistory = ''

let prompt = `You are a sarcastic, caustic narrator in a classic text adventure game. You will never break
character and you will only respond with the appropriate output for the command given. If I enter a new room, give a detailed description
of the new room. Each response will contain directions of where the user can go. If a user cannot reasonably perform a
command given, respond with the reason why. Include an item in your description of every room
for the player to pick up if they want, but only put it in their inventory if they ask for it.
At the end of each message no matter what the player says, respond with an array containing the player's inventory if
there is anything, like this:
["book", "sword", "mysterious box"]

You need to keep track of the inventory array over time, so that the user has a consistent experience. When the user adds or drops an item from the inventory, go through the context thoroughly to determine what should be in the inventory.

If there is previous context, return the most recent array from there instead unless the current action has altered it, in which case return the updated array.
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
    if (inventory.length != 0) {
        console.log('stuff')
    for (item of inventory) {
        const itemDiv = document.createElement('div')
        itemDiv.classList.add('inv-item')

        const itemName = document.createElement('span')
        itemName.classList.add('item-name')
        itemName.innerText = '--' + item
        itemDiv.appendChild(itemName)

        // const actionDiv = document.createElement('div')
        // actionDiv.classList.add('action-div')
        // itemDiv.appendChild(actionDiv)

        // item.actions.forEach(action => {
        //     const actionButton = document.createElement('button')
        //     actionButton.classList.add('action-button')
        //     actionButton.classList.add('rounded')
        //     actionButton.innerText = action
        //     actionDiv.appendChild(actionButton)
        // })
        inventoryContainer.appendChild(itemDiv)
}
}
}

function printToOutput(outputText) {
    let output = document.getElementById('output')
    // output.innerText += outputText + '\n'
    outputText += '\n'
    outputHistory += outputText
    invIndex = outputText.indexOf('[')
    if (invIndex != 0 && invIndex != -1) outputText = (outputText.slice(0,invIndex) + '\n')
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
        try {
            let invIndex = data.choices[0].message.content.indexOf('[')
            let message = data.choices[0].message.content
            if (invIndex != -1) {
                // if (invIndex != 0) message = message.slice(0, invIndex)
                let newInventory = message.slice(invIndex)
                console.log(newInventory)
                if (newInventory != '') {
                    inventory = JSON.parse(newInventory)
                }
            }
            printInventory()
            printToOutput(message)
        }
        catch (e) {
            console.error(e)
            printToOutput('Network error occurred. Please try again.')
        }
    } catch (error) {
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
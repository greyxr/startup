// global variables
let roomObj = ''
let playerObj = ''
let outputTotal = ''
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
// let prompt = `You are a text adventure generator. When I give you input, you will respond with a JSON object containing an array of "rooms". Each room will contain a numerical id, a description of the room, a verbose description of the room, a "directions" array, and an "items" array.
// Each room.description and room.verbose_description should contain descriptions of what directions the user can move in. Every room should lead to at least one other room.
// The "directions" array will contain objects containing a direction the user can move in and the corresponding ID of the room.
// Each object in the "items" array should contain a description and a verbose_description. In these descriptions, only reference the object, not the room. The descriptions and items in the rooms should be inspired from the input I give you.
// Generate 10 room starting with room id 1.`

let prompt = `You will respond to input as a classic text adventure game. You will never break
character and you will only respond with the appropriate output for the command given. If I enter a new room, give a detailed description of the new room. Each response will contain directions of where the user can go. If a user cannot reasonably perform a
command given, respond with 'You can't do that' and the reason why.

Here is the context of previous messages:`

//  1 room: response: 84, total: 264
// 10 rooms: response 1090, total: 1268

async function handleInput() {


    // Assign variables
    inputBox = document.getElementById('input')
    output = document.getElementById('output')
    
    // Check for empty command
    if(inputBox.value == '') {
        return
    }

    printToOutput('> '+ inputBox.value)
    inputBox.value = ''
    await callGPT(inputBox.value, output.innerHTML)
    // let currentRoom = getRoom(roomObj, playerObj)

    // // handle input
    // let command = parseCommand(inputBox.value)
    // if (command.error != null) {
    //     printToOutput(command.message)
    //     inputBox.value = ''
    //     return
    // }

    // let newOutput = ''
    // // get output
    // switch(command.action) {
    //     case 'travel':
    //         if (travel(currentRoom, playerObj, command.subject) == null) {
    //             printToOutput('You can\'t go that way.')
    //         } else {
    //             printRoom()
    //         }
    //     case 'look':
    //         if (command.subject === 'room') {
    //             printRoom()
    //         } else {
    //             printToOutput('Functionality not implemented yet.')
    //         }
    // }

    // // print output

    // console.log("Player:")
    // console.log(playerObj)
    // console.log("Current Room:")
    // console.log(getRoom(roomObj, playerObj))
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
        itemName.innerText = '-- ' + item.name
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

function getRoom(roomObj, playerObj) {
    return roomObj.rooms.find((room) => room.id == playerObj.currentRoom)
}

function printToOutput(outputText) {
    let output = document.getElementById('output')
    output.innerText += outputText + '\n'
    output.scrollTop = output.scrollHeight
}

function travel(room, playerObj, direction) {
    if (room.directions[direction] == null) {
        console.log("Invalid direction!")
        console.log(room.directions)
        return null
    } else {
        console.log("Valid direction!")
        playerObj.currentRoom = room.directions[direction]
        return 'Traveled'
    }
}

function printRoom() {
    let output = document.getElementById('output')
    let currentRoom = roomObj.rooms.find((room) => room.id == playerObj.currentRoom)
    console.log(playerObj)
    console.log(currentRoom)
    if (playerObj.verbose) {
        output.innerText += currentRoom.verboseDescription + '\n'
    } else {
        output.innerText += currentRoom.description + '\n'
    }
    for (item of currentRoom.items) {
        output.innerText += item.roomDescription + '\n'
    }

    output.scrollTop = output.scrollHeight
}

function testJS() {
    console.log("Hello!")
}

async function setUpGame() {
    output = document.getElementById('output')
    input = document.getElementById('input')

    output.style.display = "block"
    input.style.display = "block"

    // let roomRes = await fetch("./rooms.json")
    // roomObj = await roomRes.json()
    // let playerRes = await fetch("./player.json")
    // playerObj = await playerRes.json()
    // playerObj.currentRoom = roomObj[0].id

    // await initialPrint()
}

async function initialPrint() {
    console.log("Initial printing")
    printRoom()
}

async function handleSeed() {
    document.getElementById('invDiv').style.display = "block"
    let seed = document.getElementById('seed')
    console.log('Seed: ' + seed.value)
    seed.style.display = "none"
    document.getElementById('seedP').style.display = "none"
    let prompt = 'The genre for this text adventure is inspired by ' + seed.value
    toggleLoading() // So that the loading div starts in the correct state
    await callGPT(prompt, "Where am I?")
    console.log("initialStart: ")
    // printToOutput(initialStart)
    setUpGame()
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
        // Handle the API response data
        // console.log('API Response:', data);
        //   roomObj = JSON.parse(data.choices[0].message.content)
        //   console.log(roomObj)
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

function parseCommand(input) {
    // parseCommand will take a string that should contain
    // an action and an object. If valid, it returns
    // the input turned into an object with the
    // command.

    // Each subject, in each room and in general, should have appropriate
    // responses for each valid action that can be applied to it.
    // That way, validation becomes a matter of checking the action
    // against the available actions from the object and returning the
    // appropriate response. Putting in a custom action becomes a
    // matter of adding it to the lexicon in checkSubject, but only
    // adding it to the specific subject you want it to apply to.
    // Some universally applicable actions (like 'examine') won't
    // be checked. It should be noted that even if an action is invalid,
    // the action should be attached if you want to return input to the player.
    // The only reason an action should not be attached is if you want
    // the command to return as invalid.

    // Alternate idea: not attach actions that wouldn't do anything, and just
    // attach a list of valid actions. If an action is not in the list,
    // have an error message for each invalid subject.

    exampleSubjectList = [{
        name: 'the rusty sword',
        description: 'it is a rusty sword',
        push: 'Push a sword?',
        eat: 'You don\'t want to do that...'
    }]

    console.log("In parseCommand: " + input)
    // Sanitize and check input to make sure it is not empty and has more than one word
    if (input == null) {
        return throwError("No command recognized.")
    }
    let inputList = String(input).trim().split(' ')
    if (inputList[1] == null) {
        let singleCommand = checkSingleCommand(inputList[0])
        if (singleCommand != null) {
            return singleCommand
        } else {
            return throwError("Command requires at least two words")
        }
    }

    console.log("Input list: " + inputList)

    // Check for a valid action
    console.log("Checking action " + inputList[0])
    let action = getAction(inputList[0])
    if (action == null) {
        return throwError("Action error")
    }

    console.log("Action: " + action)

    let actionLength = inputList[0].length
    let subject = validateSubject(input.slice(actionLength).trim())
    if (subject == null) {
        return throwError("Subject error")
    }

    // If subject and action pass validation, return as JSON object
    return {
        action: action,
        subject: subject
    }
}

function checkSingleCommand(command) {
    let commands = [
        ['north', 'n'],
        ['west', 'w'],
        ['east', 'e'],
        ['south', 's'],
        ['northwest', 'nw'],
        ['southwest', 'sw'],
        ['northeast', 'ne'],
        ['southeast', 'se'],
    ]
    for (const list of commands) {
        if (list.includes(command)) {
            return {action: "travel", subject: list[0]}
        }
    }
    if ((['examine', 'x', 'look', 'l']).includes(command)) {
        return {action: "look", subject: "room"}
    }
    return null
    
}

function getAction(currentWord) {
    // Check for valid actions

    let travel = ['travel', 'go', 'walk', 'run', 'head', 'travel']
    let actions = ['actions', 'pick', 'take', 'drop', 'release', 'throw', 'wield', 'look']
    let commands = [travel, actions]
    for (const list of commands) {
        if (list.includes(currentWord) && (currentWord !== list[0])) {
            return list[0]
        }
    }
    return null
}

function validateSubject(subject) {
    // Check room specific subjects

    // Check general subjects
    let commands = [
        ['north', 'n'],
        ['west', 'w'],
        ['east', 'e'],
        ['south', 's'],
        ['northwest', 'nw'],
        ['southwest', 'sw'],
        ['northeast', 'ne'],
        ['southeast', 'se']
    ]
    for (const list of commands) {
        if (list.includes(subject)) {
            return list[0]
        }
    }
    return null
}

function handleInvalidSubject(action) {
    // handleInvalidSubject should return the
    // appropriate response for each invalid
    // subject.
}

function throwError(message) {
    return {
        error: true,
        message: message
    }
}

function handleDirections() {}

function handleActions() {}

function handleMisc() {}

function handleCombat() {}
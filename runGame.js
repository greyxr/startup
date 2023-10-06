// global variables
let roomObj = ''
let playerObj = ''

async function handleInput() {
    // let roomObj = {
    //     "rooms": [
    //       {
    //         "id": 1,
    //         "description": "You are in a dusty old library with shelves full of books. To the north, you see a doorway.",
    //         "verboseDescription": "The room is dimly lit, and the air smells musty. Dust motes dance in the light streaming through the windows. There is a doorway to the north.",
    //         "objects": [
    //           {
    //             "name": "book",
    //             "description": "An old, weathered book on the top shelf.",
    //             "actions": {
    //               "read": "You can read the book."
    //             }
    //           },
    //           {
    //             "name": "table",
    //             "description": "A wooden table covered in dust.",
    //             "actions": {
    //               "examine": "You can examine the table."
    //             }
    //           }
    //         ],
    //         "directions": {
    //           "north": 2
    //         }
    //       },
    //       {
    //         "id": 2,
    //         "description": "You find yourself in a kitchen with a large stove and a dining table. To the south, you see a doorway. To the east, you see a garden.",
    //         "verboseDescription": "The room is clean and organized. The smell of freshly baked bread fills the air. There is a doorway to the south and a garden to the east.",
    //         "objects": [
    //           {
    //             "name": "stove",
    //             "description": "A modern stainless steel stove.",
    //             "actions": {
    //               "turnOn": "You can turn on the stove."
    //             }
    //           },
    //           {
    //             "name": "table",
    //             "description": "A wooden dining table set for a meal.",
    //             "actions": {
    //               "inspect": "You can inspect the table."
    //             }
    //           }
    //         ],
    //         "directions": {
    //           "south": 1,
    //           "east": 3
    //         }
    //       },
    //       {
    //         "id": 3,
    //         "description": "You are in a garden surrounded by blooming flowers and lush greenery. To the west, you see a doorway. To the north, you see a basement entrance.",
    //         "verboseDescription": "The garden is peaceful and full of life. Birds are chirping and flitting around. There is a doorway to the west and a basement entrance to the north.",
    //         "objects": [
    //           {
    //             "name": "flowers",
    //             "description": "Vibrant and colorful flowers of various kinds.",
    //             "actions": {
    //               "smell": "You can smell the flowers."
    //             }
    //           },
    //           {
    //             "name": "bench",
    //             "description": "A sturdy wooden bench.",
    //             "actions": {
    //               "sit": "You can sit on the bench."
    //             }
    //           }
    //         ],
    //         "directions": {
    //           "west": 2,
    //           "north": 4
    //         }
    //       },
    //       {
    //         "id": 4,
    //         "description": "You find yourself in a spooky basement with cobwebs and dim lighting. To the south, you see a garden. To the east, you see a treasure room.",
    //         "verboseDescription": "The air is damp and cold. Strange sounds echo through the darkness. There is a garden to the south and a treasure room to the east.",
    //         "objects": [
    //           {
    //             "name": "spiderweb",
    //             "description": "A thick, sticky spiderweb stretching across the corner.",
    //             "actions": {
    //               "touch": "You can touch the spiderweb."
    //             }
    //           },
    //           {
    //             "name": "box",
    //             "description": "A small, mysterious box covered in dust.",
    //             "actions": {
    //               "open": "You can open the box."
    //             }
    //           }
    //         ],
    //         "directions": {
    //           "south": 3,
    //           "east": 5
    //         }
    //       },
    //       {
    //         "id": 5,
    //         "description": "You are in a treasure room with glittering gold and jewels. To the west, you see a basement entrance.",
    //         "verboseDescription": "The room is filled with dazzling treasures. You've hit the jackpot! There is a basement entrance to the west.",
    //         "objects": [
    //           {
    //             "name": "gold",
    //             "description": "Shiny gold coins and bars.",
    //             "actions": {
    //               "grab": "You can grab some gold."
    //             }
    //           },
    //           {
    //             "name": "jewels",
    //             "description": "Sparkling jewels of various colors and sizes.",
    //             "actions": {
    //               "examine": "You can examine the jewels."
    //             }
    //           }
    //         ],
    //         "directions": {
    //           "west": 4
    //         }
    //       }
    //     ]
    //   }


    // Assign variables
    inputBox = document.getElementById('input')
    output = document.getElementById('output')
    
    // Check for empty command
    if(inputBox.value == '') {
        return
    }

    output.innerHTML += '> ' + inputBox.value + '<br>'
    let currentRoom = getRoom(roomObj, playerObj)

    // handle input
    let command = parseCommand(inputBox.value)
    if (command.error != null) {
        printToOutput(command.message)
        inputBox.value = ''
        return
    }

    let newOutput = ''
    // get output
    switch(command.action) {
        case 'travel':
            if (travel(currentRoom, playerObj, command.subject) == null) {
                printToOutput('You can\'t go that way.')
            } else {
                printRoom()
            }
    }

    // print output

    console.log("Player:")
    console.log(playerObj)
    console.log("Current Room:")
    console.log(getRoom(roomObj, playerObj))

    inputBox.value = ''
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
    for (object of currentRoom.objects) {
        output.innerText += object.roomDescription + '\n'
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

    let roomRes = await fetch("./rooms.json")
    roomObj = await roomRes.json()
    let playerRes = await fetch("./player.json")
    playerObj = await playerRes.json()

    await initialPrint()
}

async function initialPrint() {
    console.log("Initial printing")
    printRoom()
}

function handleSeed() {
    let seed = document.getElementById('seed')
    console.log('Seed: ' + seed.value)
    seed.style.display = "none"
    document.getElementById('seedP').style.display = "none"
    setUpGame()
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
        let singleCommand = checkSingleCommand(inputList[1])
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

function checkSingleCommand() {

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
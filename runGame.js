import { parseCommand } from './textParser.js'

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
    let roomRes = (await fetch("./rooms.json"))
    let roomObj = await roomRes.json()
    let playerRes = (await fetch("./player.json"))
    let playerObj = await playerRes.json()
    let currentRoom = roomObj.rooms.find((room) => room.id == playerObj.currentRoom)

    //printRoom(currentRoom, playerObj)
}

function printRoom(room, playerObj) {
    let output = document.getElementById('output')
    if (playerObj.verbose) {
        output.innerText += room.verboseDescription + '\n'
    } else {
        output.innerText += room.description + '\n'
    }
    for (object of room.objects) {
        output.innerText += object.roomDescription + '\n'
    }
}

function testJS() {
    console.log("Hello!")
}


async function domManip() {
    // Assign variables
    inputBox = document.getElementById('inputBox')
    output = document.getElementById('output')

    // Check for empty command
    if(inputBox.value == '') {
        return
    }
    parseCommand
    await handleInput()
    output.innerHTML += '> ' + inputBox.value + '<br>'
    inputBox.value = ''
}
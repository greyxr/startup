function parseCommand(input) {
    console.log(input)
    inputList = input.split(' ')
    let command = checkWord(inputList[0])
    let currentWord = ''
    let currentCommand = {}
    if (command != null) {
        currentCommand[command] = inputList[0]
        let firstWordLength = inputList[0].length
        currentCommand['remainder'] = input.slice(firstWordLength).trimStart()
        console.log(currentCommand)
    }
    else { (console.log("What?")) }
    // for (const c of input) {
    //     if (c !== ' ' && c !== '%') {
    //         currentWord = currentWord + c
    //     }
    //     if (c === ' ' || c === '%') {
    //         let isValid = checkWord(currentWord)
    //         if (isValid != null) {
    //             currentCommand[isValid] = currentWord
    //         }
    //         currentWord = ''
    //     }
    // }
    // console.log(currentCommand)
}

function checkWord(currentWord) {
    let travel = ['travel', 'go', 'walk', 'run', 'head', 'travel']
    let directions = ['directions', 'north', 'n', 'west', 'w', 'east', 'e', 'south', 's']
    let items = ['items', 'sword', 'dagger', 'bag', 'rock']
    let actions = ['actions', 'pick', 'take', 'drop', 'release', 'throw', 'wield', 'look']
    let commands = [travel, directions, items, actions]
    for (const list of commands) {
        if (list.includes(currentWord) && (currentWord !== list[0])) {
            return list[0]
        }
    }
    return null
}

parseCommand('go north')
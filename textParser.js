function handleInput(input) {
    parseCommand(input)
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

    console.log(input)
    // Sanitize and check input to make sure it is not empty and has more than one word
    if (input == null) {
        return throwError("No command recognized.")
    }
    let inputList = input.split(' ').trim()
    if (inputList[1] == null) {
        return throwError("Command requires at least two words")
    }

    // Check for a valid action
    let action = getAction(inputList[0])
    if (action == null) {
        return throwError("Action error")
    }

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
    let directions = ['directions', 'north', 'n', 'west', 'w', 'east', 'e', 'south', 's']
    let items = ['items', 'sword', 'dagger', 'bag', 'rock']
    let commands = [directions, items]
    for (const list of commands) {
        if (list.includes(currentWord) && (currentWord !== list[0])) {
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

function handleDirections()

function handleActions()

function handleMisc()

function handleCombat()

parseCommand('go north')
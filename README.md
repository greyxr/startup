# Startup Specification

## Xormbalfu -- a simple text adventure
Xormbalfu is a simple text adventure game focused on exploration and collecting treasure. Instead of a parser, input from the user will come from interaction with a series of buttons on the screen, which will expand in scope as the player finds items and equipment. The player explores the ancient alien city of Xormbalfu, trying to retrieve treasure and discover the secrets of the dead city before being eaten by one of the current inhabitants.

The game will feel like a cross between the 1977 text adventure [Zork](https://classicreload.com/zork-i.html) and the 2013 text based RPG [A Dark Room](https://adarkroom.doublespeakgames.com/).

## Key Features
- Secure login
- The ability to persistently save a game and game state
- Ability to play the game within your browser without waiting on the server
- Ability to save your high scores to a leaderboard

## Technologies
#### Authentication:
Authentication will come from a login screen on the home screen of the app. The user will be able to log in securely through HTTPS and retrieve their game state and score.

#### Database Data:
Xormbalfu will utilize an AWS RDS database that contains the game state for each player as well as top scores for the leaderboard.

#### Websocket Data
The app will receive realtime information from other players when a new top score is set.

#### HTML
The app will have three pages -- a page for the game, a page for high scores, and a page for logging in.

#### CSS
The app will have styling that adapts to different screen sizes, as well as mobile devices.

#### Javascript
Xormbalfu will run off of Javascript in the browser.
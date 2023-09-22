# Startup Specification

## Xormbalfu -- a simple text adventure
Website: [startup.xormbalfu.click](startup.xormbalfu.click)

Xormbalfu is a simple text adventure game focused on exploration and collecting treasure. I'm going to try to make a text parser, but if that doesn't work, input from the user will come from interaction with a series of buttons on the screen, which will expand in scope as the player finds items and equipment. The player explores the ancient alien city of Xormbalfu, trying to retrieve treasure and discover the secrets of the dead city before being eaten by one of the current inhabitants.

The game will feel like a cross between the 1977 text adventure [Zork](https://classicreload.com/zork-i.html) and the 2013 text based RPG [A Dark Room](https://adarkroom.doublespeakgames.com/).
<p align="center"><img src="./images/xorm1.png"></p>

## Key Features
- Secure login
- The ability to persistently save a game and game state
- Ability to play the game within your browser
- Ability to request game information as the user plays
- Ability to save your high scores to a leaderboard

## Sketches
### A sketch showing the game screen with a logged in user:
![Game screen](./images/xormbalfu1.png)
### A sketch showing the login screen:
![Game screen](./images/xormbalfu3.png)
### A sketch showing the leaderboard screen with a guest user:
![Game screen](./images/xormbalfu4.png)
## Technologies
#### Authentication:
Authentication will come from a login screen on the home screen of the app. The user will be able to log in securely through HTTPS and retrieve their game state and score.

#### Database Data:
Xormbalfu will utilize an AWS RDS database that contains the game state for each player as well as top scores for the leaderboard.

#### Websocket Data
The app will receive realtime information from other players when a new top score is set.

## Additional Technologies

#### HTML
The app will have three pages -- a page for the game, a page for high scores, and a page for logging in.

#### CSS
The app will have styling that adapts to different screen sizes, as well as mobile devices.

#### Javascript
Xormbalfu will run off of Javascript in the browser.
# BombSweeper

BombSweeper is a Minesweeper clone built using Ruby on Rails, React.js and Bootstrap that uses bombs instead of bombs, while including the option to create an account, log in, save your time and view the fastest times.

## Features

- The BombSweeper game (a clone of Minesweeper that uses bombs instead of bombs)
- The option to save your time after a completed game (upcoming feature)
- User accounts with profiles featuring the user's win percentages and quickest winning times (for each difficulty)
- A scoreboards featuring the best submitted times for all users

## Upcoming Improvements

- Fixing instructions styling
- Add "x" to wrongly flagged squares at the end of the game
- Saving the scores to the backend
- Removing the "Submit Time" button for non-logged in users

## Technologies Used

- Bootstrap
- React.js
- Ruby on Rails

## How To Use

### Set Up

To run the app perform the following steps;

1. Run "git clone https://github.com/PegliOne/bomb_sweeper.git" in the command line

2. Run "cd bomb_sweeper"

3. Run "rails s" then open a new tab

4. In the new tab, run "cd frontend"

5. Run "npm start", then open a browser and navigate to "localhost:3000"

### Gameplay

Left click on a square to reveal it. Revealing the first square starts the timer - unless it's a bomb!

If you reveal a square with a bomb, you lose. If you're logged in, your loss will be stored in the database and will decrease your win percentage for that difficulty.

If the revealed square is safe it will show the number of (horizontally, vertically and diagonally) adjecent squares with bombs.

If no surrounding squares have bombs, the revealed square will appear blank and the surrounding safe squares will automatically be revealed (triggering a cascade of square reveals).

You can right click an unrevealed square to mark it with a flag if you suspect it has a bomb. Right clicking a flagged square removes the flag.

The flag counter below the board intially specifies the number of bombs on the board and decreases as you add flags to the board. You can place as many flags as you like. A negative counter just means you've placed more flags than there are bombs.

Once all the safe squares have been revealed, you win the game. The timer will stop and (if you're logged in) your time will be automatically saved to the database. You can view your quickest winning times and win percentages (for each difficulty) on your user profile.

If you're logged in, you will also see a (functional) "Submit Time" button appear. Click this button to make your time publicly displayable. It will then appear on a public scoreboard (if it is one of the top ten times for that difficulty).

Please note that currently the "Submit Time" button appears to all users after a game is won, but will not do anything if clicked by a non-logged in user. The non-functional "Submit Time" button will be removed for non-logged users in an upcoming update (see upcoming improvements).

If you wish to play again, click the "Reset" button. You can also click this button during a game. Games that are reset don't count towards your win percentages.

Enjoy the game!

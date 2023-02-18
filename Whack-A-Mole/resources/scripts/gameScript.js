// TODO
// Add game ended screen
// Set coins += currentcoins
// Review Code

// Set all variables like streaks, coins, all of that
let coins = 0;
let hammers = 0;
let gameEnded = false;
const chancesOfMole = [1, 1, 1, 1, 1 ,1, 1, 1, 2, 2]; // 1 = mole 2 = bomb
let moleElements = [];
let currentCoins = 0;
let currentStreak = 0;
const coinBoost = 50;

function startGame() {
    // Start countdown
    const gameTimerInvertal = setInterval(() => {
        document.getElementById('gameStartTime').innerHTML = Number(document.getElementById('gameStartTime').innerHTML) - 1;
        if (document.getElementById('gameStartTime').innerHTML == '-1') {
            clearInterval(gameTimerInvertal);
            document.getElementById('gameStartingContainer').remove();
            document.getElementsByClassName('moles-container')[0].style.visibility = 'visible';
        }
    }, 1000);
    // Game Function
    setTimeout(() => {
        // set coins & winstreak to localstorage if not already there
        if (!window.localStorage.coins) {
            window.localStorage.setItem('coins', 0);
        }
        if (!window.localStorage.streak) {
            window.localStorage.setItem('streak', 0);
        }     

        for (let i = 0; i < document.getElementsByClassName('dirt').length; i++) { // Adds mole elements
            moleElements.push(document.getElementsByClassName('dirt')[i]);
        }
        console.log(moleElements);
        // Game loop
        const gameLoop = setInterval(() => {
            if (gameEnded) {
                // Show End Game Elements
                clearInterval(gameLoop);
                const gameEndContainer = document.getElementById('game-end-container');
                gameEndContainer.style.visibility = 'visible';
                // Message
                if (currentCoins >= 1000) {
                    document.getElementById('game-end-message').innerHTML = 'You are a CEETAH!';
                } else if (currentCoins >= 500 && currentCoins <= 999) {
                    document.getElementById('game-end-message').innerHTML = 'Well Done!';
                } else {
                    document.getElementById('game-end-message').innerHTML = 'Better luck next time!';
                }
                // Coin
                document.getElementById('game-end-coins').innerHTML = currentCoins;
                window.localStorage.coins = Number(window.localStorage.coins) + currentCoins;
                // Hammer
                document.getElementById('game-end-hammers').innerHTML = hammers;
                // Streak
                if (currentStreak > Number(window.localStorage.streak)) {
                    window.localStorage.streak = currentStreak;
                    document.getElementById('game-end-streak').innerHTML = `NEW BEST STREAK OF:${window.localStorage.streak}`;
                } else {
                    document.getElementById('game-end-streak').innerHTML = `Streak:${currentStreak}`;
                }
            } else {
                const randomCharacterSelection = chancesOfMole[Math.floor(Math.random() * chancesOfMole.length)];
                console.log(randomCharacterSelection);
                const randomMoleElementSelection = moleElements[Math.floor(Math.random() * moleElements.length)];
                console.log(randomMoleElementSelection);
                // Make mole popup then add a function to the mole that gives lets u get coins or lose like coins 
                console.log(randomMoleElementSelection.firstElementChild); // Gets Img Element
                const randomMoleElementSelectionImage = randomMoleElementSelection.firstElementChild;
                if (randomCharacterSelection == 1) {
                    randomMoleElementSelectionImage.src = './resources/imgs/mole.png';     
                    randomMoleElementSelection.setAttribute('onclick', `clickedCharacter(1, ${moleElements.indexOf(randomMoleElementSelection)})`);
                } else if (randomCharacterSelection == 2) {
                    randomMoleElementSelectionImage.src = './resources/imgs/bomb.png';     
                    randomMoleElementSelection.setAttribute('onclick', `clickedCharacter(2, ${moleElements.indexOf(randomMoleElementSelection)})`);
                }
                setTimeout(() => {
                    randomMoleElementSelectionImage.src = './resources/imgs/hiding-mole.png';     
                    randomMoleElementSelection.removeAttribute('onclick');
                }, 1000)
            }     
        }, 2000);
    }, 5000); 
}

function clickedCharacter(characterNum, moleElementNumber) {
    // clicked Mole
    if (characterNum == 1) {
        currentCoins += coinBoost;
        document.getElementById('coin-stats').innerHTML = currentCoins;
        currentStreak++;
        document.getElementById('streak').innerHTML = currentStreak;
        hammers++;
        document.getElementById('hammers').innerHTML = hammers;
    }
    // clicked Bomb
    else if (characterNum == 2) {
        currentCoins -= coinBoost;
        if (currentCoins < 0) {
            currentCoins = 0;
        }
        document.getElementById('coin-stats').innerHTML = currentCoins;
        currentStreak = 0;
        document.getElementById('streak').innerHTML = currentStreak;
    }
    const moleElement = document.getElementsByClassName('dirt')[moleElementNumber];
    const moleElementImg = moleElement.firstElementChild;
    moleElementImg.src = './resources/imgs/hiding-mole.png';     
    moleElement.removeAttribute('onclick');
}

function autoPlay() {
    setInterval(() => {
        for (let i = 0; i < document.getElementsByClassName('dirt').length; i++) {
            if (document.getElementsByClassName('dirt')[i].firstElementChild.src.includes('/mole.png')) {
                document.getElementsByClassName('dirt')[i].click();
            }
        }
    }, 5);
}

startGame()


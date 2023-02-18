let time = 59;

const gameTimer = setInterval(() => {
    if (!document.getElementById('gameStartingContainer')) {
        if (time == 1) {
            gameEnded = true;
            clearInterval(gameTimer);
        }
        if (document.getElementById('time').innerHTML <= 10) {
            document.getElementById('time').innerHTML = `0${time - 1}`;
        } else {
            document.getElementById('time').innerHTML = time - 1;
        }
        time--;
    }
}, 1000);
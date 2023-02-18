if (window.localStorage.coins && document.getElementById('index-coins')) {
    document.getElementById('index-coins').innerHTML = window.localStorage.coins;
}
if (window.localStorage.streak && document.getElementById('index-streak')) {
    document.getElementById('index-streak').innerHTML = window.localStorage.streak;
}

// Effects 
let fullScreenActive = false;
function mouseDownEffect(buttonNumber, restart) {
    if (restart) {
        document.getElementsByClassName('restart-btn')[0].style.marginTop = '10px';
        return;
    }
    let targetElement = document.getElementsByClassName('game-button')[buttonNumber] || document.getElementById('fullscreen-button');
    console.log('Mouse Down Effect');
    buttonNumber == 2 ? targetElement = document.getElementById('back-button') : targetElement = targetElement;
    targetElement.style.marginTop = '10px';
}

function mouseUpEffect(buttonNumber, restart) {
    if (restart) {
        document.getElementsByClassName('restart-btn')[0].style.marginTop = '0';
        return;
    }
    let targetElement = document.getElementsByClassName('game-button')[buttonNumber] || document.getElementById('fullscreen-button');
    console.log('Mouse Up Effect');
    buttonNumber == 2 ? targetElement = document.getElementById('back-button') : targetElement = targetElement;
    targetElement.style.marginTop = '0';
}

function showSettings() {
    switch (document.getElementsByClassName('options-menu')[0].style.visibility) {
        case 'hidden':
            console.log('Options Menu is now visible');
            document.getElementsByClassName('options-menu')[0].style.visibility = 'visible';
            break;
        case 'visible':
            console.log('Options Menu is now hidden');
            document.getElementsByClassName('options-menu')[0].style.visibility = 'hidden';
            break;
    }
}

function setFullScreen() {
    !fullScreenActive ? document.body.requestFullscreen() : document.exitFullscreen();
    !fullScreenActive ? fullScreenActive = true : fullScreenActive = false;
}

// play game function
function playGame() {
    window.location = './gameScene.html';
}

function returnToIndex() {
    window.location = './index.html';
}

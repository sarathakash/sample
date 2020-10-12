"use strict";

var scores, roundscore, activeplayer, gameplaying, input, winningscore,submit;

init();
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameplaying) {
        //random number
        var dice1 = Math.floor(Math.random() * 6 + 1);
        var dice2 = Math.floor(Math.random() * 6 + 1);
        //Display the result
        var dice1dom = document.querySelector('#dice-1');
        var dice2dom = document.getElementById('dice-2');
        dice1dom.style.display = "block";
        dice2dom.style.display = "block";
        dice1dom.src = `image/dice-${dice1}.png`;
        dice2dom.src = `image/dice-${dice2}.png`;

        //update the score if the rolled number is not 1
        if (dice1 !== 1 && dice2 !== 1) {
            roundscore += dice1 + dice2;
            document.getElementById(`current-${activeplayer}`).innerHTML = roundscore;
        } else {
            //nextplayer
            nextplayer();
        }
    }
});

//nextplayer
function nextplayer() {
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
    roundscore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';
}

//winning score
document.querySelector('.btn-submit').addEventListener('click', submit);
function submit(){
    input = document.querySelector('.final-score').value;

    if (input && input>0) {
        winningscore = input;        
    } else {
        winningscore = 100;       
    }
    document.querySelector('.final-score').setAttribute('disabled','disabled');
}

//hold events
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameplaying) {
        //add current score to the global score
        scores[activeplayer] += roundscore;

        //update the score in global score UI 
        document.getElementById(`score-${activeplayer}`).innerText = scores[activeplayer];

        submit();
        //check if player won the game
        if (scores[activeplayer] >= winningscore) {
            document.querySelector(`#name-${activeplayer}`).innerText = `Winner!`;
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
            gameplaying = false;

        } else {
            //nextplayer
            nextplayer();
        }
    }
})
//new game events
document.querySelector('.btn-new').addEventListener('click', init);
//init
function init() {
    scores = [0, 0];
    activeplayer = 0;
    roundscore = 0;
    gameplaying = true;

    document.querySelector('#dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').innerText = '0';
    document.getElementById('score-1').innerText = '0';
    document.getElementById('current-0').innerText = '0';
    document.getElementById('current-1').innerText = '0';
    document.getElementById('name-0').innerText = 'PLAYER 1';
    document.getElementById('name-1').innerText = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.final-score').removeAttribute('disabled','disabled');
}
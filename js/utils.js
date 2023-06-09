const keys =                                                                        //all keys used for controlling
{
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
};

//collision detection of hurtbox and hitbox
function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

//determine winner
function gameResult({ player, enemy, timerId }) {
    clearTimeout(timerId);
    document.querySelector(".result").style.display = 'flex';

    if (player.health === enemy.health) {
        document.querySelector(".result").innerHTML = 'Tie';
    }
    else if (enemy.health < player.health) {
        document.querySelector(".result").innerHTML = 'Player 1 wins';
    }
    else if (player.health < enemy.health) {
        document.querySelector(".result").innerHTML = 'Player 2 wins';
    }
}


//total round time
let timer = 60;
//time at end of fight
let timerId;
//making timer work and showing result
function decreaseTimer() {

    //timer counting down until hitting zero
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000);
        timer--;
        document.querySelector('#timer').innerHTML = timer;
    }

    //result after timer runsout
    if (timer === 0) {
        gameResult({ player, enemy, timerId });
    }

}
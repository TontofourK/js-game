const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;                                                                //good size for all displays
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;                                                                //falling and staying to the ground

//background
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './assets/background.png'
})

//the shop
const shop = new Sprite({
    position: {
        x: 600,
        y: 127,
    },
    imageSrc: './assets/shop.png',
    scale: 2.75,
    framesMax: 6
})


const player = new Fighter(                                                           //player sprite
    {
        position: {
            x: 0,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0
        },
        offset: {
            x: 0,
            y: 0
        },
        imageSrc: "./assets/samuraiMack/Idle.png",
        framesMax: 8,
        scale: 2.5,
        offset: {
            x: 215,
            y: 157,
        },
        sprites: {
            idle: {
                imageSrc: "./assets/samuraiMack/Idle.png",
                framesMax: 8
            },
            run: {
                imageSrc: './assets/samuraiMack/Run.png',
                framesMax: 8
            },
            jump: {
                imageSrc: './assets/samuraiMack/Jump.png',
                framesMax: 2
            },
            fall: {
                imageSrc: './assets/samuraiMack/Fall.png',
                framesMax: 2
            },
            attack1: {
                imageSrc: './assets/samuraiMack/Attack1.png',
                framesMax: 6
            }
        },
        attackbox: {
            offset: {
                x: 0,
                y: 0
            },
            width: 100,
            height: 50
        }
    })

const enemy = new Fighter(                                                            //enemy sprite
    {
        position: {
            x: 974,
            y: 0
        },
        velocity: {
            x: 0,
            y: 0,
        },
        color: 'green',
        offset: {
            x: -50,
            y: 0
        },
        imageSrc: "./assets/kenji/Idle.png",
        framesMax: 4,
        scale: 2.5,
        offset: {
            x: 215,
            y: 169,
        },
        sprites: {
            idle: {
                imageSrc: "./assets/kenji/Idle.png",
                framesMax: 4
            },
            run: {
                imageSrc: './assets/kenji/Run.png',
                framesMax: 8
            },
            jump: {
                imageSrc: './assets/kenji/Jump.png',
                framesMax: 2
            },
            fall: {
                imageSrc: './assets/kenji/Fall.png',
                framesMax: 2
            },
            attack1: {
                imageSrc: './assets/kenji/Attack1.png',
                framesMax: 4
            }
        },
        attackbox: {
            offset: {
                x: 0,
                y: 0
            },
            width: 100,
            height: 50
        }
    })

console.log(player);

decreaseTimer();

//game functioning after its created
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    background.update();
    shop.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    if (keys.a.pressed && player.lastKey === 'a')                                        //player movement
    {
        player.velocity.x = -5;
        player.switchSprites('run');
    }
    else if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprites('run');
    } else {
        player.switchSprites('idle');
    }

    //jumping
    if (player.velocity.y < 0) {
        player.switchSprites('jump');
    } else if (player.velocity.y > 0) {
        player.switchSprites('fall');
    }

    if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft')                         //enemy movement
    {
        enemy.velocity.x = -5;
        enemy.switchSprites('run');
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprites('run');
    } else {
        enemy.switchSprites('idle');
    }

    //jumping
    if (enemy.velocity.y < 0) {
        enemy.switchSprites('jump');
    } else if (enemy.velocity.y > 0) {
        enemy.switchSprites('fall');
    }


    //player attacking
    if (rectangularCollision({ rectangle1: player, rectangle2: enemy }) && player.isAttacking) {
        player.isAttacking = false;
        console.log("attack");
        enemy.health -= 20;
        document.querySelector('#enemy-health').style.width = enemy.health + '%';
    }

    //enemy attacking
    if (rectangularCollision({ rectangle1: enemy, rectangle2: player }) && enemy.isAttacking) {
        enemy.isAttacking = false;
        console.log("damage done");
        player.health -= 20;
        document.querySelector('#player-health').style.width = player.health + '%';

        //ending game based on health
        if (enemy.health <= 0 || player.health <= 0) {
            gameResult({ player, enemy, timerId });
        }
    }
}

animate();

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':           //player movement
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            player.velocity.y = -20;
            break;
        case 's':
            player.attack();
            break;

        case 'ArrowRight':      //enemy movement
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.attack();
            break;
    }
    console.log(event.key);
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;

        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
})

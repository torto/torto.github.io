var game = new Phaser.Game(900, 500, Phaser.CANVAS, 'center', {
    preload: construtor,
    create: construiu,
    update: animacao
});

var app = {};

function construtor() {
    game.load.image('fundo', 'img/surf/fundo.jpg');
    game.load.image('surfista', 'img/surf/surfista.png');
    game.load.image('mar4', 'img/surf/mar/4.png');
    game.load.image('mar3', 'img/surf/mar/3.png');
    game.load.image('mar2', 'img/surf/mar/2.png');
    game.load.image('mar1', 'img/surf/mar/1-test.png');
    game.load.image('tubarao', 'img/surf/tubarao1.png');
}

function construiu() {

    game.world.setBounds(-200, 0, 1700, 500); // seta tamanho da colisão da tela

    //adiciona as imagens na ela
    adicionandoImagens();

    //setando tipo de fisica
    game.physics.startSystem(Phaser.Physics.P2JS);

    //efeito pingar mais forte
    game.physics.p2.restitution = 0.0;

    //surfista fisica adicionada
    game.physics.p2.enable(app.surfista, false);
    app.surfista.body.fixedRotation = true; //evita que gire loucamente
    app.surfista.body.setRectangle(100, 120); //seta tamanho do body para toque

    //tubarao fisica adicionada
    game.physics.p2.enable(app.tubarao, false);
    game.physics.p2.enable(app.tubarao1, false);
    game.physics.p2.enable(app.tubarao2, false);
    setarValoresTubaroes(app.tubarao);
    setarValoresTubaroes(app.tubarao1);
    setarValoresTubaroes(app.tubarao2);

    //eventos de colisão
    app.surfista.body.createBodyCallback(app.tubarao, colidirTubarao, this);
    app.surfista.body.createBodyCallback(app.tubarao1, colidirTubarao, this);
    app.surfista.body.createBodyCallback(app.tubarao2, colidirTubarao, this);

    game.physics.p2.setImpactEvents(true);

    //setando valor false para não exibir tubaroes
    app.tubarao.exec = true;
    app.tubarao1.exec = false;
    app.tubarao2.exec = false;

    app.cursor = game.input.keyboard.createCursorKeys();

    setInterval(function() {
        if (!app.tubarao.exec) {
            app.tubarao.exec = true;
        } else if (!app.tubarao1.exec) {
            app.tubarao1.exec = true;
        } else {
            app.tubarao2.exec = true;
        }
    }, gerarValoresRandomicos(2000, 5000));

}

function animacao() {
    app.surfista.body.setZeroVelocity();

    // console.log(app.tubarao.x);

    execTubarao();
    execSurfista();
    execMar();
    execControles();

}

function adicionandoImagens() {

    //adicionando fundo
    app.fundo = game.add.image(0, 0, 'fundo');

    //adicionando os mares - Parte 1
    app.mar4 = game.add.tileSprite(0, 331, 1000, 170, 'mar4');
    app.mar3 = game.add.tileSprite(0, 355, 1000, 146, 'mar3');
    app.mar2 = game.add.tileSprite(0, 377, 1000, 124, 'mar2');

    //Adicionando Tubaroes
    app.tubarao = game.add.sprite(1000, 450, 'tubarao');
    app.tubarao1 = game.add.sprite(1000, 450, 'tubarao');
    app.tubarao2 = game.add.sprite(1000, 450, 'tubarao');

    //adicionando os mares - Parte 2
    app.mar1 = game.add.tileSprite(0, 430, 1000, 71, 'mar1');

    //adicionando o surfista
    app.surfista = game.add.sprite(100, 380, 'surfista');
}

function colidirTubarao() {
    alert('Enconstou, assim q app tiver pronto GAME OVER PUTANA!');
}

function setarValoresTubaroes(valor) {
    valor.body.fixedRotation = true; //evita que vire loucamente
    valor.body.setRectangle(150, 70); //seta tamanho do body para toque
    valor.body.setZeroVelocity();
    valor.body.y = 450;
    valor.y = 450;
}

function execTubarao() {
        app.tubarao.body.setZeroVelocity();
        app.tubarao.body.y = 450;
        app.tubarao.y = 450;
        if (app.tubarao.exec) {
            app.tubarao.body.moveLeft(200);
        }

        app.tubarao1.body.setZeroVelocity();
        app.tubarao1.body.y = 450;
        app.tubarao1.y = 450;
        if (app.tubarao1.exec) {
            app.tubarao1.body.moveLeft(200);
        }

        app.tubarao2.body.setZeroVelocity();
        app.tubarao2.body.y = 450;
        app.tubarao2.y = 450;
        if (app.tubarao2.exec) {
            app.tubarao2.body.moveLeft(200);
        }

    if (parseInt(app.tubarao.x, 10) <= -105) {
        app.tubarao.exec = false;
        app.tubarao.body.x = 1050;
    }

    if (parseInt(app.tubarao1.x, 10) <= -105) {
        app.tubarao1.exec = false;
        app.tubarao1.body.x = 1050;
    }

    if (parseInt(app.tubarao2.x, 10) <= -105) {
        app.tubarao2.exec = false;
        app.tubarao2.body.x = 1050;
    }
}

function execMar() {
    app.mar1.tilePosition.x += 1.5;
    app.mar2.tilePosition.x += 1;
    app.mar3.tilePosition.x += 1;
    app.mar4.tilePosition.x += 0.5;
}

function execControles() {
    if (app.cursor.left.isDown) {
        app.surfista.body.moveLeft(300);
    }

    if (app.cursor.right.isDown) {
        app.surfista.body.moveRight(300);
    }

    if (app.cursor.up.isDown) {
        //app.up - verifica se chegou ao topo
        //do pulo, app.up volta para true quando solta o dedo
        if (app.surfista.body.y > 200 && app.up) {
            app.surfista.body.moveUp(600);
        } else {
            app.up = false;
            if (app.surfista.body.y < 380) {
                app.surfista.body.moveDown(600);
            } else {
                app.surfista.body.y = 380; //seta lugar inicio
            }
        }
    }

    if (app.cursor.up.isUp) {
        app.up = true;
        if (app.surfista.body.y < 380) {
            app.surfista.body.moveDown(600);
        } else {
            app.surfista.body.y = 380; //seta lugar inicio
        }
    }
}

function execSurfista() {

    //verifica se surfista esta saindo da tela
    //e torna a posição fixa
    if (parseInt(app.surfista.body.x, 10) < 59) {
        app.surfista.body.x = 59;
    }

    if (parseInt(app.surfista.x, 10) > 825) {
        app.surfista.body.x = 825;
    }
}

function gerarValoresRandomicos(min, max) {
    return Math.random() * (max - min) + min;
}
var game = new Phaser.Game(900, 500, Phaser.CANVAS, 'center', {
    preload: construtor,
    create: construiu,
    update: animacao
});

var app = {};

function construtor() {
    game.load.image('fundo', 'img/bomba/back.jpg');
    game.load.image('terra', 'img/bomba/fundo.png')
    game.load.image('canhao', 'img/bomba/canhao1.png');
    game.load.image('dog', 'img/bomba/cachorro.png');
    game.load.image('homem', 'img/bomba/homem.png');

    app.forca = 0;
    app.angulo = 0;
    app.exec = true; //verificar se esta executando o play
}

function construiu() {
    game.world.setBounds(0, 0, 2000, 500); // seta tamanho da colisão da tela

    //adiciona as imagens na ela
    adicionandoImagens();

    //setando tipo de fisica
    game.physics.startSystem(Phaser.Physics.P2JS);
    //efeito pingar mais forte
    game.physics.p2.restitution = 0.0;
    game.physics.p2.gravity.y = 800;

    //adicionando fisica
    // game.physics.p2.enable(app.terra, true);
    game.physics.p2.enable(app.canhao, false);
    game.physics.p2.enable(app.dog, false);
    game.physics.p2.enable(app.homem, false);

    //seta valor statico canhão
    //iria fazer eles se movimentando 
    //de acordo com o angulo mas desisti
    app.canhao.body.x = 80;
    app.canhao.body.y = 420;
    app.canhao.body.setZeroVelocity();
    app.canhao.body.fixedRotation = true;
    app.canhao.body.collideWorldBounds = false;

    //setando valores staticos do cachorro
    app.dog.body.x = gerarValoresRandomicos(150, 1990);
    app.dog.body.setZeroVelocity();
    app.dog.body.fixedRotation = true;

    //setando valores staticos do homem
    zerarHomem(); // volta todos os valores para os iniciais

    app.homem.body.createBodyCallback(app.dog, colidirDog, this); //evento de toque do homem ao cachorro
    game.physics.p2.setImpactEvents(true); //habilita o callback para eventos de colião

    app.cursor = game.input.keyboard.createCursorKeys(); // pega as keys digitadas

    app.um = game.input.keyboard.addKey(Phaser.Keyboard.ONE); // adiciona o envento para botao 1
    app.um.onDown.add(callUm, this);

    app.dois = game.input.keyboard.addKey(Phaser.Keyboard.TWO); // adiciona o envento para botao 2
    app.dois.onDown.add(callDois, this);

    app.go = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); // adiciona o envento para botao espaço
    app.go.onDown.add(execHomem, this);

    app.exec = true; // evita que de para dar duplo espaço no executar

    //adiciona texto legenda
    app.texto = game.add.text(30, 10, 'Alterar Força: 1/2 - Alterar Angulo: Up/Down - Lançar o Rafa - Espaço - Direcionar camera - left/right', {
        font: "12px sans-serif",
        fill: "#ffffff",
        align: "center"
    });
    inserirTextoForca(); //insere texto de forca e angulo
    inserirTextoAngulo();


}

function animacao() {
    app.canhao.body.setZeroVelocity();
    app.canhao.body.x = 80;
    app.canhao.body.y = 420;

    //verifica se tocou no chão antes de tocar no dog
    if (parseInt(app.homem.body.y, 10) == 428) {
        zerarHomem();
    }

    app.dog.body.setZeroVelocity();

    app.homem.body.angle = 35;

    if (!app.homem.acao) {
        app.homem.body.setZeroVelocity();
        app.homem.body.y = 390;
    }

    execControles();

}

function adicionandoImagens() {

    //adicionando fundo
    app.fundo = game.add.image(0, 0, 'fundo');

    app.terra = game.add.tileSprite(0, 404, 2000, 96, 'terra');

    app.homem = game.add.sprite(120, 390, 'homem');

    app.canhao = game.add.sprite(0, 0, 'canhao');

    app.dog = game.add.sprite(800, 450, 'dog');

}

function execControles() {
    if (app.cursor.up.isDown) {
        app.angulo += 50;
        console.log('Angulo: ' + app.angulo);
        inserirTextoAngulo();
    } else if (app.cursor.down.isDown) {
        app.angulo -= 50;
        console.log('Angulo: ' + app.angulo);
        inserirTextoAngulo();
    }

    if (app.cursor.left.isDown) {
        game.camera.x -= 4;
    } else if (app.cursor.right.isDown) {
        game.camera.x += 4;
    }

}

function callUm() {
    app.forca += 50;
    console.log('Força: ' + app.forca);
    inserirTextoForca();
}

function callDois() {
    app.forca -= 50;
    console.log('Força: ' + app.forca);
    inserirTextoForca();
}

function zerarHomem() {
    app.homem.body.angle = 35;
    app.homem.body.setRectangle(80, 120);
    app.homem.body.fixedRotation = true;
    app.homem.body.x = 120;
    app.homem.body.y = 390;
    app.homem.acao = false;
    app.exec = true;
    game.camera.unfollow();
    game.camera.x = 0;
}

function execHomem() {
    if (app.exec) {
        game.camera.follow(app.homem);
        app.homem.acao = true;
        app.homem.body.velocity.x = app.forca;
        app.homem.body.velocity.y = (app.angulo * -1);
        app.exec = false;
    }
}

function colidirDog() {
    alert('Encontrou!');
    app.dog.body.x = gerarValoresRandomicos(150, 1990);
    zerarHomem();
}

function inserirTextoForca() {

    var montarTexto = 'Força: ' + app.forca;

    if (app.texto.forca) {
        app.texto.forca.text = montarTexto;
    } else {
        var style = {
            font: "12px sans-serif",
            fill: "#ffffff",
            align: "center"
        };
        app.texto.forca = game.add.text(30, 30, montarTexto, style);
    }
}

function inserirTextoAngulo() {

    var montarTexto = 'Angulo: ' + app.angulo;

    if (app.texto.angulo) {
        app.texto.angulo.text = montarTexto;
    } else {
        var style = {
            font: "12px sans-serif",
            fill: "#ffffff",
            align: "center"
        };
        app.texto.angulo = game.add.text(30, 50, montarTexto, style);
    }
}

function gerarValoresRandomicos(min, max) {
    return Math.random() * (max - min) + min;
}
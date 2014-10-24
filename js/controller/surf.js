var app = {
    inicializar: function() {
        // cria a instancia pixi stage
        this.stage = new PIXI.Stage(0xC6C6C6, true);

        //injetar todas as imagens para inserir uma unica vez
        this.gameInjecao = new PIXI.DisplayObjectContainer();
        this.gameInjecaoMar = new PIXI.DisplayObjectContainer();

        this.renderer = PIXI.autoDetectRenderer(900, 500);
        document.getElementById('center').appendChild(this.renderer.view);

        this.carregarOndas();
        this.carregarSurfista();

    },
    carregarOndas: function() {
        // MAR CONFIGURAÇAO
        var ttMar = PIXI.Texture.fromImage("img/mar/1-test.png");
        this.elMar = new PIXI.TilingSprite(ttMar, 1000, 71);

        this.elMar.position.y = 429;

        var ttMar1 = PIXI.Texture.fromImage("img/mar/2.png");
        this.elMar1 = new PIXI.TilingSprite(ttMar1, 1000, 124);

        this.elMar1.position.y = 376;

        var ttMar2 = PIXI.Texture.fromImage("img/mar/3.png");
        this.elMar2 = new PIXI.TilingSprite(ttMar2, 1000, 146);

        this.elMar2.position.y = 354;

        var ttMar3 = PIXI.Texture.fromImage("img/mar/4.png");
        this.elMar3 = new PIXI.TilingSprite(ttMar3, 1000, 170);

        this.elMar3.position.y = 330;

        this.gameInjecaoMar.addChild(this.elMar3);
        this.gameInjecaoMar.addChild(this.elMar2);
        this.gameInjecaoMar.addChild(this.elMar1);
        this.gameInjecaoMar.addChild(this.elMar);

    },
    carregarSurfista: function() {
        //SURFISTA CONFIGURACAO

        var ttSurfista = PIXI.Texture.fromImage("img/surfista.png");
        this.elSurfista = new PIXI.Sprite(ttSurfista);

        this.elSurfista.position.x = 30;
        this.elSurfista.position.y = 260;

        this.gameInjecao.addChild(this.elSurfista);
    },
    inserirStage: function() {
        //inserir imagens e elementos no stage
        this.stage.addChild(this.gameInjecaoMar);
        this.stage.addChild(this.gameInjecao);
    },
    iniciarAnimacao: function() {
        //INICIAR ANIMACAO JOGO
        requestAnimFrame(this.animate);
    },
    animate: function() {
        //MAR ANIMACAO CONSTANTE
        app.elMar.tilePosition.x += 1.5;
        app.elMar1.tilePosition.x += 1;
        app.elMar2.tilePosition.x += 1;
        app.elMar3.tilePosition.x += 0.5;
        //------------------------
        app.renderer.render(app.stage);
        requestAnimFrame(app.animate);
    },
    carregarInicioJogo: function() {
        this.play = true;
        controlesJogo.controleSurfista();
    }
}

var controlesJogo = {
    controleSurfista: function() {
        Mousetrap.bind('right', function() {
            app.elSurfista.position.x += 5;
        });
        Mousetrap.bind('left', function() {
            app.elSurfista.position.x -= 5;
        });
       
        Mousetrap.bind('up', function() {
            for (var i = 0; i <= 10; i++) {
                   app.elSurfista.position.y -= 5;
            };
        });
        Mousetrap.bind('down', function() {
            for (var i = 0; i <= 10; i++) {
                   app.elSurfista.position.y += 5;
            };
        });
    }
}

app.inicializar();
app.inserirStage();
app.iniciarAnimacao();
app.carregarInicioJogo();
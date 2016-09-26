---
layout:     post
title:      "Teste unitário em Ionic - Parte 1"
subtitle:   "Configurar Karma para o Ionic"
date:       2016-09-25 12:00:00
author:     "Torto"
header-img: "img/top-ionic.jpg"
img-face: "/img/unit-test.jpg"
---
### Introdução

Sei que muita gente tem dificuldades com testes unitário, pensando nisso resolvi fazer alguns posts falando um pouco sobre esse assunto. Sei que muita gente utiliza Ionic para desenvolver suas aplicações, nesse post vou ensinar você a configurar o Karma com Jasmine para que possa rodar seus testes unitários maravilhosos <3

Nós próximos posts falarei um pouco em como testar Controllers, Services e Directivas em AngularJS 1.x, legal que você pode encontrar muito material na internet <3, mas focarei sempre no Cordova/Ionic para ajudar aqueles que estão a iniciar com o esse frame lindo.

- **Teste unitário em Ionic - Parte 1**
- Teste unitário em Ionic - Services - Parte 2
- Teste unitário em Ionic - Controllers - Parte 3
- Teste unitário em Ionic - Directives - Parte 4

Caso queira dar uma olhada em como o projeto do teste esta ficando, ou tirar alguma dúvida do cód. completo, esse é o [repositório](https://github.com/torto/unit-test-ionic).

### Instalar Ionic/Cordova

Caso você já tenho o Ionic e o projeto criado não é necessário refazer esse processo, vamos instalar o Ionic/Cordova e criar um novo projeto padrão:

Para instalar o Ionic digite no seu console:

> \# npm install -g cordova ionic

> $ ionic start NomeApp tabs

> $ cd NomeApp

### Configuração do Karma

Agora vamos adicionar as seguintes dependências no nosso projeto, lembrando que iremos utilizar o node(npm) para fazer o download dos mesmo.

* angular-mocks: Dependência que criar mocks no AngularJS;
* jasmine-core: Dep. de teste Jasmine;
* jasmine-jquery: Dep. que usaremos para carregar Jsons para mockar resultados de banco de dados;
* jquery: Dep. necessária para rodar o jasmine-jquery, caso tenha add no bower do teu projeto, não se faz necessário baixar novamente;
* karma: Dep. que executa os testes do Jasmine;
* karma-coverage: Dep. que vai fazer a análise de onde e a porcentagem que seu teste está cobrindo;
* karma-jasmine: Dep. que faz o link do karma com o Jasmine;
* karma-ng-html2js-preprocessor: Dep. que mock todos os htmls para JS, usaremos quando formos testar directivas;
* karma-phantomjs-launcher: Dep. de executa o karma no PhantomJS, browser que roda no terminal.

Para fazer o download basta você executar o seguinte código:

> npm install --save-dev DEPENDÊNCIA

Você deverá fazer isso um por um, ou executar isso:

> npm install --save-dev  angular-mocks jasmine-core jasmine-jquery jquery karma karma-coverage karma-jasmine karma-ng-html2js-preprocessor karma-phantomjs-launcher

Feito, agora vamos adicionar o arquivo de configuração do karma na raíz do seu projeto (karma.config.js):

<script src="//pastebin.com/embed_js/N4RutJne"></script>

Vamos agora entender o que esse arquivo faz, primeiro é nele que configuraremos como nosso o teste irá funcionar.

* basePath:  Seta qual o caminho base dos nossos diretórios;
* frameworks: Seta quais os frames que utilizaremos para o teste, no caso usaremos jasmine;
* files: Seta quais os arquivos que serão carregados pelo karma para rodar os testes, lembre-se que aqui deve adicionar todas as dependências utilizadas no seu sistema;
* ngHtml2JsPreprocessor: Configuração do plugin que transforma todo html em js para que possamos testar as directives;
* exclude: Seta os arquivos que não devem ser carregados pelo karma;
* preprocessors: Seta no karma os plugins que iremos utilizar;
* reporters: Seta quais os relatórios o karma ira utilizar;
* port: Seta qual a porta que utilizaremos para rodar o karma;
* colors: Seta se o console terá cor;
* logLevel: Seta qual o tipo de log que exibira no terminal;
* autoWatch: Seta se o a cada alteração no teu cód. o karma execute novamente os testes;
* browsers: Seta os browser que executaram o teste;
* singleRun: Seta se os testes executará uma única vez.

Agora como setado no arquivo de configuração, todos os arquivos de testes, estarão na pasta “test”, e todos eles devem terminar com a palavra “Test.js” (Ex:IndexControllerTest.js), como o Ionic não cria essa pasta, vá na pasta raiz do seu projeto e crie ela.

### Configuração do Gulp

Agora vamos configurar o gulp para que execute seus testes, é super simples, vamos abrir o arquivo gulpfile.js e adicionar a dependência do karma para o gulp, para isso é só fazer o require do karma:

`var Server = require('karma').Server;`

Depois criar a task “test” e executar o karma:

`gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.config.js'
  }, done).start();
});`

Salve o arquivo e estamos prontos para executar os nossos testes. Para testarmos se tudo esta certinho, basta executar:

> $ gulp test

Pronto seus testes irão executar :D Até a próx.

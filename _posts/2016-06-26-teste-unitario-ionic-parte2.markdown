---
layout:     post
title:      "Teste unitário em Ionic - Services - Parte 2"
subtitle:   "Entendendo como Jasmine funciona e testando seu primeiro Service."
date:       2016-09-26 12:00:00
author:     "Torto"
header-img: "img/top-ionic.jpg"
img-face: "/img/unity-test-ionic/part2.jpg"
---
### Introdução

Muito bom meu amigo, se você chegou aqui significa que você quer ser um programador melhor, poderia ficar horas discorrendo dos benefícios do teste, mas caso você esta aqui significa que já sabe os benefícios que teste automatizado pode trazer para a sua vida.

Mesmo sabendo disso muitas pessoas se sentem perdidas em como e oque testar em seus sistemas, posso ser utópico e dizer que você **deve testar TUDO ter um coverage de 100%**, mas será que se faz necessário isso? Sim faz AhhahAA, mas sei que no dia-a-dia fazer um coverage de 100% é meio difícil, pelo motivo principal: **cód. legado** e muitos outros fatores.

Mas não se desespere meu amigo, fazer teste é uma coisa que demora de fato a aprender e na persistência você realmente vai aprender, então o melhor e principal passo inicial é fazer teste mesmo errando, nesse post vou dar algumas dicas que utilizo para conseguir fazer meus testes espero que ajude a você nesse divisor de águas que são os testes automatizados.

### Sequência de posts

- [Teste unitário em Ionic - Parte 1]({{site.url}}/2016/09/25/teste-unitario-ionic/)
- **Teste unitário em Ionic - Services - Parte 2**
- *Teste unitário em Ionic - Controllers - Parte 3*
- *Teste unitário em Ionic - Directives - Parte 4*

### Testando um Service

Neste post vou ensinar você a testar um Service do AngularJs, para efeito prático usarei o exemplo padrão que vem no Ionic, nesse exemplo é simulado um app de chat, no service da aplicação existe um array com todas as mensagens e três métodos, um para pegar todas as mensagens(all), outro para pegar uma mensagem específica(get) e o último para remover uma mensagem(remove).

Então vamos lá, esse é o cód. do service:

<script src="//pastebin.com/embed_js/xKZ4dR66"></script>

Simples né? Para testar é mais simples ainda. Sei que a maneira mais correta seria criar primeiro os testes para depois desenvolver, mas como esse artigo é focado para iniciantes sei da dificuldade de aprender a testar començando pelos testes para depois ir para o cód., sendo assim esse post e o próximo serão dessa forma e no último post da série eu faço da maneira correta para vocês conseguirem compreender melhor.

Primeiro vamos criar nossa estrutura de pastas e o arquivo JSON para simular o array de chats do service. Dentro da pasta `test` vamos criar as pastas baseado nas rotas do angular, então a primeira pasta a ser criada é `tabs`, e nessa pasta inserimos o nosso arquivo de dados `data.json` que nele conterá o mesmo array de objetos da variável `chats` do nosso service:

<script src="//pastebin.com/embed_js/x0D1JrDJ"></script>

Sabemos que existe três funções, vamos escolher a do método .all() para iniciar nossos testes, primeiro vamos configurar nosso arquivo de teste para conseguir mockar nosso service, para isso é preciso entender como funciona o teste com Jasmine.

Para iniciar o teste é preciso setar um `describe`, nele existe dois parâmetros, o primeiro é uma String, que nela você vai colocar qual o significado daquele teste, o segundo parâmetro é uma function() e dentro dela você iniciará seus testes.
Para iniciar seus asserts é preciso criar outro método e ele se chama `it`, tem as mesmas características do `describe`, uma String e uma função, agora sim dentro dessa função você vai passar seus `expect`. Você pode ficar confuso no início com tudo isso mas depois se acostuma.

Então vamos criar um arquivo dentro da pasta `tabs` chamado: `ChatServiceTest.js` e segue o cód. inicial dos testes:

<script src="//pastebin.com/embed_js/4WWc14Ua"></script>

Nesse momento apenas estruturamos nosso arquivo de teste para que possamos iniciar nossos `asserts`, o primeiro `describe` coloco uma descrição de qual é o nome do nosso service, as próximas três linhas são as configurações para pegar o arquivo json e inserir numa variável, o `beforeEach` executará todas as vezes antes de executar cada `describe` e `it`.

No `beforeEach` no injetamos no teste os nossos modulos da aplicação, como nosso service é independente, ou seja, não há injeção de outros services nele, iremos inserir somente o `starter.services`, em seguida vamos injetar na nossa variável `service` o service que vamos testar chamado `Chats`, isso faz com que injetamos todos os métodos e variáveis do service requerido a essa variável (Mockamos o service <3).

Sempre que vamos testar um conjunto de coisas parecidas criamos um `describe` novo, como nosso código é pequeno usaremos um único `describe` para testar todo nosso service, em seguida criaremos o nosso `it`, lembre-se que as Strings são muito importante para você conseguir identificar em que parte seu cód. esta quebrando e essas strings na hora de exibir o erro vão se concatenar, então pense nelas como um texto <3

![Error in test]({{ site.url }}/img/unity-test-ionic/error.png)

Agora dentro do `it` vamos de fato executar nosso teste, vamos verificar se os dados que o método all() retorna é o mesmo que tem no nosso arquivo json.

<script src="//pastebin.com/embed_js/d8ii81sH"></script>

Agora vamos executar o teste para ver se ele passa, então basta digitar `gulp test` e ver se aparece o verde da alegria, deve aparecer em verde que você possui 1 teste e que esse teste passou <3 e ao mesmo tempo você vai ver o relatório do coverage todo em vermelho, porque ainda falta muita coisa para testarmos <3.

Uma dica importante é que quando executamos o teste ele gera um relatório em html na pasta `coverage` que fica na pasta raiz do projeto, se você entrar lá vai ver todos seus js e se entrar em seu service vai ver quantas vezes o teste passa em cada método e variável do arquivo e em vermelho lugares que ainda não testou, isso é lindo porque fica visível os lugares que faltam testar.

Vamos agora testar o método get(), para isso vamos criar um `it` e executar o método get passando o parâmetro com valor 0 e ver se retorna o primeiro valor do array, segue o cód:

<script src="//pastebin.com/embed_js/8DvQ7QGd"></script>

Está ficando mais fácil entender como os testes funcionam né? Então vamos testar o remove(), só gostaria de lembrar que cada teste depende muito do contexto de cada ação do seu método, então não se acanhe com o tempo você vai pegando o jeitinho <3.
No nosso teste iremos excluir o primeiro valor do nosso array e verificar se nosso array mockado está igual ao array que vem do método:

<script src="//pastebin.com/embed_js/bFZeqe2S"></script>

Vamos agora olhar nosso coverage html, abra o link do nosso service e verifique se existe algo em vermelho. Encontrou algo em vermelho? Se sim é porque falta testar algo…
Aparece em vermelho a seguinte linha `return null` no método get(), ou seja, testamos a saída do método get com valores válidos apenas e esquecemos de testar caso não exista um id válido. Viu como é importante ver a saída do coverage <3, vamos então adicionar um `it` para testar com valor de id inválido:

<script src="//pastebin.com/embed_js/dj5GgZNK"></script>

Se verificar o covarage novamente não vai encontrar mais nenhuma linha em vermelha <3, mas já terminamos? Não, já que você identificou que valores inválidos retornam null, porque não adicionar mais um `expect` no teste do remove verificando se o valor 0 existe e se esta retornando null depois que removido.

<script src="//pastebin.com/embed_js/YDDVLtUN"></script>

Mas porque fazer isso? Já ouviu falar que o teste é a documentação do código? Então uma documentação boa é aquela que existe muitos exemplos e bem escrita, uma linha a mais não vai fazer falta para ninguém e teu cód. ficará melhor escrito.

Segue o [repositório](https://github.com/torto/unit-test-ionic) do projeto inteiro. Até o próximo capitulo.

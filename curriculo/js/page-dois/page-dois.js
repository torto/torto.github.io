'use sctrit';
if (!app) {
    app = {};
}
app.secondPage = (function($) {
    var omundo, encantado, de, tortolandia, horse;

    function loadSecondPage() {
      mixpanel.track("Paginas Acessadas",{
        "page": "Spot Inicial"
      });
      app.loadImagens('dois', '.second-page');
        omundo = $('.o-mundo');
        encantado = $('.encantado');
        de = $('.de');
        tortolandia = $('.tortolandia');
        horse = $('.me-horse');
        var arrayObjetos = [omundo, encantado, de, tortolandia];

        for (var i = 0; i < arrayObjetos.length; i++) {
            loopSecondPage(arrayObjetos[i], i);
        }
        setTimeout(function() {
            horse.animate({
                'width': "100%",
                'left': '0'
            }, {
                duration: 2000,
                specialEasing: {
                    width: "easeOutBounce"
                }
            });
        }, 4000);
    }

    function loopSecondPage(element, i) {
        setTimeout(function() {
            element.animate({
                'width': '100%',
                'top': '0',
                'left': '0',
                'display': 'visible'
            }, {
                duration: 3000,
                specialEasing: {
                    width: "easeOutQuart"
                }
            });
        }, 1000 * i);
    }

    return {
        init: loadSecondPage
    };
})(jQuery);

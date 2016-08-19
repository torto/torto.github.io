var app = {};
(function($) {
  'use strict';
    var body, bLazy;

    function init() {
        initVariables();
        reloadButtons();

        $('.change-second').click(function() {
            changePage('second-page.html');
            // changePage('page-tres.html');
            // changePage('page-quatro.html');
            // changePage('page-cinco.html');
            // changePage('page-seis.html');
            // changePage('page-sete.html');
            // changePage('page-oito.html');
            // changePage('page-nove.html');
        });
    }

    function initVariables() {
        body = $('body');
    }

    function reloadButtons(page) {
      // if(app.audio){
      //   app.audio.pauseAudio();
      // }
        switch (page) {
            case 'second-page.html':
                app.secondPage.init();
            break;
            case 'page-tres.html':
                app.pageTres.init();
            break;
            case 'page-quatro.html':
                app.pageQuatro.init();
            break;
            case 'page-cinco.html':
                app.pageCinco.init();
            break;
            case 'page-seis.html':
                app.pageSeis.init();
            break;
            case 'page-sete.html':
                app.pageSete.init();
            break;
            case 'page-oito.html':
                app.pageOito.init();
            break;
            case 'page-nove.html':
                app.pageNove.init();
            break;
            default:
        }

    }

    function removePage(callback) {
        $('.page').hide("slow", function() {
            this.remove();
            callback();
        });
    }

    function initOtherPage(page) {
        $.get("partials/" + page, function(data) {
            body.hide().append(data).fadeIn('slow');
            reloadButtons(page);
        });
    }

    function changePage(page) {
        removePage(function() {
            initOtherPage(page);
        });
    }

    app.changePage = changePage;

    init();
})(jQuery);

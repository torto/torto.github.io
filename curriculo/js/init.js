var app = {};
(function($) {
  'use strict';
    var body, bLazy;

    function init() {
        initLazyLoadImage();
        initVariables();
        reloadButtons();

        $('.change-second').click(function() {
            changePage('second-page.html');
            // changePage('page-tres.html');
        });
    }

    function initVariables() {
        body = $('body');
    }

    function initLazyLoadImage(){
      bLazy = new Blazy({
        selector: 'img',
        success: function(ele){
            console.log(ele);
            app.audio.checkPauseOrPlay();
        }
      });
      app.getLazyImg = bLazy;
    }
    function reloadImg(){
      bLazy.revalidate();
    }

    function reloadButtons(page) {
      if(app.audio){
        app.audio.pauseAudio();
      }
        switch (page) {
            case 'second-page.html':
                setTimeout(app.secondPage.init(),0);
            break;
            case 'page-tres.html':
                setTimeout(app.pageTres.init(),0);
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
    app.reloadImg = reloadImg;

    init();
})(jQuery);

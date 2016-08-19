'use sctrit';
if (!app) {
    app = {};
}
app.pageNove = (function($) {

    function init() {
      app.loadImagens('nove', '.page-nove');
      // setTimeout(app.changePage('page-nove.html'),8000);
    }


    return {
        init: init
    };

})(jQuery);

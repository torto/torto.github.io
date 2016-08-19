'use sctrit';
if (!app) {
    app = {};
}
app.pageCinco = (function($) {

    function init() {
      setTimeout(function(){
        app.changePage('page-seis.html');
      },8000);
    }


    return {
        init: init
    };

})(jQuery);

'use sctrit';
if (!app) {
    app = {};
}
app.pageSeis = (function($) {

    function init() {
      setTimeout(function(){
        app.changePage('page-sete.html');
      },8000);
    }


    return {
        init: init
    };

})(jQuery);

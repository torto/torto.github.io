'use sctrit';
if (!app) {
    app = {};
}
app.pageSete = (function($) {

    function init() {
      setTimeout(function(){
        app.changePage('page-oito.html');
      },8000);
    }


    return {
        init: init
    };

})(jQuery);

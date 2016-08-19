'use sctrit';
if (!app) {
    app = {};
}
app.pageOito = (function($) {

    function init() {
      setTimeout(function(){
        app.changePage('page-nove.html');
      },8000);
    }


    return {
        init: init
    };

})(jQuery);

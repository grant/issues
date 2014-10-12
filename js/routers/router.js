// Issues Router
var app = app || {};

(function () {
  'use strict';

  $(window).on('hashchange', function() {
    app.view.reset();
  });
})();
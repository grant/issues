// Page Model
var app = app || {};

(function () {
  'use strict';

  // Storage for the page
  app.Page = Backbone.Model.extend({

    defaults: {
      page: 1
    },

    // Goes to the next page of issues
    // @return True if the page number changes
    next: function () {
      var lastPage = this.get('page');
      this.set('page', lastPage + 1);
      return lastPage === this.get('page');
    },

    // Goes to the previous page of issues if available
    // @return True if the page number changes
    prev: function () {
      var lastPage = this.get('page');
      this.set('page', Math.max(1, lastPage - 1));
      return lastPage === this.get('page');
    }
  });

  // Create our global **Page**.
  app.page = new app.Page();
})();
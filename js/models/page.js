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
    next: function () {
      this.set('page', this.get('page') + 1);
    },

    // Goes to the previous page of issues if available
    prev: function () {
      this.set('page', Math.max(1, this.get('page') - 1));
    }
  });

  // Create our global **Page**.
  app.page = new app.Page();
})();
// Page Model
var app = app || {};

(function () {
  'use strict';

  // Storage for the page
  app.Page = Backbone.Model.extend({

    defaults: {
      owner: 'rails',
      repo: 'rails',
      page: 1
    },

    // Sets the page state
    // owner: The Github repo's owner
    // repo: The repo name
    // page: (optional) The page number
    // id: (optional) The id of the issue to look at
    setState: function (state) {
      state = state || {};
      this.set({
        owner: state.owner || this.defaults.owner,
        repo: state.repo || this.defaults.repo,
        page: state.page || this.defaults.page,
        id: state.id
      });
    },

    // Goes to the next page of issues
    // @return True if the page number changes
    next: function () {
      var lastPage = this.get('page');
      this.set('page', lastPage + 1);
      return lastPage !== this.get('page');
    },

    // Goes to the previous page of issues if available
    // @return True if the page number changes
    prev: function () {
      var lastPage = this.get('page');
      this.set('page', Math.max(1, lastPage - 1));
      return lastPage !== this.get('page');
    }
  });

  // Create our global **Page**.
  app.page = new app.Page();
})();
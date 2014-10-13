// Page Model
var app = app || {};

(function () {
  'use strict';

  // Storage for the page
  app.Page = Backbone.Model.extend({

    defaults: {
      owner: 'rails',
      repo: 'rails'
    },

    // Sets the page state
    // owner: The Github repo's owner
    // repo: The repo name
    // page: (optional) The page number
    // id: (optional) The id of the issue to look at
    setState: function (state) {
      state = state || {};
      var updatedData = {
        owner: state.owner || this.defaults.owner,
        repo: state.repo || this.defaults.repo,
        id: state.id,
        changed: !this.get('changed')
      };
      // Only update the page if it is provided
      if (state.page || !this.get('page')) {
        updatedData.page = state.page || 1;
      }
      this.set(updatedData);
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
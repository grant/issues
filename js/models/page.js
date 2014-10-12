// Page Model
var app = app || {};

(function () {
  'use strict';

  // Storage for the page
  app.Page = Backbone.Model.extend({

    defaults: {
      owner: 'rails',
      repo: 'rails',
      page: 1,
      nav: {
        nextDisabled: false,
        prevDisabled: true,
      }
    },

    // Sets the page state
    // owner: The Github repo's owner
    // repo: The repo name
    // id: (optional) the id of the issue to look at
    setState: function (owner, repo, id) {
      this.set('id', id);
      this.set('owner', owner);
      this.set('repo', repo);
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
    },

    updateNavButtons: function () {
      console.log(app.issues.length);
    }
  });

  // Create our global **Page**.
  app.page = new app.Page();
})();
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

    // Parses the url to get the data needed
    parseURL: function () {
      var hash = window.location.hash;
      // Try to parse the URL
      var splitHash = hash.split('/');
      var owner = splitHash[1];
      var repo = splitHash[2];
      if (owner && repo) {
        this.set('owner', owner);
        this.set('repo', repo);
      }

      // Set the hash
      window.location.hash = [
        '',
        this.get('owner'),
        this.get('repo')
      ].join('/');
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
    },

    reset: function () {
      console.log('reset');
    }
  });

  // Create our global **Page**.
  app.page = new app.Page();
})();
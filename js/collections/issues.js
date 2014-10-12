// Issue Collection
var app = app || {};

var BASE_URL = 'https://api.github.com/repos';

(function () {
  'use strict';

  // The collection of issues for a repo
  var Issues = Backbone.Collection.extend({
    model: app.Issue,
    url: function (options) {
      return [
        BASE_URL,
        options.data.owner,
        options.data.repo,
        'issues?page=' + options.data.page
      ].join('/');
    },
    sync: function (method, model, options) {
      if (method === 'read') {
        options.url = this.url(options);
      }
      Backbone.sync(method, model, options);
    }
  });

  // Create our global collection of **Issues**.
  app.issues = new Issues();
})();
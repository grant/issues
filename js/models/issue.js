// Issue Model
var app = app || {};

var BASE_URL = 'https://api.github.com/repos';

(function () {
  'use strict';

  // A Github Issue has the following attributes
  // - title
  // - number
  // - labels
  // - user
  //   - username
  //   - avatar_url
  // - body
  app.Issue = Backbone.Model.extend({
    url: function (options) {
      return [
        BASE_URL,
        options.data.owner,
        options.data.repo,
        'issues',
        options.data.id
      ].join('/');
    },
    sync: function (method, model, options) {
      if (method === 'read') {
        options.url = this.url(options);
        options.data = {};
      }
      Backbone.sync(method, model, options);
    },

    // Filter attribute list to only the ones we want to store.
    parse: function (response, options) {
      var attributes = {
        title: response.title,
        number: response.number,
        labels: response.labels,
        state: response.state,
        user: {
          username: response.user.login,
          avatar_url: response.user.avatar_url
        },
        body: response.body
      };
      return attributes;
    }
  });

  // Create our global instance of **Issue**.
  app.issue = new app.Issue();
})();
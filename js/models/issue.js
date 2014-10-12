// Issue Model
var app = app || {};

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
    // Filter attribute list to only the ones we want to store.
    parse: function (response, options) {
      var attributes = {
        title: response.title,
        number: response.number,
        labels: response.labels,
        user: {
          username: response.user.login,
          avatar_url: response.user.avatar_url
        },
        body: response.body
      };
      return attributes;
    }
  });
})();
// Issue Model
var app = app || {};

var BASE_URL = 'https://api.github.com/repos';

// Trims a string to 140 chars breaking on words
var MAX_STRING_LENGTH = 140;
function trim (string) {
  string = string.substr(0, MAX_STRING_LENGTH);
  var trimmed = string.length === MAX_STRING_LENGTH;
  if (trimmed) {
    //re-trim if we are in the middle of a word
    string = string.substr(0, Math.min(string.length, string.lastIndexOf(' ')));
    string += '...';
  }
  return string;
}

// Does general formatting for the body
function format (string) {
  string = addLineBreaks(string);
  string = addGithubLinks(string);
  return string;
}

// Adds line breaks
function addLineBreaks (string) {
  return string.replace(/\r\n/g, '<br>');
}

// Adds github links
function addGithubLinks (string) {
  return string.replace(/@([A-Za-z0-9_]+)/g, '<a href="http://www.github.com/$1">@$1</a>');
}

(function () {
  'use strict';

  // A Github Issue has the following attributes
  // - title
  // - number
  // - labels
  // - state
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
      var trimmedBody = trim(response.body);
      var attributes = {
        title: response.title,
        number: response.number,
        labels: response.labels,
        state: response.state,
        user: {
          username: response.user.login,
          avatar_url: response.user.avatar_url
        },
        body: format(response.body),
        trimmedBody: trimmedBody
      };
      return attributes;
    }
  });

  // Create our global instance of **Issue**.
  app.issue = new app.Issue();
})();
// Issues Router
var app = app || {};

(function () {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    // Routes need to have both with and without the trailing '/' options
    routes: {
      ":owner/:repo": "getRepo",
      ":owner/:repo/": "getRepo",
      ":owner/:repo/issues/:id": "getRepoIssue",
      ":owner/:repo/issues/:id/": "getRepoIssue",
      "*actions": "defaultRoute"
    }
  });

  // Instantiate the router
  var appRouter = new AppRouter();

  // View repo issues page
  appRouter.on('route:getRepo', function (owner, repo) {
    app.page.setState(owner, repo);
  });

  // View details page
  appRouter.on('route:getRepoIssue', function (owner, repo, id) {
    app.page.setState(owner, repo, id);
  });

  // Default page
  appRouter.on('route:defaultRoute', function (actions) {
    // Go to default repo
    var owner = app.page.defaults.owner;
    var repo = app.page.defaults.repo;
    appRouter.navigate('/' + owner + '/' + repo, {
      trigger: false,
      replace: true
    });
    app.page.setState(owner, repo);
  });
})();
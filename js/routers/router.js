// Issues Router
var app = app || {};

(function () {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      ":owner/:repo": "getRepo",
      ":owner/:repo/issues/:id": "getRepoIssue",
      "*actions": "defaultRoute"
    }
  });
  // Instantiate the router
  var appRouter = new AppRouter();
  appRouter.on('route:getRepo', function (owner, repo) {
    app.page.setState(owner, repo);
  });
  appRouter.on('route:getRepoIssue', function (owner, repo, id) {
    app.page.setState(owner, repo, id);
  });
  appRouter.on('route:defaultRoute', function (actions) {
    app.page.setState(owner, repo, id);
  });

  Backbone.history.start();
})();
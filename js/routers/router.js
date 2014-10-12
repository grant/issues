// Issues Router
var app = app || {};

// (function () {
//   'use strict';

//   var IssuesRouter = Backbone.Router.extend({
//     routes: {
//       '*filter': 'setFilter'
//     },

//     setFilter: function (param) {
//       // Set the current filter to be used
//       app.IssuesFilter = param || '';

//       // Trigger a collection filter event, causing hiding/unhiding
//       // of Issues view items
//       app.issues.trigger('filter');
//     }
//   });

//   app.IssuesRouter = new IssuesRouter();
//   Backbone.history.start();
// })();
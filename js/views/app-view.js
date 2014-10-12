// The Application
var app = app || {};

(function ($) {
  'use strict';

  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({
    el: '#issuesapp',

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click #next-page': 'nextPage',
      'click #prev-page': 'prevPage'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
      this.$main = this.$('#main');
      this.$list = $('#todo-list');

      this.listenTo(app.issues, 'reset', this.addAll);

      // Suppresses 'add' events with {reset: true} and prevents the app view
      // from being re-rendered for every model. Only renders when the 'reset'
      // event is triggered at the end of the fetch.
      this.reloadData();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function () {
      console.log(app.issues.length);
    },

    // Reloads the page with new data
    reloadData: function () {
      app.issues.fetch({
        reset: true,
        data: {
          owner: 'rails',
          repo: 'rails',
          page: app.page.get('page')
        },
        success: function () {
          console.log(app.issues.length);
        }
      });
    },

    // Goes to the previous page of issues
    prevPage: function () {
      var pageChanged = app.page.prev();
      if (pageChanged) {
        this.reloadData();
      }
    },

    // Goes to the next page of issues
    nextPage: function () {
      var pageChanged = app.page.next();
      if (pageChanged) {
        this.reloadData();
      }
    },

    // Adds a single issue to the list by creating a view for it, and
    // appending its element to the `<ul>`
    addOne: function (issue) {
      var view = new app.IssueView({
        model: issue
      });
      this.$list.append(view.render().el);
    },

    // Add all items in the **Issues** collection at once.
    addAll: function () {
      this.$list.html('');
      app.issues.each(this.addOne, this);
    }
  });
})(jQuery);
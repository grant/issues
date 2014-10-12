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
      this.$list = $('#issue-list');

      this.listenTo(app.issues, 'reset', this.addAll);
      this.listenTo(app.page, 'change:owner change:repo change:id', this.reset);
    },

    reset: function () {
      console.log('render');
      // Suppresses 'add' events with {reset: true} and prevents the app view
      // from being re-rendered for every model. Only renders when the 'reset'
      // event is triggered at the end of the fetch.
      this.reloadData();
    },

    // Renders the app
    render: function () {},

    // Reloads the page with new data
    reloadData: function () {
      app.issues.fetch({
        reset: true,
        data: {
          owner: app.page.get('owner'),
          repo: app.page.get('repo'),
          page: app.page.get('page')
        },
        success: function () {
          app.page.updateNavButtons();
        },
        error: function () {
          alert(app.page.get('owner') +
            '/' + app.page.get('repo') +
            ' not found'
          );
          app.issues.reset();
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
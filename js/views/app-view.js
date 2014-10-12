// The Application
var app = app || {};

(function ($) {
  'use strict';

  // Our overall **AppView** is the top-level piece of UI.
  app.AppView = Backbone.View.extend({
    el: '#issuesapp',

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      'click .next-page': 'nextPage',
      'click .prev-page': 'prevPage',
      'click .back': 'back'
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function () {
      this.$issuesApp = $('#issuesapp');
      // Single issue
      this.$issueMode = $('.issue-mode');
      this.$details = $('#issue-details');
      // List of issues
      this.$list = $('#issue-list');
      this.$issuesMode = $('.issues-mode');

      // Header
      this.header = new app.PageHeaderTitleView({
        model: app.page
      });
      this.$issuesApp.find('.header').append(this.header.render().el);

      this.listenTo(app.issues, 'reset', this.renderIssues);
      this.listenTo(app.page, 'change', this.reloadData);

      this.setMode('issues');
      Backbone.history.start();
    },

    // Reloads the page with new data
    reloadData: function () {
      // Reload data
      if (app.page.get('id')) {
        // Render the issue page
        this.setMode('issue');
        app.issue.fetch({
          reset: true,
          data: {
            owner: app.page.get('owner'),
            repo: app.page.get('repo'),
            id: app.page.get('id')
          },
          success: function () {
            app.view.renderIssue();
          },
          error: function () {
            alert(app.page.get('owner') +
              '/' + app.page.get('repo') +
              '/issues/' + app.page.get('id') +
              ' not found'
            );
            app.issue.reset();
          }
        });
      } else {
        // Render the repo page
        this.setMode('issues');
        this.updateURL();
        app.issues.fetch({
          reset: true,
          data: {
            owner: app.page.get('owner'),
            repo: app.page.get('repo'),
            page: app.page.get('page')
          },
          success: function () {
            // app.page.updateNavButtons();
          },
          error: function () {
            alert(app.page.get('owner') +
              '/' + app.page.get('repo') +
              ' not found'
            );
            app.issues.reset();
          }
        });
      }
    },

    // Sets the app mode
    // mode:
    // - 'issue': Show a specific issues
    // - 'issues': Show a page of issues
    setMode: function (mode) {
      switch (mode) {
        case 'issue':
          this.$issueMode.show();
          this.$issuesMode.hide();
        break;
        case 'issues':
          this.$issueMode.hide();
          this.$issuesMode.show();
        break;
      }
    },

    // Events

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

    // Goes back to the issue list
    back: function () {
      this.updateURL();
    },

    // Updates the page url to the issues page
    updateURL: function (options) {
      options = options || {};
      options.replace = options.replace || true;
      var url = [
        '/',
        app.page.get('owner'),
        app.page.get('repo'),
        'page',
        app.page.get('page')
      ].join('/');
      Backbone.history.navigate(url, options);
    },

    // Rendering

    // Renders the page header
    renderPageHeader: function () {
      // var view = new app.IssueDetailView({
      //   model: app.issue
      // });
      // this.$details.html(view.render().el);
    },

    // Renders a single issue
    renderIssue: function () {
      var view = new app.IssueDetailView({
        model: app.issue
      });
      this.$details.html(view.render().el);
    },

    // Adds a single issue to the list by creating a view for it, and
    // appending its element to the `<ul>`
    renderIssueItem: function (issue) {
      var view = new app.IssueListItemView({
        model: issue,
        attributes: {
          'data-id': issue.get('number')
        }
      });
      this.$list.append(view.render().el);
    },

    // Add all items in the **Issues** collection at once.
    renderIssues: function () {
      this.$list.html('');
      app.issues.each(this.renderIssueItem, this);
    }
  });
})(jQuery);
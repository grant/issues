// Issue Item View
var app = app || {};

(function ($) {
  'use strict';

  // The DOM element for an issue item
  app.IssueListItemView = Backbone.View.extend({
    tagName: 'li',

    className: 'issue-item issue',

    // Cache the template function for a single item.
    template: _.template($('#issue-template').html()),

    // The DOM events specific to an item.
    events: {
      'click': 'viewIssue'
    },

    initialize: function () {
    },

    // Click handler that views an issue
    viewIssue: function (e) {
      var id = $(e.currentTarget).data('id');
      var url = [
        '/',
        app.page.get('owner'),
        app.page.get('repo'),
        'issues',
        id
      ].join('/');
      Backbone.history.navigate(url, {
        trigger: true
      });
    },

    // Re-render the titles of the issue item.
    render: function () {
      var modelData = this.model.toJSON();
      modelData.viewType = 'item';
      this.$el.html(this.template(modelData));
      return this;
    }
  });
})(jQuery);
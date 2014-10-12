// Issue Item View
var app = app || {};

(function ($) {
  'use strict';

  // The DOM element for an issue item
  app.IssueListItemView = Backbone.View.extend({
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template($('#list-item-template').html()),

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
        '',
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
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})(jQuery);
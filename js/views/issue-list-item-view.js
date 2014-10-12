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
      'click .title': 'viewIssue'
    },

    initialize: function () {
    },

    viewIssue: function (a, b) {
      // console.log($(a.currentTarget).data('id'));
    },

    // Re-render the titles of the issue item.
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})(jQuery);
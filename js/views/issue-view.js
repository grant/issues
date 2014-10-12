// Issue Item View
var app = app || {};

(function ($) {
  'use strict';

  // The DOM element for an issue item
  app.IssueView = Backbone.View.extend({
    tagName: 'li',

    // Cache the template function for a single item.
    template: _.template($('#item-template').html()),

    // The DOM events specific to an item.
    events: {
      'click .title': 'viewIssue'
    },

    initialize: function () {
    },

    viewIssue: function (a, b) {
      console.log($(a.currentTarget).data('id'));
    },

    // Re-render the titles of the issue item.
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    // Remove the item, destroy the model from *localStorage* and delete its view.
    clear: function () {
      this.model.destroy();
    }
  });
})(jQuery);
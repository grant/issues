// Issue Detail View
var app = app || {};

(function ($) {
  'use strict';

  // The DOM element for an issue item
  app.IssueDetailView = Backbone.View.extend({
    tagName: 'div',

    // Cache the template function for a single item.
    template: _.template($('#detail-template').html()),

    // The DOM events specific to an item.
    events: {
    },

    initialize: function () {
    },

    // Re-render the titles of the issue item.
    render: function () {
      this.$el.html(
        this.template(
          this.model.toJSON()
        )
      );
      return this;
    }
  });
})(jQuery);
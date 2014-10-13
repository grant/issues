// Issue Detail View
var app = app || {};

(function ($) {
  'use strict';

  // The DOM element for an issue item
  app.IssueDetailView = Backbone.View.extend({
    tagName: 'div',

    className: 'issue',

    // Cache the template function for a single item.
    template: _.template($('#issue-template').html()),

    // The DOM events specific to an item.
    events: {
    },

    initialize: function () {
    },

    // Re-render the titles of the issue item.
    render: function () {
      var modelData = this.model.toJSON();
      modelData.viewType = 'full';
      this.$el.html(this.template(modelData));
      return this;
    }
  });
})(jQuery);
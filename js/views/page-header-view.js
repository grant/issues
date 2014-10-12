// Issue Detail View
var app = app || {};

(function ($) {
  'use strict';

  // The DOM element for an issue item
  app.PageHeaderView = Backbone.View.extend({
    tagName: 'header',

    // Cache the template function for a single item.
    template: _.template($('#header-template').html()),

    initialize: function () {
      // Bind view to model change
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
    },

    // Re-render the titles of the issue item.
    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
})(jQuery);
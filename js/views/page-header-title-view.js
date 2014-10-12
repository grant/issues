// Page Header Title View
var app = app || {};

(function ($) {
  'use strict';

  // The DOM element for an issue item
  app.PageHeaderTitleView = Backbone.View.extend({
    tagName: 'h1',

    className: 'title',

    // Cache the template function for a single item.
    template: _.template($('#header-title-template').html()),

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
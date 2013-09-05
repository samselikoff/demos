/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
    'use strict';

    app.AppView = Backbone.View.extend({

        initialize: function() {
            app.updateIssues();

            app.loaded();

            new app.SelectorView({ el: '#assignee-selector', collection: app.users, title: 'Assignee', placeholder: "All assignees" });
            new app.SelectorView({ el: '#reporter-selector', collection: app.users, title: 'Reporter', placeholder: "All reporters" });

            new app.RequiredForProductionView({ el: '#required-for-production', title: 'Required for Production' });
            new app.RequiredForConversionView({ el: '#required-for-conversion', title: 'Required for Conversion' });
            new app.BugsView({ el: '#bugs', title: 'Bugs' });
            new app.AllIssuesView({ el: '#all-items', title: 'All Items' });
            new app.ConfirmedView({ el: '#confirmed', title: 'Confirmation Status' });
            new app.PriorityView({ el: '#priority', title: 'Priority (remaining only)' });
        }
    });

})(jQuery);
/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.PriorityView = app.AbstractIssuesGraphView.extend({

        initialize: function(options) {
            app.PriorityView.__super__.initialize.call(this, options);
            this.chart
                .sliceClasses(['urgent', 'high', 'medium', 'low', 'niceToHave'])
                .color(['#EC7575', '#e7969c', '#6baed6', '#439CA8', '#61C270' ]);
        },

        getParams: function(selectedClass) {
            var params = app.PriorityView.__super__.getParams.call(this, selectedClass);
            params.resolution = [-1, 4];
            switch( selectedClass ) {
                case 'urgent':
                    params.priority = [1];
                    break;
                case 'high':
                    params.priority = [2];
                    break;
                case 'medium':
                    params.priority = [3];
                    break;
                case 'low':
                    params.priority = [4];
                    break;
                case 'niceToHave':
                    params.priority = [5];
                    break;
                default:
                    break;
            }

            return params;
        },

        getData: function() {
            return [
                { category: 'Urgent', count: app.issues.active().where({ priority: 1, done: 0 }).length },
                { category: 'High', count: app.issues.active().where({ priority: 2, done: 0 }).length },
                { category: 'Medium', count: app.issues.active().where({ priority: 3, done: 0 }).length },
                { category: 'Low', count: app.issues.active().where({ priority: 4, done: 0 }).length },
                { category: 'Nice to Have', count: app.issues.active().where({ priority: 5, done: 0 }).length },
            ];
        },

    });

})();
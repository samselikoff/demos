/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.ConfirmedView = app.AbstractIssuesGraphView.extend({

        initialize: function(options) {
            app.ConfirmedView.__super__.initialize.call(this, options);
            this.chart.sliceClasses(['confirmed', 'unconfirmed']);
        },

        getParams: function(selectedClass) {
            var params = app.ConfirmedView.__super__.getParams.call(this, selectedClass);
            switch( selectedClass ) {
                case 'confirmed':
                    params.status = [6];
                    break;
                case 'unconfirmed':
                    params.status = [5];
                    params.resolution = [1, 2];
                    break;
                default:
                    break;
            }

            return params;
        },

        getData: function() {
            return [
                { category: 'Confirmed', count: app.issues.active().where({ status: 6 }).length },
                { category: 'Unconfirmed', count: app.issues.active().where({ status: 5, done: 1 }).length },
            ];
        },

    });

})();
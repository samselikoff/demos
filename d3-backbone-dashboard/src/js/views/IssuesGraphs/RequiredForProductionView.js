/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.RequiredForProductionView = app.AbstractIssuesGraphView.extend({

        getParams: function(selectedClass) {
            var params = app.RequiredForProductionView.__super__.getParams.call(this, selectedClass);
            params.customfield_10080 = 'Required for Production';
            return params;
        },

        getData: function() {
            var done = {done: 1},
                remainingAssigned = {done: 0, assigned: 1},
                remainingUnassigned = {done: 0, assigned: 0};

            return [
                { category: 'Done', count: app.issues.requiredForProduction().where(done).length },
                { category: 'Remaining Assigned', count: app.issues.requiredForProduction().where(remainingAssigned).length },
                { category: 'Remaining Unassigned', count: app.issues.requiredForProduction().where(remainingUnassigned).length }
            ];
        },

    });

})();
/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.AllIssuesView = app.AbstractIssuesGraphView.extend({

        getData: function() {
            var done = {done: 1},
                remainingAssigned = {done: 0, assigned: 1},
                remainingUnassigned = {done: 0, assigned: 0};

            return [
                { category: 'Done', count: app.issues.active().where(done).length },
                { category: 'Remaining Assigned', count: app.issues.active().where(remainingAssigned).length },
                { category: 'Remaining Unassigned', count: app.issues.active().where(remainingUnassigned).length }
            ];
        },

    });

})();
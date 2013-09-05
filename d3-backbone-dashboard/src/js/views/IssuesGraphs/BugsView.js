/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.BugsView = app.AbstractIssuesGraphView.extend({

        getParams: function(selectedClass) {
            var params = app.BugsView.__super__.getParams.call(this, selectedClass);
            params.type = 1;
            return params;
        },

        getData: function() {
            var done = {done: 1},
                remainingAssigned = {done: 0, assigned: 1},
                remainingUnassigned = {done: 0, assigned: 0};

            return [
                { category: 'Done', count: app.issues.bugs().where(done).length },
                { category: 'Remaining Assigned', count: app.issues.bugs().where(remainingAssigned).length },
                { category: 'Remaining Unassigned', count: app.issues.bugs().where(remainingUnassigned).length }
            ];
        },

    });

})();
/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.RequiredForConversionView = app.AbstractIssuesGraphView.extend({

        getParams: function(selectedClass) {
            var params = app.RequiredForConversionView.__super__.getParams.call(this, selectedClass);
            params.customfield_10080 = 'Required for Conversion';
            return params;
        },

        getData: function() {
            var done = {done: 1},
                remainingAssigned = {done: 0, assigned: 1},
                remainingUnassigned = {done: 0, assigned: 0};

            return [
                { category: 'Done', count: app.issues.requiredForConversion().where(done).length },
                { category: 'Remaining Assigned', count: app.issues.requiredForConversion().where(remainingAssigned).length },
                { category: 'Remaining Unassigned', count: app.issues.requiredForConversion().where(remainingUnassigned).length }
            ];
        },

    });

})();
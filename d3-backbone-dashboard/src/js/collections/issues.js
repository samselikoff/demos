/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var IssueList = Backbone.Collection.extend({ 

        model: app.Issue,

        url: 'data.json',

        activeParams: function() {
            var params = {};
            if (app.selectedReporter) {
                params.reporter = app.selectedReporter;
            }

            if (app.selectedAssignee) {
                params.assignee = app.selectedAssignee;
            }

            return params;
        },

        active: function() {
            var col = Backbone.Collection.extend(),
                params = this.activeParams();

            return (jQuery.isEmptyObject(params))
                ? this
                : new col( this.where(params) );
        },

        requiredForProduction: function() {
            var col = Backbone.Collection.extend(),
                params = this.activeParams();
            params.requiredForProduction = 1;

            return new col( this.where(params) );
        },

        requiredForConversion: function() {
            var col = Backbone.Collection.extend(),
                params = this.activeParams();
            params.requiredForConversion = 1;
            
            return new col( this.where(params) );
        },

        bugs: function() {
            var col = Backbone.Collection.extend(),
                params = this.activeParams();
            params.bug = 1;
            
            return new col( this.where(params) );
        }

    });

    // Create our global collection of **Products**.
    app.issues = new IssueList();
})();
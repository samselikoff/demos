/*global Backbone */
var app = app || {};

(function () {
    'use strict';

    var UserList = Backbone.Collection.extend({ 

        model: app.User,

        initialize: function() {
            this.listenTo(app.issues, "all", this.resetList);
        },

        resetList: function() {
            this.reset( app.issues.pluck() );
        },

        comparator: function(user) {
            return user.get('name');
        },

    });

    // Create our global collection of **Products**.
    app.users = new UserList();
})();
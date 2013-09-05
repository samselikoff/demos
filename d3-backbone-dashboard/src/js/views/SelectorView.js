/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.SelectorView = Backbone.View.extend({

        events: {
            'select2-selecting': 'select',
            'select2-removed': 'remove'
        },

        initialize: function(options) {
            this.placeholder = options.placeholder;
            this.title = options.title;
            this.template = _.template($('#selector-template').html());

            this.$el.append( this.template({title: this.title}) );

            this.listenTo(app.events, "render:selectors", this.render);
        },

        render: function() {
            var _this = this,
                users = _.chain( app.issues.pluck(_this.title.toLowerCase()) )
                    .compact()
                    .union()
                    .sort()
                    .map(function(name) {return {text: name, id: name}})
                    .value();

            this.$('input[type="hidden"]').select2("val", "");
            
            this.$('input[type="hidden"]').select2({
                data: { results: users },
                placeholder: this.placeholder,
                allowClear: true,
            });

        },

        select: function(e) {
            app.select(this.title, e.object.id);
        },

        remove: function() {
            app.remove(this.title);
        }

    });
})();
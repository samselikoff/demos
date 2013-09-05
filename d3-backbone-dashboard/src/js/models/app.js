var app = app || {};

(function () {
    'use strict';

    app.events = _.clone(Backbone.Events);

    app.select = function(prop, name) {
        app["selected" + prop] = name;
        $(window).off('resize');
        app.events.trigger('render:graph');
    }

    app.remove = function(prop) {
        app["selected" + prop] = '';
        $(window).off('resize');
        app.events.trigger('render:graph');
    }

    app.updateIssues = function() {
        app.loading();
        app.selectedReporter = '';
        app.selectedAssignee = '';
        $.when( app.issues.fetch() ).then(function() {
            app.loaded();
            $(window).off('resize');
            app.events.trigger('render:graph');
            app.events.trigger('render:selectors');
        })
    },

    app.loading = function() {
        $('#loading').css('opacity', 0.3);
    }

    app.loaded = function() {
        $('#loading').css('opacity', 0);
    }

    app.postToUrl = function(path, params, method) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        $(form).attr("method", method).attr("action", path).attr("target", "_blank");

        for(var key in params) {
            if(params.hasOwnProperty(key)) {

                // Multiple select
                if (params[key] instanceof Array) {
                    var hiddenField = document.createElement("select");
                    $(hiddenField).attr("type", "select").attr('name', key).attr("multiple", "multiple");

                    for (var val in params[key]) {
                        var $option = $('<option>');
                        $(hiddenField).append($option);
                        $option.attr("value", params[key][val]).attr("selected", "selected");
                    }

                    form.appendChild(hiddenField);

                // Single input
                } else {
                    var hiddenField = document.createElement("input");
                    $(hiddenField).attr("type", "hidden").attr("name", key).attr("value", params[key]);

                    form.appendChild(hiddenField);
                }
            }
        }

        document.body.appendChild(form);
        form.submit();
        $(form).remove();
    }

    app.format = function(item) { return item.name; };

})();
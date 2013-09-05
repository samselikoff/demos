/*global Backbone */
var app = app || {};

(function () {
    'use strict';
    
    app.AbstractIssuesGraphView = Backbone.View.extend({

        initialize: function(options) {
            this.title = options.title;
            this.chart = Strut.PieChart()
                .straightenLabels(true)
                .margin({top: 30, left: 30, bottom: 30, right: 30})
                // .labelSize('15px')
                .labelColor('#FFF')
                .color(['#61C270', '#439CA8', '#EC7575'])
                // .labelText('d.data.count + " (" + 100*d3.round(d.data.count / d3.sum(data, function(d) {return d.count;}), 2) + "%)"')
                .customLabelEnter([
                    ".append('tspan').text(function(d){ return d.data.count; }).attr('y', -10);",
                    ".append('tspan').text(function(d){ return ' (' + d3.format('f')(100*(d.data.count / d3.sum(data, function(d) {return d.count;}))) + '%)'; }).attr('y', 10).attr('x',0);"
                ])
                .customLabelUpdate([
                    ".select('tspan:nth-child(1)').text(function(d){ return d.data.count; });",
                    ".select('tspan:nth-child(2)').text(function(d){ return '(' + d3.format('f')(100*(d.data.count / d3.sum(data, function(d) {return d.count;}))) + '%)'; });"
                ])
                // .labelText('d.data.category')
                .showLegend(true)
                .sliceClasses(['done', 'remainingAssigned', 'remainingUnassigned'])
                .emptyText('No issues for this product/version.');

            this.template = _.template($('#issues-graph-template').html());

            this.$el.append( this.template({title: this.title}) );

            this.listenTo(app.events, "render:graph", this.render);
        },

        getParams: function(selectedClass) {
            var params = {
                'pid': app.selectedProduct,
                'fixfor': app.selectedVersion,
            }
            switch( selectedClass ) {
                case 'done':
                    params.resolution = [1, 2];
                    break;
                case 'remainingAssigned':
                    params.resolution = [-1, 4];
                    params.assigneeSelect = 'specificgroup';
                    params.assignee = 'newapp_dev';
                    break;
                case 'remainingUnassigned':
                    params.resolution = [-1, 4];
                    params.assigneeSelect = 'specificuser';
                    params.assignee = 'jira_newapp_dev';
                    break;
                default:
                    break;
            }

            if (app.selectedReporter) {
                params.reporterSelect = 'specificuser';
                params.reporter = app.selectedReporter;
            }

            if (app.selectedAssignee) {
                params.assigneeSelect = 'specificuser';
                params.assignee = app.selectedAssignee;
            }

            return params;
        },

        render: function() {
            var _this = this;
            var data = this.getData();

            d3.select(_this.$('.chart')[0])
                .data([data])
                .call(_this.chart);

            d3.select(_this.el)
                .selectAll(".arc").selectAll("path")
                .on("mouseover", function() { 
                    d3.select(this)
                        .attr('cursor', 'pointer')
                        .style('stroke', '#333')
                        .style('stroke-width', '2px');

                    d3.select(_this.el)
                        .select(".hover-message")
                        .style('opacity', 1);
                })
                .on("mouseout", function() { 
                    d3.select(this)
                        .style('stroke-width', '0px');
                    
                    d3.select(_this.el)
                        .select(".hover-message")
                        .style('opacity', 0);
                })
                ;

            $(window).on('resize', function() {
                _this.chart.duration(0);

                d3.select(_this.$('.chart')[0])
                .data([data])
                .call(_this.chart);            

                _this.chart.duration(500);
            });
        },
    });
})();
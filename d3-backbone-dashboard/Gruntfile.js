module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'build/style.css': 'src/scss/style.scss'
        }
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        // src: ['src/**/*.js'],
        src: [
          'src/js/models/*.js',
          'src/js/collections/*.js',
          'src/js/views/*.js',
          'src/js/views/IssuesGraphs/*.js',
          'src/js/*.js'
        ],
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },

    watch: {
      main: {
        files: ['src/**/*.js'],
        tasks: ['uglify']
      },
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass']
      },
      // test: {
      //   files: ['app/**/*', 'public/**/*', 'vendor/**/*', 'tests/**/*'],
      //   tasks: ['build:debug', 'karma:server:run']
      // },
      options: {
        debounceDelay: 200
      }
    },

    connect: {
      options: {
        keepalive: true
      },
      uses_defaults: {}
    },

    server: {
      port: 8888,
      base: '.'
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'uglify', 'watch']);
  grunt.registerTask('serve', ['connect']);

};
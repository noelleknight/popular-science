module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({

    karma: {
      app: {
        options: {
          frameworks: ['mocha', 'chai'],
          client: {
            mocha: {
              ui: 'tdd'
            }
          },
          browsers: ['PhantomJS'],
          singleRun: true,

          files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'dev/**/*.js',
            'test/specs/**/*.js'
          ],
          preprocessors: {
            'dev/create-author/*.js': ['coverage']
          },
          reporters: ['progress', 'coverage'],
          coverageReporter: {
            type: 'text-summary'
          }

        }
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },
      all: [ 'dev/**/*.js' ]
    },

    sass: {               // task name
      project: {        // target name
        files: {
          'client/css/main.css': 'dev/scss/main.scss'
        }
      }
    },


    watch: {
      js: {
        files: [ 'dev/**/*.js' ],
        tasks: [ 'js-build' ]
      },
      sass: {
        files: [ 'dev/scss/*.scss' ],
        tasks: [ 'css-build' ]
      },
      html: {
        files: ['dev/**/*.html'],
        tasks: ['copy:html']
      }
    },

    clean: [ 'client/' ],

    copy: {
      html: {
        expand: true,
        src: ['**/*.html'],
        dest: 'client/',
        cwd: 'dev/'
      },
      img: {
        expand: true,
        src: ['**/*.png'],
        dest: 'client/',
        cwd: 'dev/'
      }
    },

    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      js: {
        src: [ 'dev/app/blog.module.js', 'dev/**/*.js' ],
        dest: 'client/js/blog.js',
      },
    },


  });

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('js-build', ['jshint', 'concat:js']);
  grunt.registerTask('css-build', ['sass']);
  grunt.registerTask('default', ['clean', 'copy', 'js-build', 'css-build']);
};

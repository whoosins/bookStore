'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
   
    cssmin: { //Compress CSS files.
      build:{
        files: {
          'public/css/bookAdd.min.css': 'public/css/*bookAdd.css',
          'public/css/bookList.min.css': 'public/css/*bookList.css',
          'public/css/showReviews.min.css': 'public/css/*showReviews.css'
      }
        
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', [
    'develop',
    'watch','cssmin'
  ]);
};
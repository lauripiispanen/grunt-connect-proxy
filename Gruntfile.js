/*
 * grunt-connect-proxy
 * https://github.com/drewzboto/grunt-connect-proxy
 *
 * Copyright (c) 2013 Drewz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var proxySnippet = require("./lib/utils.js").proxyRequest;

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    connect: {
      options: {
          port: 9000,
          // change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost'
      },
      proxies:
      [
            {
              context: '/defaults',
              host: 'www.defaults.com'
            },
            {
              context: '/full',
              host: 'www.full.com',
              port: 8080,
              https: true,
              changeOrigin: true
            },
            {
              context: '/missinghost'
            },
            {
              host: 'www.missingcontext.com',
            }
      ],
      server2: {
        proxies: [
          {
            context: '/',
            host: 'www.server2.com'
          }
        ]
      },
      server3: {
        appendProxies: false,
        proxies: [
          {
            context: '/server3',
            host: 'www.server3.com',
            port: 8080,
            changeOrigin: true
          }
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/connect_proxy_test.js'],
      server2: 'test/server2_proxy_test.js',
      server3: 'test/server3_proxy_test.js'
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean', 
    'configureProxies', 
    'nodeunit:tests', 
    'configureProxies:server2', 
    'nodeunit:server2',
    'configureProxies:server3', 
    'nodeunit:server3',
    ]);

  // specifically test that option inheritance works for multi-level config
  grunt.registerTask('test-inheritance', [
    'clean', 
    'configureProxies:server2', 
    'nodeunit:server2',
  ]);


  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

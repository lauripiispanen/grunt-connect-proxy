/*
 * grunt-connect-proxy
 * https://github.com/drewzboto/grunt-connect-proxy
 *
 * Copyright (c) 2013 Drewz
 * Licensed under the MIT license.
 */

'use strict';
var utils = require('../lib/utils');

module.exports = function(grunt) {
  grunt.registerTask('configureProxies', 'Configure any specified connect proxies.', function(config) {
    // setup proxy
    var _ = grunt.util._;
    var httpProxy = require('http-proxy');
    var proxyOption;
    var connectOptions;
    if (config) {
        connectOptions = grunt.config('connect.'+config) || [];
    } else {
        connectOptions = grunt.config('connect') || [];
    }
    if (!connectOptions.appendProxies) {
        utils.reset();
    }
    var proxyOptions = connectOptions.proxies;
    proxyOptions.forEach(function(proxy) {
        proxyOption = _.defaults(proxy,  {
            port: 80,
            https: false,
            changeOrigin: false
        });
        if (_.isUndefined(proxyOption.host) || _.isUndefined(proxyOption.context)) {
            grunt.log.error('Proxy missing host or context configuration');
        } else {
            utils.registerProxy({
              server: new httpProxy.HttpProxy({ 
                target: proxyOption,
                changeOrigin: proxyOption.changeOrigin
              }),
              config: proxyOption
            });
            grunt.log.writeln('Proxy created for: ' +  proxyOption.context);
        }
    });
  });
};

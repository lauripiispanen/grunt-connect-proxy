var utils = require("../lib/utils.js");

exports.server2_proxy_test = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  proxy_options_test: function(test) {
    test.expect(7);
    var proxies = utils.proxies();

    test.equal(proxies.length, 1, 'should return one valid proxy');
    test.notEqual(proxies[0].server, null, 'server should be configured');
    test.equal(proxies[0].config.context, '/', 'should have context set from config');
    test.equal(proxies[0].config.host, 'www.server2.com', 'should have host set from config');
    test.equal(proxies[0].config.port, 80, 'should have default port 80');
    test.equal(proxies[0].config.https, false, 'should have default http');
    test.equal(proxies[0].config.changeOrigin, false, 'should have default change origin');

    test.done();
  }
}
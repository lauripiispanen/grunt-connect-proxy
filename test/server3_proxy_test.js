var utils = require("../lib/utils.js");

exports.server2_proxy_test = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  proxy_options_test: function(test) {
    test.expect(7);
    var proxies = utils.proxies();

    test.equal(proxies.length, 2, 'should have two proxies');
    test.notEqual(proxies[1].server, null, 'server should be configured');
    test.equal(proxies[1].config.context, '/server3', 'should have context set from config');
    test.equal(proxies[1].config.host, 'www.server3.com', 'should have host set from config');
    test.equal(proxies[1].config.port, 8080, 'should have port 8080');
    test.equal(proxies[1].config.https, false, 'should have default http');
    test.equal(proxies[1].config.changeOrigin, true, 'should have change origin from task');

    test.done();
  }
}
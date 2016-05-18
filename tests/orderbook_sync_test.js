var assert = require('assert');

var CoinbaseExchange = require('../index.js');

var checkState = function(state, exp) {
  assert.deepEqual(JSON.parse(JSON.stringify(state)), exp);
};

test('emits event on book change', function(done) {
  this.timeout(10000);

  var orderbook = new CoinbaseExchange.OrderbookSync();

  orderbook.on('change', function(data) {
    // console.log(data);
    orderbook.removeAllListeners();
    done();
  });

});

test('emits event on book load', function(done) {
  this.timeout(10000);

  var orderbook = new CoinbaseExchange.OrderbookSync();

  orderbook.on('bookLoaded', function(data) {
    // console.log(data);
    orderbook.removeAllListeners();
    done();
  });

});

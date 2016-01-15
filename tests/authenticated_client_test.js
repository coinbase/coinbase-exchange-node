var assert = require('assert');
var nock = require('nock');

var CoinbaseExchange = require('../index.js');
var authClient = new CoinbaseExchange.AuthenticatedClient();

test('should require ordeId for cancelOrder', function(done) {
  authClient.cancelOrder(null, function(err, resp, data) {
    assert(err);
    done();
  });
});

test('should return the order book', function(done) {
  nock('https://api.exchange.coinbase.com')
  .get('/products/BTC-USD/book?level=3')
  .reply(200, {
    'sequence': '3',
    'bids': [
      ['295.96', '0.05088265', '3b0f1225-7f84-490b-a29f-0faef9de823a']
    ],
    'asks': [
      ['295.97', '5.72036512', 'da863862-25f4-4868-ac41-005d11ab0a5f']
    ]
  });

  authClient.getProductOrderBook({level: 3}, function(err, resp, data) {
    assert.ifError(err);

    assert.equal(data.sequence, '3');
    assert.deepEqual(data.bids, [['295.96', '0.05088265', '3b0f1225-7f84-490b-a29f-0faef9de823a']]);
    assert.deepEqual(data.asks, [['295.97', '5.72036512', 'da863862-25f4-4868-ac41-005d11ab0a5f']]);

    done();
  })
});

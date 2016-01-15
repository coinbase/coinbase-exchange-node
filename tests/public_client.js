var assert = require('assert');
var nock = require('nock');

var CoinbaseExchange = require('../index.js');
var publicClient = new CoinbaseExchange.PublicClient();

test('public client should return values', function(done) {
  nock('https://api.exchange.coinbase.com')
  .get('/products/BTC-USD/ticker')
  .reply(200, {
    trade_id: 'test-id',
    price: '9.00',
    size: '5'
  });

  publicClient.getProductTicker(function(err, resp, data) {
    assert.ifError(err);

    assert.equal(data.trade_id, 'test-id');
    assert(data.price, '9.00');
    assert(data.size, '5');

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

  publicClient.getProductOrderBook({level: 3}, function(err, resp, data) {
    assert.ifError(err);

    assert.equal(data.sequence, '3');
    assert.deepEqual(data.bids, [['295.96', '0.05088265', '3b0f1225-7f84-490b-a29f-0faef9de823a']]);
    assert.deepEqual(data.asks, [['295.97', '5.72036512', 'da863862-25f4-4868-ac41-005d11ab0a5f']]);

    done();
  })
});

const redis = require('redis');

const { REDIS_PORT = 6379 } = process.env;
let redis_client;

if (process.env.NODE_ENV === 'development') {
  redis_client = redis.createClient(REDIS_PORT);
} else {
  redis_client = redis.createClient(process.env.REDISCLOUD_URL, {
    no_ready_check: true,
  });
}

module.exports = redis_client;

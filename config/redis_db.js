const redis = require('redis');

const { REDIS_PORT = 6379 } = process.env;

const redis_client = redis.createClient(process.env.REDISCLOUD_URL, {
  no_ready_check: true,
});

module.exports = redis_client;

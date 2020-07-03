const redis = require('redis');

const { REDIS_PORT = 6379, NODE_ENV } = process.env;
let redis_client;
if (NODE_ENV === 'development') {
  redis_client = redis.createClient(REDIS_PORT);
} else {
  redis_client = redis.createClient(process.env.REDIS_URL);
}

module.exports = redis_client;

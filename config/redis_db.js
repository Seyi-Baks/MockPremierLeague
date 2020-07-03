const redis = require('redis');

const { REDIS_PORT = 6379 } = process.env;

const redis_client = redis.createClient(REDIS_PORT);

module.exports = redis_client;

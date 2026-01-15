const redis = require("redis");

const client = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}`
});

client.on("error", err => console.log("Redis client Error", err));

client.connect();

module.exports = client;
const Redis = require("redis");

const redisClient = Redis.createClient(
  30081,
  "redis-cache-8536.redis.a.osc-fr1.scalingo-dbs.com"
);
redisClient.on("connect", () => {
  console.log("redis connected");
});
redisClient.connect();
// let redisClient = async () => {
//   console.log("connecting to redis");
//   redisClient = Redis.createClient({
//     url: "redis://default:FYsuOdoxpAbNR0ytgWdSGlzv4jzCE3z5@redis-14913.c212.ap-south-1-1.ec2.cloud.redislabs.com:14913",
//   });
//   redisClient.on("error", (error) => console.error(`Error : ${error}`));

//   await redisClient
//     .connect()
//     .then(() => {
//       console.log("redis connected");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

// redisClient();
module.exports = redisClient;

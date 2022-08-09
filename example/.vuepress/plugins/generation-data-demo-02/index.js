/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const fs = require('fs');
const path = require('path');
const redis = require('redis');

const hook = require('../../../../src/hook');

let data = {
  generation_0: [],
  generation_1: [],
};

let redisUrl = null;
let redisHashKey = null;

const localConfigFile = path.resolve(__dirname, 'local.json');

if (fs.existsSync(localConfigFile)) {
  redisUrl = require(localConfigFile).REDIS_TLS_URL;
  redisHashKey = 'generation-data-demo-02:local';
} else if (process.env.REDIS_TLS_URL) {
  redisUrl = process.env.REDIS_TLS_URL;
  redisHashKey = 'generation-data-demo-02:heroku';
}

hook.addReadyCallback(async (updates) => {
  if (redisUrl === null) {
    return;
  }

  const client = redis.createClient({
    url: redisUrl,
    socket: {
      tls: true,
      rejectUnauthorized: false,
    },
  });

  client.on('error', (err) => {
    console.log(err);
  });

  await client.connect();

  const generation_0 = updates;
  const generation_1 = JSON.parse(await client.hGet(redisHashKey, 'generation_0') || '[]');

  await client.hSet(redisHashKey, 'generation_0', JSON.stringify(generation_0));
  await client.hSet(redisHashKey, 'generation_1', JSON.stringify(generation_1));

  await client.disconnect();

  data = {
    generation_0,
    generation_1,
  };
});

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => {
  return {
    name: 'generation-data-demo-02',

    plugins: [
      [require('../../../../src')],
    ],

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    clientDynamicModules() {
      return [
        {
          name: 'generation-data-demo-02/data.js',
          content: `export default ${JSON.stringify(data, null, 2)}`,
        },
      ];
    },
  };
};

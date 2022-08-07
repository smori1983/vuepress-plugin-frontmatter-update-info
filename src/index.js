/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');
const frontmatter = require('./frontmatter');

const readyCallbacks = [];
const generatedCallbacks = [];

/**
 * @param {Object} options
 * @param {Context} ctx
 * @return {PluginOptionAPI}
 */
module.exports = (options, ctx) => {
  const {
    readyCallback = () => {},
    generatedCallback = () => {},
  } = options;

  let updates = [];

  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    async ready() {
      updates = frontmatter.collectUpdateInfo(ctx.pages);

      if (typeof readyCallback === 'function') {
        readyCallback(updates);
      }

      readyCallbacks.forEach((callback) => {
        callback(updates);
      });
    },

    clientDynamicModules() {
      return [
        {
          name: 'vuepress-plugin-frontmatter-update-info/data.js',
          content: `export default ${JSON.stringify(updates, null, 2)}`,
        },
      ];
    },

    async generated() {
      if (typeof generatedCallback === 'function') {
        generatedCallback(updates);
      }

      generatedCallbacks.forEach((callback) => {
        callback(updates);
      });
    },
  };
};

module.exports.registerReadyCallback = (callback) => {
  if (typeof callback === 'function') {
    readyCallbacks.push(callback);
  }
};

module.exports.registerGeneratedCallback = (callback) => {
  if (typeof callback === 'function') {
    generatedCallbacks.push(callback);
  }
};

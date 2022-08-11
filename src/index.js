/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');
const frontmatter = require('./frontmatter');
const hook = require('./hook');

/**
 * @param {Object} options
 * @param {Context} ctx
 * @return {PluginOptionAPI}
 */
module.exports = (options, ctx) => {
  let updates = [];

  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    async ready() {
      updates = frontmatter.collectUpdateInfo(ctx.pages);

      for (const callback of hook.getReadyCallbacks()) {
        await callback(updates);
      }
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
      for (const callback of hook.getGeneratedCallbacks()) {
        await callback(updates);
      }
    },
  };
};

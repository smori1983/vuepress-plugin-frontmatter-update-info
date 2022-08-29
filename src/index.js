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

    extendMarkdown: (md) => {
      md.use(require('./markdown-it-plugins'));
    },

    async ready() {
      updates = frontmatter.collectUpdateInfo(ctx.pages);

      await hook.invokeReadyCallbacks(updates);
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
      await hook.invokeGeneratedCallbacks(updates);
    },
  };
};

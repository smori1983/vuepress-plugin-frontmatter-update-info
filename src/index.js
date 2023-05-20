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
  const {
    frontmatterKey = 'update_info',
    frontmatterOptionKey = 'update_info_option',
    recordPublishPeriod = -1,
    pageEmbed = false,
    pageEmbedMarker = '[[update_info]]',
    pageEmbedComponent = 'PluginFrontmatterUpdateInfoPageEmbed',
  } = options;

  let updates = [];

  return {
    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    extendMarkdown: (md) => {
      if (pageEmbed) {
        md.use(require('./markdown-it-plugin')(pageEmbedMarker, pageEmbedComponent));
      }
    },

    async ready() {
      updates = frontmatter.collectUpdateInfo(ctx.pages, {
        frontmatterKey,
        frontmatterOptionKey,
        recordPublishPeriod,
      });

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

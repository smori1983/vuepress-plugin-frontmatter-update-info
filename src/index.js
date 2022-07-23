/**
 * @typedef {import('vuepress-types').Context} Context
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');

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
      updates = collectUpdateInfo(ctx.pages);
    },

    clientDynamicModules() {
      return [
        {
          name: 'vuepress-plugin-frontmatter-update-info/data.js',
          content: `export default ${JSON.stringify(updates, null, 2)}`,
        },
      ];
    },
  };
};

/**
 * @param {Page[]} pages
 */
const collectUpdateInfo = (pages) => {
  const result = [];

  pages.forEach((page) => {
    if (!Array.isArray(page.frontmatter.update_info)) {
      return;
    }

    const infoList = [];
    let dateFirst = null;
    let dateLast = null;

    page.frontmatter.update_info.filter(hasValidDate).forEach((info) => {
      if (infoList.length === 0) {
        dateFirst = info.date;
        dateLast = info.date;
      }

      infoList.push({
        date: info.date,
        description: prepareDescription(info),
      });

      if (dateFirst > info.date) {
        dateFirst = info.date;
      }

      if (dateLast < info.date) {
        dateLast = info.date;
      }
    });

    if (infoList.length > 0) {
      result.push({
        path: page.path,
        title: page.title,
        dateFirst: dateFirst,
        dateLast: dateLast,
        info: infoList,
      });
    }
  });

  return result;
};

/**
 * @param {Object} info
 * @return {boolean}
 */
const hasValidDate = (info) => {
  if (typeof info.date !== 'string') {
    return false;
  }

  return /^\d{4}\/\d{2}\/\d{2}$/.test(info.date);
};

/**
 * @param {Object} info
 * @return {string[]}
 */
const prepareDescription = (info) => {
  if (!Array.isArray(info.description)) {
    return [];
  }

  if (info.description.every((child) => typeof child === 'string')) {
    return info.description;
  }

  return [];
};

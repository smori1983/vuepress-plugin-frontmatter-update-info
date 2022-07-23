/**
 * @typedef {import('vuepress-types').Page} Page
 */

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
    let dateFirst = '';
    let dateLast = '';

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

module.exports.collectUpdateInfo = collectUpdateInfo;

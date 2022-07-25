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

    const updateInfo = page.frontmatter.update_info;

    const records = [];
    let dateFirst = '';
    let dateLast = '';

    updateInfo.filter(hasValidDate).forEach((record) => {
      if (records.length === 0) {
        dateFirst = record.date;
        dateLast = record.date;
      }

      records.push({
        date: record.date,
        description: prepareDescription(record),
      });

      if (dateFirst > record.date) {
        dateFirst = record.date;
      }

      if (dateLast < record.date) {
        dateLast = record.date;
      }
    });

    if (records.length > 0) {
      result.push({
        path: page.path,
        title: page.title,
        dateFirst: dateFirst,
        dateLast: dateLast,
        records: records,
      });
    }
  });

  return result;
};

/**
 * @param {Object} record
 * @return {boolean}
 */
const hasValidDate = (record) => {
  if (typeof record.date !== 'string') {
    return false;
  }

  return /^\d{4}\/\d{2}\/\d{2}$/.test(record.date);
};

/**
 * @param {Object} record
 * @return {string[]}
 */
const prepareDescription = (record) => {
  if (typeof record.description === 'string') {
    return [record.description];
  }

  if (!Array.isArray(record.description)) {
    return [];
  }

  if (record.description.every((child) => typeof child === 'string')) {
    return record.description;
  }

  return [];
};

module.exports.collectUpdateInfo = collectUpdateInfo;

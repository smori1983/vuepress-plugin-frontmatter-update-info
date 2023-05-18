/**
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageFrontmatter} PageFrontmatter
 */

const hash = require('hash-sum');

/**
 * @param {Page[]} pages
 * @param {Object} option
 * @return {Object[]}
 * @throws {Error}
 */
const collectUpdateInfo = (pages, option) => {
  const {
    frontmatterKey,
    frontmatterOptionKey,
  } = option;

  if (!(typeof frontmatterKey === 'string' && frontmatterKey.trim().length > 0)) {
    throw new Error('Invalid frontmatter key');
  }

  if (!(typeof frontmatterOptionKey === 'string' && frontmatterOptionKey.trim().length > 0)) {
    throw new Error('Invalid frontmatter option key');
  }

  const result = [];

  pages.forEach((page) => {
    const updateInfo = page.frontmatter[frontmatterKey];
    const updateInfoOption = page.frontmatter[frontmatterOptionKey];

    if (!Array.isArray(updateInfo)) {
      return;
    }

    const records = updateInfo.filter(hasValidDate).map(record => {
      return {
        date: record.date,
        description: prepareDescription(record),
      };
    });

    if (records.length > 0) {
      const recordDates = records.map(r => r.date).sort();

      result.push({
        key: page.key,
        path: page.path,
        title: page.title,
        dateFirst: recordDates[0],
        dateLast: recordDates.slice(-1)[0],
        records: records,
        recordsHash: hash(records),
        option: prepareOption(updateInfoOption),
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

/**
 * @param {(Object|undefined)} option
 * @return {Object}
 */
const prepareOption = (option) => {
  const {
    page_embed,
  } = option || {};

  const result = {};

  if (typeof page_embed === 'boolean') {
    result.page_embed = page_embed;
  }

  return result;
};

module.exports.collectUpdateInfo = collectUpdateInfo;

/**
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageFrontmatter} PageFrontmatter
 */

const hash = require('hash-sum');
const moment = require('moment');

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
    recordDatePeriod,
  } = option;

  if (!(typeof frontmatterKey === 'string' && frontmatterKey.trim().length > 0)) {
    throw new Error('Invalid frontmatter key');
  }

  if (!(typeof frontmatterOptionKey === 'string' && frontmatterOptionKey.trim().length > 0)) {
    throw new Error('Invalid frontmatter option key');
  }

  const result = [];

  const recordDateMin = (recordDatePeriod >= 0)
    ? moment().subtract(recordDatePeriod, 'd').format('YYYY/MM/DD')
    : '0000/00/00';

  pages.forEach((page) => {
    const updateInfo = page.frontmatter[frontmatterKey];
    const updateInfoOption = page.frontmatter[frontmatterOptionKey];

    const records = prepareRecords(updateInfo, recordDateMin);

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
 * @param {(Object[]|undefined)} updateInfo
 * @param {string} recordDateMin
 * @return {Object[]}
 */
const prepareRecords = (updateInfo, recordDateMin) => {
  if (Array.isArray(updateInfo)) {
    return updateInfo
      .filter(hasValidDate)
      .filter((record) => {
        return recordDateMin <= record.date;
      })
      .map((record) => {
        return {
          date: record.date,
          description: prepareDescription(record),
        };
      });
  }

  return [];
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
 * @param {(Object|undefined)} updateInfoOption
 * @return {Object}
 */
const prepareOption = (updateInfoOption) => {
  const {
    page_embed,
  } = updateInfoOption || {};

  const result = {};

  if (typeof page_embed === 'boolean') {
    result.page_embed = page_embed;
  }

  return result;
};

module.exports.collectUpdateInfo = collectUpdateInfo;

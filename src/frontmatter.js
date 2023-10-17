/**
 * @typedef {import('vuepress-types').Page} Page
 * @typedef {import('vuepress-types').PageFrontmatter} PageFrontmatter
 */

const hash = require('hash-sum');
const moment = require('moment');

/**
 * @typedef {Object} collectUpdateInfoOption
 * @property {string} frontmatterKey
 * @property {string} frontmatterOptionKey
 * @property {number} recordPublishPeriod
 */

/**
 * @typedef {Object} updateInfoRecordOption
 * @property {string} recordDateMin YYYY/MM/DD
 */

/**
 * @typedef {Object} updateInfoRecord
 * @property {string} date YYYY/MM/DD
 * @property {(string|string[])} description
 */

/**
 * @typedef {Object} updateInfoOption
 * @property {boolean} [page_embed]
 */

/**
 * @param {Page[]} pages
 * @param {collectUpdateInfoOption} option
 * @return {Object[]}
 * @throws {Error}
 */
const collectUpdateInfo = (pages, option) => {
  const {
    frontmatterKey,
    frontmatterOptionKey,
    recordPublishPeriod,
  } = option;

  if (!(typeof frontmatterKey === 'string' && frontmatterKey.trim().length > 0)) {
    throw new Error('Invalid frontmatter key');
  }

  if (!(typeof frontmatterOptionKey === 'string' && frontmatterOptionKey.trim().length > 0)) {
    throw new Error('Invalid frontmatter option key');
  }

  if (!Number.isInteger(recordPublishPeriod)) {
    throw new Error('Invalid record publish period');
  }

  const result = [];

  const recordOption = prepareRecordOption(recordPublishPeriod);

  pages.forEach((page) => {
    const updateInfo = page.frontmatter[frontmatterKey];
    const updateInfoOption = page.frontmatter[frontmatterOptionKey];

    const records = prepareRecords(updateInfo, recordOption);

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
 * @param {number} recordPublishPeriod
 * @return {updateInfoRecordOption}
 */
const prepareRecordOption = (recordPublishPeriod) => {
  const recordDateMin = (recordPublishPeriod >= 0)
    ? moment().subtract(recordPublishPeriod, 'd').format('YYYY/MM/DD')
    : '0000/00/00';

  return {
    recordDateMin,
  };
};

/**
 * @param {updateInfoRecord[]} updateInfo
 * @param {updateInfoRecordOption} recordOption
 * @return {updateInfoRecord[]}
 */
const prepareRecords = (updateInfo, recordOption) => {
  if (!Array.isArray(updateInfo)) {
    return [];
  }

  const {
    recordDateMin,
  } = recordOption;

  return updateInfo
    .filter((record) => {
      return typeof record.date === 'string';
    })
    .filter((record) => {
      return /^\d{4}\/\d{2}\/\d{2}$/.test(record.date);
    })
    .filter((record) => {
      return recordDateMin <= record.date;
    })
    .map((record) => {
      return {
        date: record.date,
        description: prepareDescription(record),
      };
    });
};

/**
 * @param {updateInfoRecord} record
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
 * @param {(updateInfoOption|undefined)} updateInfoOption
 * @return {updateInfoOption}
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

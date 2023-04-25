/**
 * @typedef {import('./generation')} Generation
 */

/**
 * @typedef {Object} DiffResultPage
 * @property {string} path
 * @property {string} title
 * @property {DiffResultPageRecord[]} records
 */

/**
 * @typedef {Object} DiffResultPageRecord
 * @property {string} date
 * @property {string[]} description
 */

/**
 * Base class of diff style.
 */
class DiffStyle {
  /**
   * @param {Generation} generation0
   * @param {Generation} generation1
   * @return {DiffResultPage[]}
   */
  get(generation0, generation1) {
    return [];
  }
}

module.exports = DiffStyle;

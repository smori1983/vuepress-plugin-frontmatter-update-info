const deepCopy = require('deep-copy');

class HookManager {
  constructor() {
    /**
     * @type {Function[]}
     * @private
     */
    this._readyCallbacks = [];

    /**
     * @type {Function[]}
     * @private
     */
    this._generatedCallbacks = [];
  }

  addReadyCallback(callback) {
    if (typeof callback === 'function') {
      this._readyCallbacks.push(callback);
    }
  }

  addGeneratedCallback(callback) {
    if (typeof callback === 'function') {
      this._generatedCallbacks.push(callback);
    }
  }

  /**
   * @param {Object[]} updates
   * @return {Promise<void>}
   */
  async invokeReadyCallbacks(updates) {
    for (const callback of this._readyCallbacks) {
      await callback(deepCopy(updates));
    }
  }

  /**
   * @param {Object[]} updates
   * @return {Promise<void>}
   */
  async invokeGeneratedCallbacks(updates) {
    for (const callback of this._generatedCallbacks) {
      await callback(deepCopy(updates));
    }
  }
}

module.exports = new HookManager();

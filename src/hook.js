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
   * @return {Function[]}
   */
  getReadyCallbacks() {
    return this._readyCallbacks;
  }

  /**
   * @return {Function[]}
   */
  getGeneratedCallbacks() {
    return this._generatedCallbacks;
  }
}

module.exports = new HookManager();

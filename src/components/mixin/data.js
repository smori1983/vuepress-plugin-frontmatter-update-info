export default {
  methods: {
    /**
     * @param {Object[]} data
     * @return {Object[]}
     */
    getSorted(data) {
      const dataForSort = data.slice();

      dataForSort.sort((a, b) => {
        if (a.dateLast === b.dateLast) {
          return a.title > b.title ? 1 : -1;
        }

        return a.dateLast > b.dateLast ? -1 : 1;
      });

      return dataForSort;
    },

    /**
     * @param {Object[]} data
     * @param {string} key
     * @return {Object|null}
     */
    findByKey(data, key) {
      for (let i = 0, len = data.length; i < len; i++) {
        if (data[i].key === key) {
          return data[i];
        }
      }

      return null;
    }
  },
};

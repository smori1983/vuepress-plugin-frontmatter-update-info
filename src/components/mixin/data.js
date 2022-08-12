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
  },
};

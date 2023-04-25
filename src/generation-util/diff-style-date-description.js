const hash = require('hash-sum');
const {
  differenceBy,
} = require('lodash');
const DiffStyle = require('./diff-style');

class DiffStyleDateDescription extends DiffStyle {
  get(generation0, generation1) {
    const result = [];

    generation0.getPaths().forEach((path) => {
      const generation0Page = generation0.getPage(path);
      const generation1Page = generation1.getPage(path);

      if (generation1Page) {
        const targetRecords = differenceBy(generation0Page.getRecords(), generation1Page.getRecords(), (record) => {
          return `${record.date}:${hash(record.description)}`;
        });

        if (targetRecords.length > 0) {
          result.push({
            path: generation0Page.getPath(),
            title: generation0Page.getTitle(),
            records: targetRecords,
          });
        }
      } else {
        result.push({
          path: generation0Page.getPath(),
          title: generation0Page.getTitle(),
          records: generation0Page.getRecords(),
        });
      }
    });

    return result;
  }
}

module.exports = DiffStyleDateDescription;

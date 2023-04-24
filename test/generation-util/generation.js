const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const Generation = require('../../src/generation-util/generation');

describe('Generation', () => {
  describe('Num of pages: 1', () => {
    const generationData = [
      {
        path: '/page_1.html',
        title: 'Page 1',
        records: [
          {
            date: '2023/01/01',
            description: [
              'Page 1 added.',
            ],
          },
        ],
      },
    ];

    it('getPaths() returns collected page paths', () => {
      const generation = new Generation(generationData);

      const paths = generation.getPaths();

      assert.deepStrictEqual(paths, ['/page_1.html']);
    });

    it('getPage() returns null if the path not exists', () => {
      const generation = new Generation(generationData);

      const page = generation.getPage('/foo.html');

      assert.deepStrictEqual(page, null);
    });

    it('getPage() returns page object if the path exists', () => {
      const generation = new Generation(generationData);

      const page = generation.getPage('/page_1.html');

      assert.deepStrictEqual(page.getPath(), '/page_1.html');
      assert.deepStrictEqual(page.getTitle(), 'Page 1');

      const records = page.getRecords();

      assert.deepStrictEqual(records.length, 1);
      assert.deepStrictEqual(records[0].date, '2023/01/01');
      assert.deepStrictEqual(records[0].description, ['Page 1 added.']);
    });
  });
});

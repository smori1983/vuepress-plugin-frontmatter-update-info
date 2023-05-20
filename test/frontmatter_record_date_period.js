const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const moment = require('moment');
const helper = require('./_helper/frontmatter');

const collect = (pages, recordPublishPeriod) => {
  return helper.collect(pages, {
    recordPublishPeriod,
  });
};

describe('frontmatter', () => {
  describe('collectUpdateInfo', () => {
    describe('record date period', () => {
      it('unlimited (-1)', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2000/01/01', // Too old value.
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages, -1);

        assert.deepStrictEqual(result.length, 1);
      });

      it('period: 0, date: enough old value', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2000/01/01', // Too old value.
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages, 0);

        assert.deepStrictEqual(result.length, 0);
      });

      it('period: 0, date: today', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: moment().format('YYYY/MM/DD'), // Today.
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages, 0);

        assert.deepStrictEqual(result.length, 1);
      });

      it('period: 0, date: future', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: moment().add(1, 'd').format('YYYY/MM/DD'),
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages, 0);

        assert.deepStrictEqual(result.length, 1);
      });

      it('period: 7, date: one of 3 records is 8 days old', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: moment().subtract(6, 'd').format('YYYY/MM/DD'),
                  description: 'message 3',
                },
                {
                  date: moment().subtract(7, 'd').format('YYYY/MM/DD'),
                  description: 'message 2',
                },
                {
                  date: moment().subtract(8, 'd').format('YYYY/MM/DD'),
                  description: 'message 1',
                },
              ],
            },
          },
        ];

        const result = collect(pages, 7);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].records.length, 2);
        assert.deepStrictEqual(result[0].records[0].description, ['message 3']);
        assert.deepStrictEqual(result[0].records[1].description, ['message 2']);
      });
    });
  });
});

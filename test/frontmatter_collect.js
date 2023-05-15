const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const frontmatter = require('../src/frontmatter');

const frontmatterKeyDefault = 'update_info';
const frontmatterOptionKeyDefault = 'update_info_option';

const collect = (pages) => {
  return frontmatter.collectUpdateInfo(pages, frontmatterKeyDefault, frontmatterOptionKeyDefault);
};

describe('frontmatter', () => {
  describe('collectUpdateInfo', () => {
    describe('number of items', () => {
      it('pages: 0', () => {
        const pages = [];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 0);
      });

      it('pages: 1, frontmatter not defined', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {},
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 0);
      });

      it('pages: 1, frontmatter defined', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
      });
    });

    describe('Invalid frontmatter data', () => {
      it('Value not defined', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: null,
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 0);
      });

      it('Defined as string', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: 'foo',
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 0);
      });

      it('Date is not defined', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 0);
      });

      it('Date format is not YYYY/MM/DD', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '20230501',
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 0);
      });

      it('Description contains non-string', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: [
                    'page added.',
                    {
                      key: 'value',
                    },
                  ],
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].records.length, 1);
        assert.deepStrictEqual(result[0].records[0].description.length, 0);
      });
    });

    describe('Normal frontmatter data', () => {
      it('num of pages: 1, num of records: 1', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].key, 'v-10000000');
        assert.deepStrictEqual(result[0].path, '/page_01.html');
        assert.deepStrictEqual(result[0].title, 'page 01');
        assert.deepStrictEqual(result[0].dateFirst, '2023/05/01');
        assert.deepStrictEqual(result[0].dateLast, '2023/05/01');
        assert.deepStrictEqual(result[0].records.length, 1);
        assert.deepStrictEqual(result[0].records[0].date, '2023/05/01');
        assert.deepStrictEqual(result[0].records[0].description, ['page added.']);
      });

      it('num of pages: 1, num of records: 2', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/02',
                  description: 'page edited.',
                },
                {
                  date: '2023/05/01',
                  description: 'page added.',
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].dateFirst, '2023/05/01');
        assert.deepStrictEqual(result[0].dateLast, '2023/05/02');
        assert.deepStrictEqual(result[0].records.length, 2);
        assert.deepStrictEqual(result[0].records[0].date, '2023/05/02');
        assert.deepStrictEqual(result[0].records[0].description, ['page edited.']);
        assert.deepStrictEqual(result[0].records[1].date, '2023/05/01');
        assert.deepStrictEqual(result[0].records[1].description, ['page added.']);
      });

      it('date sorted asc', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: 'message.',
                },
                {
                  date: '2023/05/02',
                  description: 'message.',
                },
                {
                  date: '2023/05/03',
                  description: 'message.',
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].dateFirst, '2023/05/01');
        assert.deepStrictEqual(result[0].dateLast, '2023/05/03');
      });

      it('date sorted desc', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/10',
                  description: 'message.',
                },
                {
                  date: '2023/05/09',
                  description: 'message.',
                },
                {
                  date: '2023/05/08',
                  description: 'message.',
                },
              ],
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].dateFirst, '2023/05/08');
        assert.deepStrictEqual(result[0].dateLast, '2023/05/10');
      });
    });

    describe('Invalid frontmatter option data', () => {
      it('Unknown key', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: 'page added.',
                },
              ],
              update_info_option: {
                foo: 'bar',
              },
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].option, {});
      });

      it('Define page_embed as non-boolean', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: 'page added.',
                },
              ],
              update_info_option: {
                page_embed: 0,
              },
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].option, {});
      });
    });

    describe('Normal frontmatter option data', () => {
      it('Define page_embed as false', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: 'page added.',
                },
              ],
              update_info_option: {
                page_embed: false,
              },
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].option, {
          page_embed: false,
        });
      });

      it('Define page_embed as true', () => {
        const pages = [
          {
            key: 'v-10000000',
            path: '/page_01.html',
            title: 'page 01',
            frontmatter: {
              update_info: [
                {
                  date: '2023/05/01',
                  description: 'page added.',
                },
              ],
              update_info_option: {
                page_embed: true,
              },
            },
          },
        ];

        const result = collect(pages);

        assert.deepStrictEqual(result.length, 1);
        assert.deepStrictEqual(result[0].option, {
          page_embed: true,
        });
      });
    });
  });
});

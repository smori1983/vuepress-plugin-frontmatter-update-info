const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const frontmatter = require('../src/frontmatter');

const frontmatterKeyDefault = 'update_info';
const frontmatterOptionKeyDefault = 'update_info_option';

describe('frontmatter', () => {
  describe('arguments', () => {
    describe('frontmatterKey', () => {
      const testData = [
        ['invalid: null', null],
        ['invalid: false', false],
        ['invalid: true', true],
        ['invalid: numeric', 123],
        ['invalid: empty string', ''],
        ['invalid: space only', ' '],
      ];

      testData.forEach(([title, input]) => {
        it(title, () => {
          assert.throws(() => {
            frontmatter.collectUpdateInfo([], {
              frontmatterKey: input,
              frontmatterOptionKey: frontmatterOptionKeyDefault,
            });
          }, /Invalid frontmatter key/);
        });
      });
    });

    describe('frontmatterOptionKey', () => {
      const testData = [
        ['invalid: null', null],
        ['invalid: false', false],
        ['invalid: true', true],
        ['invalid: numeric', 123],
        ['invalid: empty string', ''],
        ['invalid: space only', ' '],
      ];

      testData.forEach(([title, input]) => {
        it(title, () => {
          assert.throws(() => {
            frontmatter.collectUpdateInfo([], {
              frontmatterKey: frontmatterKeyDefault,
              frontmatterOptionKey: input,
            });
          }, /Invalid frontmatter option key/);
        });
      });
    });
  });
});

const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const helper = require('./_helper/frontmatter');

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
            helper.collect([], {
              frontmatterKey: input,
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
            helper.collect([], {
              frontmatterOptionKey: input,
            });
          }, /Invalid frontmatter option key/);
        });
      });
    });
  });
});

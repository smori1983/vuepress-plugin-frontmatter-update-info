const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;
const frontmatter_arguments = require('../src/frontmatter');

const frontmatterKeyDefault = 'update_info';
const frontmatterOptionKeyDefault = 'update_info_option';

describe('frontmatter', () => {
  describe('arguments', () => {
    describe('frontmatterKey', () => {
      it('invalid: null', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], null, frontmatterOptionKeyDefault);
        }, /Invalid frontmatter key/);
      });

      it('invalid: false', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], false, frontmatterOptionKeyDefault);
        }, /Invalid frontmatter key/);
      });

      it('invalid: true', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], true, frontmatterOptionKeyDefault);
        }, /Invalid frontmatter key/);
      });

      it('invalid: numeric', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], 123, frontmatterOptionKeyDefault);
        }, /Invalid frontmatter key/);
      });

      it('invalid: empty string', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], '', frontmatterOptionKeyDefault);
        }, /Invalid frontmatter key/);
      });

      it('invalid: space only', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], ' ', frontmatterOptionKeyDefault);
        }, /Invalid frontmatter key/);
      });
    });

    describe('frontmatterOptionKey', () => {
      it('invalid: null', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], frontmatterKeyDefault, null);
        }, /Invalid frontmatter option key/);
      });

      it('invalid: false', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], frontmatterKeyDefault, false);
        }, /Invalid frontmatter option key/);
      });

      it('invalid: true', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], frontmatterKeyDefault, true);
        }, /Invalid frontmatter option key/);
      });

      it('invalid: numeric', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], frontmatterKeyDefault, 123);
        }, /Invalid frontmatter option key/);
      });

      it('invalid: empty string', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], frontmatterKeyDefault, '');
        }, /Invalid frontmatter option key/);
      });

      it('invalid: space only', () => {
        assert.throws(() => {
          frontmatter_arguments.collectUpdateInfo([], frontmatterKeyDefault, ' ');
        }, /Invalid frontmatter option key/);
      });
    });
  });
});

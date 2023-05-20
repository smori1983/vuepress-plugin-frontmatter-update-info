const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;

const handleArgument = (arg) => {
  const {
    value = 'x',
  } = arg || {};

  return value;
};

describe('javascript', () => {
  describe('object', () => {
    describe('destructuring assignment', () => {
      it('undefined', () => {
        const value = handleArgument();

        assert.deepStrictEqual(value, 'x');
      });

      it('null', () => {
        const value = handleArgument(null);

        assert.deepStrictEqual(value, 'x');
      });

      it('boolean', () => {
        const value = handleArgument(true);

        assert.deepStrictEqual(value, 'x');
      });

      it('numeric', () => {
        const value = handleArgument(123);

        assert.deepStrictEqual(value, 'x');
      });

      it('string', () => {
        const value = handleArgument('value');

        assert.deepStrictEqual(value, 'x');
      });

      it('empty array', () => {
        const value = handleArgument([]);

        assert.deepStrictEqual(value, 'x');
      });

      it('array contains elements', () => {
        const value = handleArgument(['value', 'a', 'b']);

        assert.deepStrictEqual(value, 'x');
      });

      it('object without necessary property', () => {
        const value = handleArgument({
          value1: 'a',
          value2: 'b',
        });

        assert.deepStrictEqual(value, 'x');
      });

      it('object with necessary property', () => {
        const value = handleArgument({
          value: 'a',
        });

        assert.deepStrictEqual(value, 'a');
      });

      it('object with necessary property is null', () => {
        const value = handleArgument({
          value: null,
        });

        assert.deepStrictEqual(value, null);
      });

      it('object with necessary property is undefined', () => {
        const value = handleArgument({
          value: undefined
        });

        assert.deepStrictEqual(value, 'x');
      });
    });
  });
});

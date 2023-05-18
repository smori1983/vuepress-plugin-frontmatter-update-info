const assert = require('assert');
const describe = require('mocha').describe;
const it = require('mocha').it;

const handleArgument = (arg) => {
  const {
    value,
  } = arg || {};

  return value;
};

describe('javascript', () => {
  describe('object', () => {
    describe('destructuring assignment', () => {
      it('undefined', () => {
        const value = handleArgument();

        assert.deepStrictEqual(value, undefined);
      });

      it('null', () => {
        const value = handleArgument(null);

        assert.deepStrictEqual(value, undefined);
      });

      it('boolean', () => {
        const value = handleArgument(true);

        assert.deepStrictEqual(value, undefined);
      });

      it('numeric', () => {
        const value = handleArgument(123);

        assert.deepStrictEqual(value, undefined);
      });

      it('string', () => {
        const value = handleArgument('value');

        assert.deepStrictEqual(value, undefined);
      });

      it('empty array', () => {
        const value = handleArgument([]);

        assert.deepStrictEqual(value, undefined);
      });

      it('array contains elements', () => {
        const value = handleArgument(['value', 'a', 'b']);

        assert.deepStrictEqual(value, undefined);
      });

      it('object without necessary property', () => {
        const value = handleArgument({
          value1: 'a',
          value2: 'b',
        });

        assert.deepStrictEqual(value, undefined);
      });

      it('object with necessary property', () => {
        const value = handleArgument({
          value: 'a',
        });

        assert.deepStrictEqual(value, 'a');
      });
    });
  });
});

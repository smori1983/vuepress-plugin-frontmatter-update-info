/**
 * @typedef {import('vuepress-types').PluginOptionAPI} PluginOptionAPI
 */

const path = require('path');
const Conf = require('conf');

const hook = require('../../../../src/hook');

let data = {};

hook.addReadyCallback((updates) => {
  const conf = new Conf({
    projectName: 'vuepress-plugin-frontmatter-update-info-generation-data-demo-01',
  });

  const generation_0 = updates;
  const generation_1 = conf.get('generation_0', []);

  conf.set('generation_0', generation_0);
  conf.set('generation_1', generation_1);

  data = {
    generation_0,
    generation_1,
  };
});

/**
 * @return {PluginOptionAPI}
 */
module.exports = () => {
  return {
    name: 'generation-data-demo-01',

    plugins: [
      [require('../../../../src')],
    ],

    enhanceAppFiles: [
      path.resolve(__dirname, 'enhanceAppFile.js'),
    ],

    clientDynamicModules() {
      return [
        {
          name: 'generation-data-demo-01/data.js',
          content: `export default ${JSON.stringify(data, null, 2)}`,
        },
      ];
    },
  };
};

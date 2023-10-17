const frontmatter = require('../../src/frontmatter');

const collect = (pages, option) => {
  const {
    frontmatterKey = 'update_info',
    frontmatterOptionKey = 'update_info_option',
    recordPublishPeriod = -1,
  } = option || {};

  return frontmatter.collectUpdateInfo(pages, {
    frontmatterKey,
    frontmatterOptionKey,
    recordPublishPeriod,
  });
};

module.exports.collect = collect;

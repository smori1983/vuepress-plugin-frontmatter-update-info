module.exports = (md) => {
  md.core.ruler.push('vuepress_plugin_frontmatter_update_info', (state) => {
    console.log('called');
  });
};

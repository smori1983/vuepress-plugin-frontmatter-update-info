module.exports = (md) => {
  md.core.ruler.push('vuepress_plugin_frontmatter_update_info', (state) => {
    if (state.tokens.length < 3) {
      return;
    }

    const token1 = state.tokens[0];
    const token2 = state.tokens[1];
    const token3 = state.tokens[2];

    const targetHeadingLevels = ['h1', 'h2'];

    if (!(token1.type === 'heading_open' && targetHeadingLevels.includes(token1.tag))) {
      return;
    }

    if (!(token2.type === 'inline')) {
      return;
    }

    if (!(token3.type === 'heading_close' && targetHeadingLevels.includes(token3.tag))) {
      return;
    }

    const token = new state.Token('html_block', '', 0);
    token.content = '<PluginFrontmatterUpdateInfoPageEmbed/>';
    token.block = true;

    state.tokens.splice(3, 0, token);
  });
};

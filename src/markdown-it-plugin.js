const marker = '[[update_info]]';

module.exports = (md) => {
  md.core.ruler.push('vuepress_plugin_frontmatter_update_info', (state) => {
    if (state.src.includes(marker)) {
      return;
    }

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

  md.block.ruler.before('table', 'vuepress_plugin_frontmatter_update_info_tag', (state, startLine, endLine, silent) => {
    if (state.tokens.length < 3) {
      return false;
    }

    const tokenLength = state.tokens.length;
    const token1 = state.tokens[tokenLength - 3];
    const token2 = state.tokens[tokenLength - 2];
    const token3 = state.tokens[tokenLength - 1];

    if (!(token1.type === 'paragraph_open')) {
      return false;
    }

    if (!(token2.type === 'inline' && token2.content === marker)) {
      return false;
    }

    if (!(token3.type === 'paragraph_close')) {
      return false;
    }

    const token = new state.Token('html_block', '', 0);
    token.map = token1.map;
    token.content = '<PluginFrontmatterUpdateInfoPageEmbed/>';
    token.block = true;

    state.tokens.splice(-3, 3, token);

    return true;
  });
};

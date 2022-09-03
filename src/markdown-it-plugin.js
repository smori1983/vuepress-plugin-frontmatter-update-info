/**
 * @param {string} marker
 */
module.exports = (marker) => {
  return (md) => {
    if (!(typeof marker === 'string' && marker.trim().length > 0)) {
      return;
    }

    pageEmbedMarker = marker;

    md.core.ruler.push('vuepress_plugin_frontmatter_update_info', coreRule);
    md.block.ruler.before('paragraph', 'vuepress_plugin_frontmatter_update_info_tag', blockRule);
  };
};

/**
 * @type {string}
 */
let pageEmbedMarker = '';

const coreRule = (state) => {
  if (state.src.includes(pageEmbedMarker)) {
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
};

const blockRule = (state, startLine, endLine, silent) => {
  const lineText = state.src.slice(state.bMarks[startLine], state.eMarks[startLine]);

  if (lineText !== pageEmbedMarker) {
    return false;
  }

  state.line = startLine + 1;

  const token = new state.Token('html_block', '', 0);
  token.map = [startLine, state.line];
  token.content = '<PluginFrontmatterUpdateInfoPageEmbed/>';
  token.block = true;

  state.tokens.push(token);

  return true;
};

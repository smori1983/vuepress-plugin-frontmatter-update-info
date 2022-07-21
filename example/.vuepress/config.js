module.exports = {
  title: 'vuepress-plugin-frontmatter-update-info Demo',
  dest: 'example/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
      '/debug.md',
      '/update_info.md',
      {
        collapsable: false,
        title: 'Pages',
        children: [
          '/pages/page01.md',
          '/pages/page02.md',
          '/pages/page03.md',
          '/pages/page04.md',
          '/pages/page05.md',
        ],
      }
    ],
  },

  plugins: [
    [require('../../src')],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};

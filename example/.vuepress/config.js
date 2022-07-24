module.exports = {
  title: 'vuepress-plugin-frontmatter-update-info',
  dest: 'example/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
      {
        collapsable: false,
        title: 'Main',
        children: [
          '/debug.md',
          '/update_info.md',
        ],
      },
      {
        collapsable: false,
        sidebarDepth: 0,
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

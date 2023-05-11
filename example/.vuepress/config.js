module.exports = {
  title: 'vuepress-plugin-frontmatter-update-info',
  dest: 'example/.vuepress/dist',

  themeConfig: {
    search: false,
    sidebar: [
      {
        title: 'Main',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/debug.md',
          '/update_info_table_excerpt.md',
          '/update_info_table.md',
          '/update_info_list_excerpt.md',
          '/update_info_list.md',
        ],
      },
      {
        title: 'Pages: basic',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/pages/basic_01.md',
          '/pages/basic_02.md',
          '/pages/basic_03.md',
          '/pages/basic_04.md',
          '/pages/basic_05.md',
          '/pages/basic_06.md',
        ],
      },
      {
        title: 'Pages: custom tag',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/pages/custom_tag_01.md',
          '/pages/custom_tag_02.md',
          '/pages/custom_tag_03.md',
        ],
      },
      {
        title: 'Pages: invalid',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/pages/invalid_01.md',
          '/pages/invalid_02.md',
          '/pages/invalid_03.md',
          '/pages/invalid_04.md',
          '/pages/invalid_05.md',
          '/pages/invalid_06.md',
          '/pages/invalid_07.md',
          '/pages/invalid_08.md',
          '/pages/invalid_09.md',
        ],
      },
    ],
  },

  plugins: [
    [require('../../src'), {
      pageEmbed: true,
    }],
  ],

  markdown: {
    extendMarkdown: (md) => {
      md.set({ breaks: true });
    },
  },
};

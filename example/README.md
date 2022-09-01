---
home: false
---
# Example site


## Config

`.vuepress/config.js`

```js
module.exports = {
  plugins: [
    // Local plugins for demo.
    // It is defined to use vuepress-plugin-frontmatter-update-info plugin in them.
    [require('./plugins/generation-data-demo-01')],
    [require('./plugins/generation-data-demo-02')],

    // Define later to get this option applied.
    ['frontmatter-update-info', {
      pageEmbed: true,
    }],
  ],
};
```


## Deployed source

`example` directory of [GitHub](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info).

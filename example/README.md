---
home: false
---
# Example site


## Config

`.vuepress/config.js`

```js
module.exports = {
  plugins: [
    ['frontmatter-update-info'],

    // Local plugins for demo.
    [require('./plugins/generation-data-demo-01')],
    [require('./plugins/generation-data-demo-02')],
  ],
};
```


## Deployed source

`example` directory of [GitHub](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info).

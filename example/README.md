---
home: false
---
# Example site


## Config

`.vuepress/config.js`

```js
module.exports = {
  plugins: [
    ['frontmatter-update-info', {
      newInfoThresholdDays: 14,
    }],
  ],
};
```


## Deployed source

`example` directory of [GitHub](https://github.com/smori1983/vuepress-plugin-frontmatter-update-info).

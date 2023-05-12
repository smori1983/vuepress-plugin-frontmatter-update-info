# vuepress-plugin-frontmatter-update-info

VuePress plugin to **manually** maintain page update info by using frontmatter.

Visit [online demo](https://smori1983.github.io/vuepress-plugin-frontmatter-update-info-demo/).


## Overview

First, write description as frontmatter about how the page was updated.

Then the plugin will create the client dynamic module, which is JSON collecting frontmatter data.

Basically update info is shown using component. And you can enable option to show it in each page.

Predefined components are provided, and it is also possible to implement your own component by using the client dynamic module.


## Plugin configuration options

| name                 | description                                                                                    | default value                            |
|----------------------|------------------------------------------------------------------------------------------------|------------------------------------------|
| `frontmatterKey`     | Key to define update info data. Change this if the same key is already used for other purpose. | `'update_info'`                          |
| `pageEmbed`          | Switch to enable embed of update info to each page.                                            | `false`                                  |
| `pageEmbedMarker`    | Marker for manual page embed.                                                                  | `'[[update_info]]'`                      |
| `pageEmbedComponent` | Component name used for page embed.                                                            | `'PluginFrontmatterUpdateInfoPageEmbed'` |

In `.vuepress/config.js`,

```js
module.exports = {
  plugins: [
    ['frontmatter-update-info', {
      pageEmbed: true,
      // Configure more if necessary.
    }],
  ],
};
```


## Data structure of frontmatter

- `update_info` (which is default value of `frontmatterKey`) has list of records.
- Each record has `date` (required) and `description` (optional).
  - Format of `date` is `YYYY/MM/DD`.
  - Define `description` as `string` or array of `string`.

```
---
update_info:
- date: YYYY/MM/DD
---
```

```
---
update_info:
- date: YYYY/MM/DD
  description: <string>
---
```

```
---
update_info:
- date: YYYY/MM/DD
  description:
  - <string>
  - <string>
---
```


## Page embed

If `pageEmbed` option is enabled, component for showing update info is automatically injected to pages.

`markdown-it` plugin is implemented for this feature.

The component is injected after first heading when:

- First line of the page is `<h1>` (`#`) or `<h2>` (`##`).
- The text for marker (by default `'[[update_info]]'`) is not manually written on the page.

In other words, you can show update info in any place of the page by manually writing page embed marker.


## Predefined components

### `FrontmatterUpdateInfoTable.vue`

Displays update info as table.

```
<PluginFrontmatterUpdateInfoTable/>
```

### `FrontmatterUpdateInfoList.vue`

Displays update info as list.

```
<PluginFrontmatterUpdateInfoList/>
```

### Common properties

#### `new-threshold`

Displays '`NEW`' badge 7 days by default.

To change the threshold, use the component like below:

```
<PluginFrontmatterUpdateInfoTable :new-threshold="14"/>
<PluginFrontmatterUpdateInfoList :new-threshold="14"/>
```

Or, if you do not want to display badge:

```
<PluginFrontmatterUpdateInfoTable :new-threshold="0"/>
<PluginFrontmatterUpdateInfoList :new-threshold="0"/>
```

#### `num-of-pages`

To restrict the number of pages shown, use this property.

This will be useful when you display update info as excerpt.

```
<PluginFrontmatterUpdateInfoTable :num-of-pages="3"/>
<PluginFrontmatterUpdateInfoList :num-of-pages="3"/>
```


## Predefined component (for debugging)

### `FrontmatterUpdateInfoDebug.vue`

Outputs the content of generated client dynamic module.

```
<PluginFrontmatterUpdateInfoDebug/>
```


## clientDynamicModules

This plugin collects frontmatter data and generates client module named:

```
@dynamic/vuepress-plugin-frontmatter-update-info/data.js
```


## Lifecycle hook callbacks

You can register callbacks to handle frontmatter update info data.

Basically this is designed to save multi-generation data and use them for something (You need to prepare some method to save the data).

```js
const hook = require('vuepress-plugin-frontmatter-update-info/src/hook');

hook.addReadyCallback(async (updates) => {
  // ...
});

hook.addGeneratedCallback(async (updates) => {
  // ...
});
```

### Callbacks for ready hook

Callbacks registered by `addReadyCallback()` will be invoked when `ready()` hook was executed.

This can be used to handle data inside the VuePress site, for example add client dynamic module.

### Callbacks for generated hook

Callbacks registered by `addGeneratedCallback()` will be invoked when `generated()` hook was executed.

This can be used to do something after static site was generated, for example notify to slack.


## Generation Util

You still need to implement code to store multi-generation data by yourself.

But this plugin provides the measures to get difference of 2 generations.

Each generation data is expressed as `Generation`.

You can get difference by classes extending `DiffStyle`.

| class                      | criteria                                                                    |
|----------------------------|-----------------------------------------------------------------------------|
| `DiffStyleDate`            | The date is new one in current generation.                                  |
| `DiffStyleDateDescription` | The date is new one in current generation, or the description was modified. |

### Usage example

```js
const {
  Generation,
  DiffStyleDate,
} = require('vuepress-plugin-frontmatter-update-info/src/generation-util');

const generationData = ...; // Fetch data from somewhere generation data being stored.
const generation0 = new Generation(generationData.generation_0);
const generation1 = new Generation(generationData.generation_1);
const targetPages = new DiffStyleDate().get(generation0, generation1);
```

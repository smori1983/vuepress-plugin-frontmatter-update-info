# vuepress-plugin-frontmatter-update-info

VuePress plugin to **manually** maintain page update info by using frontmatter.

Visit [online demo](https://vp-frontmatter-update-info.herokuapp.com/).


## Overview

First, write description as frontmatter about how the page was updated.

Then the plugin will create the client dynamic module, which is JSON collecting frontmatter data.

Basically update info is shown as list, and you can enable option to show it in each page.

Default component is provided, and it is also possible to implement your own component by using the client module.


## Configuration options

| name                 | description                                         | default value                            |
|----------------------|-----------------------------------------------------|------------------------------------------|
| `frontmatterKey`     | Key to define update info data.                     | `'update_info'`                          |
| `pageEmbed`          | Switch to enable embed of update info to each page. | `false`                                  |
| `pageEmbedMarker`    | Marker for manual page embed.                       | `'[[update_info]]'`                      |
| `pageEmbedComponent` | Component name used for page embed.                 | `'PluginFrontmatterUpdateInfoPageEmbed'` |


## Data structure of frontmatter

- `update_info` (is default value of `frontmatterKey`) has list of records.
- Each record has `date` (required) and `description` (optional).
  - Format of `date` is `YYYY/MM/DD`.
  - `description` has `string` or array of `string`.

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
- The text for marker (by default `'[[update_info]]'`) is not included in the page.

In other words, you can show update info in any place of the page by manually writing page embed marker.


## Default components

### `FrontmatterUpdateInfoList.vue`

Displays update info as list.

```
<PluginFrontmatterUpdateInfoList/>
```

Displays '`NEW`' badge 7 days by default. To change the threshold, use the component like below:

```
<PluginFrontmatterUpdateInfoList :new-threshold="14"/>
```

Or, if you do not want to display badge:

```
<PluginFrontmatterUpdateInfoList :new-threshold="0"/>
```

### `FrontmatterUpdateInfoTable.vue`

Displays update info as table.

```
<PluginFrontmatterUpdateInfoTable/>
```

Displays '`NEW`' badge 7 days by default. To change the threshold, use the component like below:

```
<PluginFrontmatterUpdateInfoTable :new-threshold="14"/>
```

Or, if you do not want to display badge:

```
<PluginFrontmatterUpdateInfoTable :new-threshold="0"/>
```

### `FrontmatterUpdateInfoDebug.vue`

Outputs generated client module.

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

Mainly this is designed to save multi-generation data and use them for something (You need to prepare some method to save the data).

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

This can be used to do something after static site was generated, for example notify with slack.

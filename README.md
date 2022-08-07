# vuepress-plugin-frontmatter-update-info

VuePress plugin to **manually** maintain page update info by using frontmatter.

Visit [online demo](https://vp-frontmatter-update-info.herokuapp.com/).


## Overview

First, write description as frontmatter about how the page was updated.

Then the plugin will create the client module, which is JSON collecting frontmatter data.

Default component is provided, and it is also possible to implement your own component by using the client module.


## Data structure of frontmatter

- `update_info` has array of records.
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


## clientDynamicModules

This plugin collects frontmatter data and generates client module named:

```
@dynamic/vuepress-plugin-frontmatter-update-info/data.js
```


## Default components

### `FrontmatterUpdateInfoList.vue`

Provides update info list.

```
<PluginFrontmatterUpdateInfoList/>
```

Displays '`NEW`' badge 7 days by default. to change the threshold, use the component like below:

```
<PluginFrontmatterUpdateInfoList :new-threshold="14"/>
```

Or, do not display badge:

```
<PluginFrontmatterUpdateInfoList :new-threshold="0"/>
```

### `FrontmatterUpdateInfoDebug.vue`

Outputs generated client module.

```
<PluginFrontmatterUpdateInfoDebug/>
```

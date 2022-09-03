---
update_info:
- date: 2022/09/01
  description:
    - Update information.
- date: 2022/08/31
  description:
    - Update information.
---
# Page 007 (C)

In any case, because the keyword of the marker is used in this page, automatic injection of update info is not applied.


## Container

Marker is processed.

:::tip
[[update_info]]
:::

Example to avoid being processed:

:::tip
`[[update_info]]`
:::


## Code block

Marker is not processed.

```
[[update_info]]
```


## Table

Marker is not processed.

| key  | value           |
|------|-----------------|
| key1 | [[update_info]] |


## List

Marker is not processed.

- [[update_info]]
- [[update_info]]

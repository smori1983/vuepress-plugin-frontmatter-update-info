<template>
  <pre class="json">{{ updates }}</pre>
</template>

<script>
import data from '@dynamic/vuepress-plugin-frontmatter-update-info/data';

export default {
  data() {
    return {
      updates: data,
    };
  },
};
</script>

<style lang="stylus" scoped>
.json {
  font-size 12px
  color white
}
</style>

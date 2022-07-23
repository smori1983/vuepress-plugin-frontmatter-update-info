<template>
  <div>
    <div v-for="page in updates">
      <router-link :to="page.path">{{ page.title }}</router-link>
      <ul>
        <li v-for="info in page.info">
          <span>{{ info.date }}</span>
          <ul v-if="info.description.length > 0">
            <li v-for="line in info.description">{{ line }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import data from '@dynamic/vuepress-plugin-frontmatter-update-info/data';

export default {
  data() {
    return {
      updates: [],
    };
  },

  mounted() {
    const sorting = data.slice();

    sorting.sort((a, b) => {
      if (a.dateLast === b.dateLast) {
        return a.title > b.title ? 1 : -1;
      }

      return a.dateLast > b.dateLast ? -1 : 1;
    });

    this.updates = sorting;
  },
};
</script>

<style lang="stylus" scoped>
</style>

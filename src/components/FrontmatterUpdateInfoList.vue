<template>
  <div>
    <div v-for="page in updates">
      <router-link :to="page.path">{{ page.title }}</router-link>
      <new-badge :threshold="newThreshold" :date="page.dateLast"></new-badge>
      <ul>
        <li v-for="record in page.records">
          <span>{{ record.date }}</span>
          <ul v-if="record.description.length > 0">
            <li v-for="line in record.description">{{ line }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import NewBadge from './FrontmatterUpdateInfoNewBadge';

import data from '@dynamic/vuepress-plugin-frontmatter-update-info/data';

export default {
  props: {
    newThreshold: {
      type: Number,
      default: 7,
    },
  },

  components: {
    NewBadge,
  },

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

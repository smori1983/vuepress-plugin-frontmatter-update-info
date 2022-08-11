<template>
  <div>
    <div v-for="page in updates" class="frontmatter-update-info-page">
      <div class="link">
        <router-link :to="page.path">{{ page.title }}</router-link>
        <new-badge :threshold="newThreshold" :date="page.dateLast"></new-badge>
      </div>
      <div v-for="record in page.records" class="record">
        <div class="date">{{ record.date }}</div>
        <div class="description">
          <ul v-if="record.description.length > 0">
            <li v-for="line in record.description">{{ line }}</li>
          </ul>
        </div>
      </div>
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
.frontmatter-update-info-page {
  margin-bottom 2rem

  .link {
    margin-bottom 0.5rem
  }

  .record {
    display flex
    margin-bottom -1px
    border-top 1px solid lightgray
    border-bottom 1px solid lightgray

    .date {
      width 20%
      line-height 2rem
    }

    .description {
      width 80%

      ul {
        margin 0

        li {
          line-height 2rem
        }
      }
    }
  }
}
</style>

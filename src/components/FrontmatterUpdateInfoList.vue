<template>
  <div>
    <div v-for="page in updates" class="frontmatter-update-info-page">
      <div class="link">
        <router-link :to="page.path">{{ page.title }}</router-link>
        <new-badge :threshold="newThreshold" :date="page.dateLast"></new-badge>
      </div>
      <ul class="records">
        <li v-for="record in page.records" class="record">
          <div class="date">{{ record.date }}</div>
          <div class="description">
            <ul v-if="record.description.length > 0">
              <li v-for="line in record.description">{{ line }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import dataMixin from './mixin/data';
import NewBadge from './FrontmatterUpdateInfoNewBadge';

import data from '@dynamic/vuepress-plugin-frontmatter-update-info/data';

export default {
  props: {
    newThreshold: {
      type: Number,
      default: 7,
    },
  },

  mixins: [
    dataMixin,
  ],

  components: {
    NewBadge,
  },

  data() {
    return {
      updates: [],
    };
  },

  mounted() {
    this.updates = this.getSorted(data);
  },
};
</script>

<style lang="stylus" scoped>
.frontmatter-update-info-page {
  margin-bottom 1rem

  .link {
    margin-bottom 0.5rem
  }

  .records {
    margin 0

    .record {
      .date {
        line-height 1.5rem
      }

      .description {
        ul {
          margin 0

          li {
            line-height 1.5rem
          }
        }
      }
    }
  }
}
</style>

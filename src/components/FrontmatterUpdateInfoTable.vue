<template>
  <div class="frontmatter-update-info">
    <div v-for="page in updates" class="frontmatter-update-info-page">
      <div class="link">
        <router-link :to="page.path">{{ page.title }}</router-link>
        <new-badge :threshold="newThreshold" :date="page.dateLast"></new-badge>
      </div>
      <div class="records">
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
.frontmatter-update-info {
  margin 2rem 0

  .frontmatter-update-info-page {
    margin-bottom 2rem

    .link {
      margin-bottom 0.5rem
    }

    .records {
      .record {
        display flex
        margin-bottom -1px
        border-top 1px solid $borderColor
        border-bottom 1px solid $borderColor

        .date {
          width 35%
          line-height 2rem

          @media (min-width: $MQMobileNarrow) {
            width 20%
          }
        }

        .description {
          width 65%

          @media (min-width: $MQMobileNarrow) {
            width 80%
          }

          ul {
            margin 0

            li {
              line-height 2rem
            }
          }
        }
      }
    }
  }
}
</style>

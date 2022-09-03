<template>
  <div v-if="pageData" class="frontmatter-update-info-page">
    <div class="records">
      <div v-for="record in pageData.records" class="record">
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
import dataMixin from './mixin/data';

import data from '@dynamic/vuepress-plugin-frontmatter-update-info/data';

export default {
  mixins: [
    dataMixin,
  ],

  data() {
    return {
      pageData: null,
    };
  },

  mounted() {
    this.pageData = this.findByKey(data, this.$page.key);
  },
}
</script>

<style lang="stylus" scoped>
.frontmatter-update-info-page {
  margin 1rem 0 2rem

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
}
</style>

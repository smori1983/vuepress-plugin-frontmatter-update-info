<template>
  <div v-if="pageData" class="frontmatter-update-info">
    <div class="frontmatter-update-info-page">
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
@require '../styles/table.styl'
</style>

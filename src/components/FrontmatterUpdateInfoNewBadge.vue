<template>
  <span v-if="show" class="badge">{{ label }}</span>
</template>

<script>
import moment from 'moment';

import config from '@dynamic/vuepress-plugin-frontmatter-update-info/config';

export default {
  props: {
    date: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: 'NEW',
    },
  },

  data() {
    return {
      show: false,
    };
  },

  mounted() {
    if (typeof config.newInfoThresholdDays === 'number') {
      const format = 'YYYY/MM/DD';

      const today = moment().format(format);

      const newLastDate = moment(this.date, format)
        .add(config.newInfoThresholdDays, 'd')
        .format(format);

      this.show = today < newLastDate;
    }
  },
};
</script>

<style lang="stylus" scoped>
.badge
  display inline-block
  margin-left 5px
  padding 0 5px
  color white
  background-color $badgeTipColor
</style>

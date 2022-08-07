<template>
  <span v-if="show" class="badge">{{ label }}</span>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    threshold: {
      type: Number,
      default: 7,
    },
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
    const format = 'YYYY/MM/DD';

    const today = moment().format(format);

    const newLastDate = moment(this.date, format)
      .add(this.threshold, 'd')
      .format(format);

    this.show = today < newLastDate;
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

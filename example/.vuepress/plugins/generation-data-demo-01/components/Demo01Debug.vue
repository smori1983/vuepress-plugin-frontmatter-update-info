<template>
  <div>
    <h3>How ?</h3>
    <ul>
      <li><code>generation-data-demo-01</code> plugin uses <a href="https://www.npmjs.com/package/conf" target="_blank">conf</a> to store 2 generations of update info.</li>
      <li>To demonstrate, this plugin collects update info when <code>ready()</code> executed.</li>
    </ul>

    <h3>Page key list of new updates</h3>
    <pre class="json">{{ newKeys }}</pre>

    <h3>Page key list of existing updates</h3>
    <pre class="json">{{ existingKeys }}</pre>

    <h3>List of new update info</h3>
    <ul>
      <li>New updates: add them all</li>
      <li>Existing updates: add based on <code>recordsHash</code></li>
    </ul>
    <pre class="json">{{ targetPages }}</pre>

    <h3>Update info of current and previous generations</h3>
    <p>Data is managed by <code>generation-data-demo-01</code>plugin.</p>
    <ul>
      <li><code>generation_0</code>: current</li>
      <li><code>generation_1</code>: previous</li>
    </ul>
    <pre class="json">{{ data }}</pre>
  </div>
</template>

<script>
import data from '@dynamic/generation-data-demo-01/data';

export default {
  data () {
    return {
      data: data,
      newKeys: [],
      existingKeys: [],
      targetPages: [],
    };
  },

  mounted() {
    const generation0Keys = data.generation_0.map(page => page.key);
    const generation1Keys = data.generation_1.map(page => page.key);

    const targetPages = [];

    this.newKeys = generation0Keys.filter((key) => !generation1Keys.includes(key));
    this.existingKeys = generation0Keys.filter((key) => generation1Keys.includes(key));

    this.newKeys.forEach((key) => {
      targetPages.push(this.findPageByKey(data.generation_0, key));
    })

    this.existingKeys.forEach((key) => {
      const generation0Page = this.findPageByKey(data.generation_0, key);
      const generation1Page = this.findPageByKey(data.generation_1, key);

      if (generation0Page.recordsHash !== generation1Page.recordsHash) {
        targetPages.push(generation0Page);
      }
    });

    this.targetPages = targetPages;
  },

  methods: {
    /**
     * @param {Object[]} pages
     * @param {string} key
     */
    findPageByKey(pages, key) {
      return pages.find(page => page.key === key);
    },
  },
};
</script>

<style lang="stylus" scoped>
.json {
  font-size 12px
  color white
}
</style>

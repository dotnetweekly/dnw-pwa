<template>
  <div>
    <div class="link-back-button">
      <router-link to="/">
        <i class="icon-left-open" aria-hidden="true"></i> This week</router-link>
    </div>
    <h1>Previous Newsletters</h1>
    <div class="separator newsletter-separator"></div>
    <dnw-loading v-if="rows && rows.length === 0"></dnw-loading>
    <div class="columns" v-for="(row, weeksIndex) in rows" v-bind:key="weeksIndex">
      <div class="column card" v-for="(item, weekIndex) in row" v-bind:key="weekIndex">
        <a :href="newsletterDomain + 'issues/' + item.year + '/' + item.week">Week: {{item.week}} Year: {{item.year}}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import config from "../../app.config";
import dnwLoading from "../components/dnwLoading";

const fetchInitialData = store => {
  return store.dispatch(`newslettersModule/getNewsletters`, {});
};

export default {
  components: {
    "dnw-loading": dnwLoading
  },
  data() {
    return {
      newsletterDomain: config.newsletterDomain
    };
  },
  computed: {
    ...mapGetters("newslettersModule", ["newsletters"]),
    rows() {
      const rows = [];
      let row = [];

      for (var i = 0; i < this.newsletters.length; i++) {
        const newsletter = this.newsletters[i];
        row.push({
          week: newsletter.week,
          year: newsletter.year
        });
        if (row.length === 5) {
          rows.push(row);
          row = [];
        }
      }

      return rows;
    }
  },
  methods: {
    loadItems() {
      fetchInitialData(this.$store, this.$route);
    }
  },
  watch: {
    $route() {
      this.loadItems();
    }
  },
  prefetch: fetchInitialData,
  mounted() {
    if (typeof window !== "undefined") {
      this.loadItems();
    }
  }
};
</script>
<style scoped>
.newsletter-separator {
  margin-top: 1.5rem;
  padding-top: 3rem;
}
</style>

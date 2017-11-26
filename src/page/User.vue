<template>
<div class="columns">
  <span v-if="profile">{{profile.email}}</span>
</div>
</template>
<script>
import { mapGetters } from "vuex";

const fetchInitialData = (store, route) => {
  return store.dispatch(`userModule/getProfile`);
};

export default {
  computed: {
    ...mapGetters("userModule", ["profile"])
  },
  methods: {
    loadData() {
      fetchInitialData(this.$store, this.$route);
    }
  },
  watch: {
    $route(to, from) {
      this.loadData();
    }
  },
  prefetch: fetchInitialData,
  created() {
    this.loadData();
  }
};
</script>
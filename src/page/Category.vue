<template>
<div class="columns">
  <dnw-menu></dnw-menu>
  <div class="column">
    <dnw-link v-for="link in links" v-bind:key="link._id" :link="link"></dnw-link>
  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import dnwLink from "../components/dnwLink";
import dnwMenu from "../components/dnwMenu";

const fetchInitialData = (store, route) => {
  route.params.page = route.params.page || 1;
  route.params.id = route.params.id || "";
  return store.dispatch(`linksModule/getLinks`, {
    categoryId: route.params.id,
    page: route.params.page
  });
};

export default {
  components: {
    "dnw-link": dnwLink,
    "dnw-menu": dnwMenu
  },
  computed: {
    ...mapGetters("linksModule", ["links"])
  },
  methods: {
    loadLinks() {
      fetchInitialData(this.$store, this.$route);
    }
  },
  watch: {
    $route(to, from) {
      this.loadLinks();
    }
  },
  prefetch: fetchInitialData,
  created() {
    this.loadLinks();
  }
};
</script>
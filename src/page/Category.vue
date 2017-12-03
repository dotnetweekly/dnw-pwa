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
import * as calendarHelper from "../helpers/calendar";

const fetchInitialData = (store, route) => {
  route.params.week = route.params.week || "";
  route.params.year = route.params.year || "";
  route.params.category = route.params.category || "";
  route.params.date = Date.now();

  if(route.params.week && route.params.year){
    route.params.date = calendarHelper.getDateRangeOfWeek(route.params.week, route.params.year).from;
  }
  return store.dispatch(`linksModule/getLinks`, {
    week: route.params.week,
    year: route.params.year,
    category: route.params.category,
    date: route.params.date
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

<template>
<div class="columns">
  <div class="column is-one-quarter main-menu tight">
    <dnw-menu></dnw-menu>
    <div v-if="loading" class="menu-loading"></div>
  </div>
  <div class="column">
    <dnw-link v-if="links" v-for="link in links" v-bind:id="link._id" v-bind:key="link._id" :link="link"></dnw-link>
    <div v-if="!loading && links && links.length == 0">
      <h2 class="has-text-centered">Oops, no links found for this week/category.
        <span v-if="olderLinks && olderLinks.length > 0">Below you can see some older links</span></h2>
      <p class="has-text-centered">
        <span>Don't see the cool .NET link you found this week?</span>
        <router-link to="/add">Add your favorite dotNET link</router-link>
      </p>
      <div class="separator"></div>
      <dnw-link v-if="olderLinks && olderLinks.length > 0" v-for="link in olderLinks"
        v-bind:id="link._id"
        v-bind:key="link._id"
        :link="link">
      </dnw-link>
      <div class="separator"></div>
      <p class="has-text-centered">
        A free weekly newsletter on .NET latest
      </p>
    </div>

  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import dnwLink from "../components/dnwLink";
import dnwMenu from "../components/dnwMenu";
import * as calendarHelper from "../helpers/calendar";
import setMetadata from "../helpers/metadata";

const fetchInitialData = (store, route) => {
  route.params.week = route.params.week || "";
  route.params.year = route.params.year || "";
  route.params.category = route.params.category || "";

  if (!route.params.week || !route.params.year) {
    route.params.date = new Date(Date.now());
    route.params.date.setHours(0,0,0,0);
    route.params.year = route.params.date.getFullYear();
    route.params.week = calendarHelper.getWeek(route.params.date);
  }

  if (route.params.week && route.params.year) {
    route.params.date = calendarHelper.getDateRangeOfWeek(
      route.params.week,
      route.params.year
    ).from;
  }
  return store.dispatch(`linksModule/getLinks`, {
    week: route.params.week,
    year: route.params.year,
    category: route.params.category,
    date: route.params.date
  });
};

export default {
  data() {
    return {
      loading: false
    }
  },
  components: {
    "dnw-link": dnwLink,
    "dnw-menu": dnwMenu
  },
  computed: {
    ...mapGetters("linksModule", ["links", "olderLinks", "filter"]),
    filterDateChange () {
      return this.filter ? this.filter.date : ""
    },
    linkCount() {
      return (this.links && this.olderLinks) ? this.links.length + this.olderLinks.length : 0;
    }
  },
  methods: {
    loadLinks() {
      fetchInitialData(this.$store, this.$route);
    },
    refreshScroll() {
      if(typeof window !== "undefined" && this.$route.hash){
        location.href = this.$route.hash;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.loading = true;
      this.loadLinks();
    },
    filterDateChange () {
      this.loading = false;
      setMetadata(this.$route.path, this.$store.state);
    },
    linkCount (newData, oldData) {
      if (newData != 0) {
        this.loading = false;
      }
    }
  },
  prefetch: fetchInitialData,
  mounted() {
    if(typeof window !== "undefined"){
      setTimeout(() => {this.refreshScroll()});
    }
  },
  created() {
    this.loadLinks();
  }
};
</script>
<style>
  .menu-loading {
    position: absolute;
    top: 0;
    left: -1rem;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>

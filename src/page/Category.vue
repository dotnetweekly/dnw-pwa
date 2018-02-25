<template>
<div>
  <div class="columns">
    <div class="column is-one-quarter main-menu tight">
      <dnw-menu></dnw-menu>
      <div v-if="linksLoading" class="menu-loading"></div>
    </div>
    <div class="column" v-if="linksLoading">
      <dnw-loading></dnw-loading>
    </div>
    <div class="column" v-if="!linksLoading">
      <dnw-subscribe v-if="!isAuthenticated"></dnw-subscribe>
      <dnw-link v-if="links" v-for="link in linksOrdered" v-bind:id="link._id" v-bind:key="link._id" :link="link"></dnw-link>
      <div v-if="!linksLoading && links && links.length == 0">
        <h2 class="has-text-centered">Oops, no links found for this week/category.
          <span v-if="olderLinks && olderLinks.length > 0">Below you can see some older links</span></h2>
        <p class="has-text-centered">
          <span>Don't see the cool .NET link you found this week?</span>
          <router-link alt="add a link" to="/add">Add your favorite dotNET link</router-link>
        </p>
        <div class="separator"></div>
        <dnw-link v-if="olderLinks && olderLinks.length > 0" v-for="link in olderLinks"
          v-bind:id="link._id"
          v-bind:key="link._id"
          :link="link">
        </dnw-link>
      </div>
      <div class="separator"></div>
      <div class="has-text-centered">
        <p>A free weekly newsletter on .NET latest</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import dnwLink from "../components/dnwLink";
import dnwMenu from "../components/dnwMenu";
import dnwSubscribe from "../components/dnwSubscribe";
import dnwLoading from "../components/dnwLoading";

import * as calendarHelper from "../helpers/calendar";
import setMetadata from "../helpers/metadata";

const fetchInitialData = (store, route) => {
  let params = route.params || {};
  let week = params.week || "";
  let year = params.year || "";
  let category = params.category || "";

  if (!week || !year) {
    let date = new Date(Date.now());
    date.setHours(0,0,0,0);
    year = date.getFullYear();
    week = calendarHelper.getWeek(date);
  }

  return store.dispatch(`linksModule/getLinks`, {
    week,
    year,
    category
  });
};

export default {
  components: {
    "dnw-link": dnwLink,
    "dnw-menu": dnwMenu,
    "dnw-subscribe": dnwSubscribe,
    "dnw-loading": dnwLoading
  },
  computed: {
    ...mapGetters("linksModule", ["links", "olderLinks", "filter", "linksLoading"]),
    ...mapGetters("authModule", ["isAuthenticated"]),
    filterWeekChange () {
      return this.filterWeek
    },
    linksOrdered() {
      return this.links;
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
      this.loadLinks();
    },
    filterWeekChange () {
      setMetadata(this.$route.path, this.$store.state);
    }
  },
  prefetch: fetchInitialData,
  mounted() {
    if(typeof window !== "undefined"){
      setTimeout(() => {this.refreshScroll()});
      this.loadLinks();
    }
  }
};
</script>
<style>
  .menu-loading {
    position: absolute;
    top: 0;
    left: -1rem;
    width: calc(25% + 1rem);
    height: 100%;
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>

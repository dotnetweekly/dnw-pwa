<template>
  <div>
    <div class="columns">
      <div class="column is-one-quarter main-menu tight">
        <dnw-menu></dnw-menu>
        <div v-show="linksAreLoading" class="menu-loading"></div>
      </div>
      <div class="column" v-show="linksAreLoading">
        <dnw-loading></dnw-loading>
      </div>
      <div class="column" v-if="!linksAreLoading">
        <dnw-subscribe v-if="!isAuthenticated"></dnw-subscribe>
        <dnw-link
          v-if="links"
          v-for="link in links"
          v-bind:id="link._id"
          v-bind:key="link._id"
          :link="link"
        ></dnw-link>
        <div v-if="links && links.length == 0">
          <h2 class="has-text-centered">
            No links found for this week/category.
            <span v-if="olderLinks && olderLinks.length > 0"
              >Below you can see some older links</span
            >
          </h2>
          <p class="has-text-centered">
            <span>Don't see the cool .NET link you found this week?</span>
            <router-link class="link-dark" alt="add a link" to="/add"
              >Add your favorite dotNET link</router-link
            >
          </p>
          <div class="separator"></div>
          <dnw-link
            v-if="olderLinks && olderLinks.length > 0"
            v-for="link in olderLinks"
            v-bind:id="link._id"
            v-bind:key="link._id"
            :link="link"
          >
          </dnw-link>
        </div>
        <div class="separator"></div>
        <div class="has-text-centered">
          <p>A free weekly newsletter on .NET latest</p>
        </div>
        <div class="separator"></div>
        <div class="">
          <a href="//pluralsight.pxf.io/c/1222672/560022/7490"
            ><img
              src="//a.impactradius-go.com/display-ad/7490-560022"
              border="0"
              alt=""
              width="320"
              height="100"/></a
          ><img
            height="0"
            width="0"
            src="//pluralsight.pxf.io/i/1222672/560022/7490"
            style="position:absolute;visibility:hidden;"
            border="0"
          />
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

  // import * as calendarHelper from "../helpers/calendar";
  import setMetadata from "../helpers/metadata";

  const fetchInitialData = (store, route) => {
    let params = route.params || {};
    let week = params.week === "undefined" ? "" : params.week || "";
    let year = params.year === "undefined" ? "" : params.year || "";
    let category = params.category || "";

    return store.dispatch(`linksModule/getLinks`, {
      week,
      year,
      category,
      authenticated: store.state.authModule.isAuthenticated
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
      ...mapGetters("linksModule", [
        "linksAreLoading",
        "links",
        "olderLinks",
        "filter"
      ]),
      ...mapGetters("authModule", ["isAuthenticated"]),
      filterWeekChange() {
        return this.filterWeek;
      }
    },
    methods: {
      loadLinks() {
        fetchInitialData(this.$store, this.$route);
      }
    },
    watch: {
      $route() {
        if (typeof window !== "undefined") {
          this.loadLinks();
        }
      },
      filterWeekChange() {
        if (typeof window !== "undefined") {
          setMetadata(this.$route.path, this.$store.state);
        }
      }
    },
    prefetch: fetchInitialData,
    mounted() {
      if (typeof window !== "undefined") {
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

  @media (max-width: 900px) {
    .menu-loading {
      width: calc(100% + 2rem);
    }
  }
</style>

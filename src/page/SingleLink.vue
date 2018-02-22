<template>
  <div v-if="link">
    <div class="link-back-button"><a v-on:click="goBackLink()"><i class="icon-left-open" aria-hidden="true"></i> Back</a></div>
    <div class="columns link-title-wrapper">
      <div class="column upvote-column">
        <dnw-upvote class="column"
        :linkId="link._id"
        :hasUpvoted.sync="link.hasUpvoted"
        :upvoteCount.sync="link.upvoteCount">
        </dnw-upvote>
      </div>
      <div class="column">
        <h1 class="link-title">
          <dnw-category-icon :category="link.category" class="link-category-icon"></dnw-category-icon>
          <a :href="link.url" target="_blank">{{link.title}}</a>
        </h1>
        <p class="link-subline">
          <span>by </span><router-link :to="`/users/${link.user.username}`">{{ link.user.username }}</router-link><span>, </span>
          <span>{{ link.createdOn | formatDate }}</span>
        </p>
        <p class="link-tags">
          <span v-for="tag in link.tags" v-bind:key="tag._id"
            class="tag is-light">{{ tag }}</span>
        </p>
      </div>
    </div>
    <p v-if="!link.content" class="link-content">
      Loading...
    </p>
    <p class="link-content">
      {{link.content}}
    </p>
    <p class="link-more"><a :href="link.url" target="_blank" class="button is-primary">Read More</a></p>
    <dnw-comments v-bind:linkId="link._id" v-bind:comments="link.comments"></dnw-comments>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DNWComments from "../components/dnwComments.vue";
import dnwCategoryIcon from "../components/dnwCategoryIcon";
import dnwUpvote from "../components/dnwUpvote";
import setMetadata from "../helpers/metadata";

const fetchInitialData = (store, route) => {
  return store.dispatch(`linkModule/getLink`, route.params.id);
};

export default {
  components: {
    "dnw-category-icon": dnwCategoryIcon,
    "dnw-comments": DNWComments,
    "dnw-upvote": dnwUpvote
  },
  computed: {
    ...mapGetters("linkModule", ["link"]),
    ...mapGetters("authModule", ["latestPath"]),
    routeStateChange () {
      return this.link
    }
  },
  methods: {
    loadLink() {
      fetchInitialData(this.$store, this.$route);
    },
    goBackLink() {
      if (typeof window === "undefined") {
        return;
      }
      if (this.$route.query && this.$route.query.redirect) {
        this.$router.push(`${this.$route.query.redirect}#${this.link._id}`);

        return;
      }
      if (this.latestPath) {
        this.$router.push(`${this.latestPath}#${this.link._id}`);

        return;
      }

      this.$router.push(`${this.link.category}#${this.link._id}`);
    }
  },
  watch: {
    $route(to, from) {
      this.loadLink();
    },
    routeStateChange() {
      setMetadata(this.$route.path, this.$store.state);
    }
  },
  prefetch: fetchInitialData,
  mounted() {
    this.loadLink();
  }
};
</script>
<style lang="scss">
  @import "../styles/_singleLink";
  .upvote-column{
    width: 80px;
    flex: none;
    padding-right: 0;
  }
  .upvote{
    margin-top: 0.5rem;
    margin-right: 0.5rem;
  }
  .link-category-icon {
    font-size: 70%;
    width: 45px;
    padding-top: 0.5rem;
    display: block;
    float: left;
  }
  .link-title{
    padding-left: 0px;
    padding-right: 0px;
  }
  .link-subline{
    margin-top: 0.5rem;
    margin-bottom: 0.5rem !important;
  }
  .link-subline, .link-tags {
    margin-left: 0.5rem;
  }
</style>

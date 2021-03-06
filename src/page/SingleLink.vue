<template>
  <div v-if="link">
    <div class="link-back-button">
      <a v-on:click="goBackLink()">
        <i class="icon-left-open" aria-hidden="true"></i> Back</a>
    </div>
    <dnw-loading v-if="linkLoading"></dnw-loading>
    <div v-if="!linkLoading">
      <div class="columns link-title-wrapper">
        <div class="column upvote-column">
          <dnw-upvote class="column"
          :linkId="link._id"
          :hasUpvoted.sync="link.hasUpvoted"
          :upvoteCount.sync="link.upvoteCount">
          </dnw-upvote>
          <a class="twitter-share-button" :href="`https://twitter.com/intent/tweet?text=${this.link.title}`">Tweet</a>
        </div>
        <div class="column">
          <h1 class="link-title">
            <dnw-category-icon :category="link.category" class="link-category-icon"></dnw-category-icon>
            <a :href="link.url" target="_blank">{{link.title}}</a>
          </h1>
          <p class="link-subline">
            <span>by </span>
            <router-link :to="`/users/${link.user.username}`">{{ link.user.username }}</router-link>
            <span>, </span>
            <span>{{ link.createdOn | formatDate }}</span>
          </p>
          <p class="link-tags">
            <span v-for="tag in link.tags" v-bind:key="tag._id" class="tag is-light">{{ tag }}</span>
          </p>
        </div>
      </div>
      <div class="link-content" v-html="link.content"></div>
      <p class="link-more">
        <a :href="link.url" target="_blank" class="button is-primary">Read More</a>
      </p>
      <dnw-comments v-bind:linkId="link._id" v-bind:comments="link.comments"></dnw-comments>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DNWComments from "../components/dnwComments.vue";
import dnwCategoryIcon from "../components/dnwCategoryIcon";
import dnwUpvote from "../components/dnwUpvote";
import dnwLoading from "../components/dnwLoading";
import setMetadata from "../helpers/metadata";

const fetchInitialData = (store, route) => {
  return store.dispatch(`linkModule/getLink`, {
    slug: route.params.id,
    authenticated: store.state.authModule.isAuthenticated
  });
};

export default {
  data() {
    return {
      tweetInfo: ""
    };
  },
  components: {
    "dnw-category-icon": dnwCategoryIcon,
    "dnw-comments": DNWComments,
    "dnw-upvote": dnwUpvote,
    "dnw-loading": dnwLoading
  },
  computed: {
    ...mapGetters("linkModule", ["link", "linkLoading"]),
    ...mapGetters("authModule", ["latestPath"]),
    routeStateChange() {
      this.getTweet();
      return this.link;
    }
  },
  methods: {
    loadLink() {
      fetchInitialData(this.$store, this.$route);
    },
    getTweet() {
      if (this.link && typeof window !== "undefined") {
        this.loadTweet();
      }

      return "";
    },
    loadTweet() {
      setTimeout(() => {
        /* eslint-disable no-undef */
        if (twttr && twttr.widgets) {
          /* eslint-disable no-undef */
          twttr.widgets.load();
        }
      });
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
    $route() {
      this.loadLink();
    },
    routeStateChange() {
      if (typeof window !== "undefined") {
        setMetadata(this.$route.path, this.$store.state);
      }
    }
  },
  prefetch: fetchInitialData,
  mounted() {
    if (typeof window !== "undefined") {
      this.loadLink();
    }
  }
};
</script>
<style lang="scss">
@import "../styles/_singleLink";
.upvote-column {
  width: 80px;
  flex: none;
  padding-right: 0;
}

.upvote {
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

.link-title {
  padding-left: 0px;
  padding-right: 0px;
}

.link-subline,
.link-tags {
  margin-left: 0.5rem;
}
</style>

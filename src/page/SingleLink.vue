<template>
  <div>
    <div class="columns link-title-wrapper">
      <div class="column link-back-button"><a v-on:click="goBack()"><i class="icon-left-open" aria-hidden="true"></i></a></div>
      <h1 class="column link-title">
        <dnw-category-icon :category="link.category.slug" class="link-category-icon"></dnw-category-icon>{{link.title}}
      </h1>
    </div>
    <p class="link-subline">
      <span>by </span><router-link :to="`/users/${link.user.username}`">{{ link.user.username }}</router-link><span>, </span>
      <span>{{ link.createdOn | formatDate }}</span>
    </p>
    <p class="link-tags">
      <span v-for="tag in link.tags" v-bind:key="tag._id"
        class="tag is-light">{{ tag.name }}</span>
    </p>
    <p class="link-content">{{link.content}}</p>
    <p class="link-more"><a :href="link.url" target="_blank" class="button is-primary">Read More</a></p>
    <dnw-comments v-bind:comments="link.comments"></dnw-comments>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DNWComments from "../components/dnwComments.vue";
import dnwCategoryIcon from "../components/dnwCategoryIcon";

const fetchInitialData = (store, route) => {
  return store.dispatch(`linkModule/getLink`, route.params.id);
};

export default {
  components: {
    "dnw-category-icon": dnwCategoryIcon,
    "dnw-comments": DNWComments,
  },
  computed: {
    ...mapGetters("linkModule", ["link"]),
    ...mapGetters("authModule", ["latestPath"])
  },
  methods: {
    loadLink() {
      fetchInitialData(this.$store, this.$route);
    },
    goBack(link) {

      if (typeof window === "undefined") {
        return;
      }
      if (this.$route.query && this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect);

        return;
      }
      if (this.latestPath) {
        this.$router.push(this.latestPath);

        return;
      }

      this.$router.push(this.link.category.slug);
    }
  },
  watch: {
    $route(to, from) {
      this.loadLink();
    }
  },
  prefetch: fetchInitialData,
  mounted() {
    this.loadLink();
  }
};
</script>
<style lang="scss" scoped>
  @import "../styles/_singleLink";
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
  .link-subline, .link-tags {
    margin-left: 2.5rem;
  }
</style>
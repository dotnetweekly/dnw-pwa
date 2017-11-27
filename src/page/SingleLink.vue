<template>
  <div>
    <div class="columns link-title-wrapper">
      <div class="column link-back-button"><a v-on:click="goBack()"><i class="icon-left-open" aria-hidden="true"></i></a></div>
      <h1 class="column link-title">{{link.title}}</h1>
    </div>
    <p class="link-subline">
      <span v-if="link.user">by <router-link :to="`/users/${link.user.username}`">{{ link.user.username }}</router-link>, </span>
      <time :datetime="link.createdOn">{{ link.createdOn }}</time>
    </p>
    <p class="link-tags">
      <router-link v-for="tag in link.tags" v-bind:key="tag._id"
        :to="'/tags/' + tag.name"
        class="tag is-light">{{ tag.name }}</router-link>
    </p>
    <p class="link-content">{{link.content}}</p>
    <p class="link-more"><a :href="link.url" target="_blank" class="button is-primary">Read More</a></p>
    <dnw-comments v-if="link._id" v-bind:link="link._id">{{link._id}}</dnw-comments>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DNWComments from "../components/dnwComments.vue";

const fetchInitialData = (store, route) => {
  return store.dispatch(`linkModule/getLink`, route.params.id);
};

export default {
  components: {
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
  created() {
    this.loadLink();
  }
};
</script>
<style lang="scss" scoped>
  @import "../_variables";

  .link-title-wrapper{
    margin-bottom: 0;
  }

  .link-content, .link-more {
    font-size: 20px;
  }

  .link-subline{
    font-size: 80%;
    margin-bottom: $is-size-7 !important;
  }

  .link-title{
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .link-back-button {
    padding-right: $is-size-4;
    width: 50px;
    flex: none;
  }

  .link-back-button a{
    padding-top: $is-size-7;
    display: block;
  }

  .is-pulled-left {
    float: left;
  }

  .link-content {
    padding-bottom: $is-size-2;
  }

  .link-more {
    width: 100%;
    text-align: center;
  }

  .link-more a {
    padding: $is-size-4;
    font-size: 20px;
  }
</style>

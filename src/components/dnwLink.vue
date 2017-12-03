<template>
  <div class="card card-padding content">
    <div class="columns card-padding constant-flex">
      <dnw-upvote class="column upvote-column">{{link.upvotes.length}}</dnw-upvote>
      <div class="column link-content">
        <router-link :to="`/${link.category.slug}/${link.slug}`">
          <dnw-category-icon :category="link.category.slug" class="link-category-icon"></dnw-category-icon>
          <span>{{ link.title }}</span>
        </router-link>
        <p class="link-subline">
          <span v-if="link.user">by <router-link :to="`/users/${link.user.username}`">{{ link.user.username }}</router-link>, </span>
          <time :datetime="link.createdOn">{{ link.createdOn | formatDate }}</time>
        </p>
        <p class="link-tags">
          <router-link v-for="tag in link.tags" v-bind:key="tag._id"
            :to="'/tags/' + tag.name"
            class="tag is-light">{{ tag.name }}</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import dnwUpvote from "../components/dnwUpvote";
import dnwCategoryIcon from "./dnwCategoryIcon";

export default {
  components: {
    "dnw-category-icon": dnwCategoryIcon,
    "dnw-upvote": dnwUpvote
  },
  props: ["link"]
};
</script>
<style lang="scss" scoped>
@import "../_variables";
.link-category-icon{
  padding-right: 0.5rem;
}
.card-padding {
  padding: 1rem 1rem 0.5rem 1rem;
  margin-bottom: 0;
}
.link-content {
  padding: 0 0 0 $is-size-4;
}
.link-subline {
  font-size: $is-size-7;
}
.link-tags {
  .tag {
    margin-right: $is-size-7;
  }
}
</style>

<template>
  <div class="card card-padding content">
    <div class="columns card-padding constant-flex">
      <dnw-upvote class="column upvote-column"
      :linkId="link._id"
      :hasUpvoted.sync="link.hasUpvoted"
      :upvoteCount.sync="link.upvoteCount">
      </dnw-upvote>
      <div class="column link-content">
        <router-link :to="`/${link.category}/${link.slug}`">
          <dnw-category-icon :category="link.category" class="link-category-icon"></dnw-category-icon>
          <span>{{ link.title }}</span>
        </router-link>
        <p class="link-subline">
          <span v-if="link.user">by <router-link :to="`/users/${link.user.username}`">{{ link.user.username }}</router-link>, </span>
          <time :datetime="link.createdOn">{{ link.createdOn | formatDate }}</time>
        </p>
        <p class="link-tags" v-if="link.tags && link.tags.length > 0">
          <span v-for="tag in link.tags" v-bind:key="tag"
            class="tag is-light">{{ tag }}</span>
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
.link-category-icon {
  margin-right: 0.2rem;
  width: 25px;
  display: block;
  float: left;
}
.card-padding {
  padding: 1rem 1rem 0.5rem 1rem;
  margin-bottom: 0;
}
.link-content {
  padding: 0 0 0 $is-size-4;
}
.link-subline {
  font-size: 16px;
}
.link-tags {
  .tag {
    margin-right: $is-size-7;
  }
}
</style>

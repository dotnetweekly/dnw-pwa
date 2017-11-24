<template>
  <div class="card card-content content">
    <div class="columns constant-flex">
      <dnw-upvote class="column upvote-column">1</dnw-upvote>
      <div class="column link-content">
        <a target="_blank" :href="link.url">{{ link.title }}</a>
        <p class="link-subline">
          by <a>{{ link.user.username }}</a>, 
          <time :datetime="link.createdOn">{{ link.createdOn }}</time>
        </p>
        <p class="link-tags">
          <a v-for="tag in link.tags" v-bind:key="tag._id" class="tag is-light">{{ tag.name }}</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import dnwUpvote from "../components/dnwUpvote";
export default {
  components: {
    "dnw-upvote": dnwUpvote
  },
  props: ["link"]
};
</script>
<style lang="scss" scoped>
@import "../_variables";

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
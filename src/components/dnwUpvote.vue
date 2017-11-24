<template>
  <a class="upvote has-text-centered" v-on:click="upvote()">
    <i class="icon-up-open" aria-hidden="true"></i>
    <p>
      <slot></slot>
    </p>
  </a>
</template>
<script>
export default {
  props: ["categoryId"],
  methods: {
    upvote() {}
  }
};
</script>
<style lang="scss" scoped>
@import "../_variables";

.upvote {
  background-color: $background;
  box-shadow: $body-border;
  width: 60px;
  height: 80px;
  flex: none;
}
</style>

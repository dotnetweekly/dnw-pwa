<template>
<article class="media">
  <div class="media-content">
    <div class="content">
      <p>
        <router-link :to="`/users/${comment.user ? comment.user.username : ''}`">
          <strong>{{ comment.user ? comment.user.username : "" }}</strong>
        </router-link>
        <br>
        {{ comment.content }}
        <br>
        <small>{{ comment.createdOn | formatDate }}</small>
      </p>
    </div>
  </div>
</article>
</template>
<script>
export default {
  props: ["comment"]
};
</script>
<style scoped>
.content {
  max-width: 600px;
  display: inline-block;
  word-break: break-all;
}
</style>

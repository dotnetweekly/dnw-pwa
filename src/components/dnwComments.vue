<template>
  <div class="dnw-comments">
    <div class="dnw-comments-wrapper">
      <dnw-comment v-for="comment in comments" v-bind:comment="comment" v-bind:key="comment._id"></dnw-comment>
      <article class="media">
        <div class="media-content">
          <div class="field">
            <p class="control">
              <textarea class="textarea" placeholder="Add a comment..."></textarea>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <button class="button">Post comment</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</article>

    </div>
</template>
<script>
import DNWComment from "../components/dnwComment.vue";
export default {
  components: {
    "dnw-comment": DNWComment,
  },
  props: [
    'comments'
  ]
}
</script>
<style lang="scss" scoped>
  @import "../_variables";
  .dnw-comments {
    border-top: $line;
    margin-top: $is-size-1;
    padding-top: $is-size-4;
    font-size: 90%;
  }

  .dnw-comments-wrapper{
    max-width: $tablet;
    margin: 0 auto;
  }
</style>

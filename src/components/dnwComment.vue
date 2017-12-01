<template>
<article class="media">
  <div class="media-content">
    <div class="content">
      <p>
        <strong>{{ comment.user.username }}</strong>
        <br>
        {{ comment.content }}
        <br>
        <small>{{ comment.createdOn }}</small>
      </p>
    </div>
  </div>
</article>
</article>

    </div>
</template>
<script>
  export default {
    props: [
      'comment'
    ]
  }
</script>

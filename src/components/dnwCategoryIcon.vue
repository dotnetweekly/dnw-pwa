<template>
  <span class="icon is-left">
    <i v-if="category == 'articles'" class="icon-doc-text" aria-hidden="true"></i>
    <i v-if="category == 'books'" class="icon-book" aria-hidden="true"></i>
    <i v-if="category == 'events-training'" class="icon-graduation-cap" aria-hidden="true"></i>
    <i v-if="category == 'libraries-tools'" class="icon-wrench" aria-hidden="true"></i>
    <i v-if="category == 'videos'" class="icon-youtube-play" aria-hidden="true"></i>
  </span>
</template>
<script>
  export default {
    props: ["category"]
  }
</script>

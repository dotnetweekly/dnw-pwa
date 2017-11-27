<template>
  <div>{{username}}</div>
  <div>{{content}}</div>
  <div v-if="canReply">Reply</div>
</template>
<script>
  export default {
    props: [
      'username', 'content', 'canReply'
    ]
  }
</script>

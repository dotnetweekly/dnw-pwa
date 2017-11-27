<template>
  <div>
    <div v-for="comment in comments">{{comment.content}}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

const fetchInitialData = (store, link) => {
  return store.dispatch(`linkModule/getComments`, link);
};

export default {
  computed: {
    ...mapGetters("linkModule", ["comments"])
  },
  props: ['link'],
  methods: {
    loadComments() {
      fetchInitialData(this.$store, this.link);
    }
  },
  created() {
    this.loadComments();
  }
};
</script>
<style lang="scss" scoped>
</style>

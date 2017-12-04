<template>
<div>
  <h2 v-if="username">User: {{username}}</h2>

  <dnw-user-history v-if="username" :username="username"></dnw-user-history>
</div>
</template>
<script>
import { mapGetters } from "vuex";
import dnwUserHistory from "../components/dnwHistory/dnwUserHistory";

export default {
  components: {
    "dnw-user-history": dnwUserHistory
  },
  data() {
    return {
      username: null
    }
  },
  mounted() {
    this.username = this.$route.params.username;
  }
};
</script>
<style>
.separator{
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 3rem;
  padding-top: 1.5rem;
  font-size: 90%;
}
</style>

<template>
  <div>
    <div class="tabs is-boxed user-history user-history-header">
      <dnw-user-history-header v-bind:selectedTab.sync="selectedTab"></dnw-user-history-header>
    </div>
    <div class="user-history-body">
      <dnw-user-submitted v-if="selectedTab === 'submitted'"></dnw-user-submitted>
      <dnw-user-upvotes v-if="selectedTab === 'upvotes'"></dnw-user-upvotes>
      <dnw-user-comments v-if="selectedTab === 'comments'"></dnw-user-comments>
    </div>
  </div>
</template>

<script>
import dnwHistoryHeader from "./dnwHistoryHeader";
import dnwUserSubmitted from "./dnwUserSubmitted";
import dnwUserUpvotes from "./dnwUserUpvotes";
import dnwUserComments from "./dnwUserComments";

export default {
  components: {
    'dnw-user-history-header': dnwHistoryHeader,
    'dnw-user-submitted': dnwUserSubmitted,
    'dnw-user-upvotes': dnwUserUpvotes,
    'dnw-user-comments': dnwUserComments
  },
  data() {
    return {
      selectedTab: 'submitted'
    }
  }
}
</script>

<style scoped>
  .user-history {
    margin-top: 1rem;
  }
  .user-history-header{
    display: block;
    width: 100%;
    margin-bottom: 0;
    position: relative;
    top: 2px;
  }
  .user-history-body{
    background-color: #ffffff;
    display: block;
    width: 100%;
    border: 1px solid #dbdbdb;
    font-size: 80%;
    overflow-x: auto;
  }
  .user-history-body td{
    border: none;
  }
</style>

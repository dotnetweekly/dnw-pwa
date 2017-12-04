<template>
  <ul class="is-marginless is-borderless">
    <li v-bind:class="{'is-active': selectedTab == 'submitted'}" v-on:click="selectTab('submitted')">
      <a>
        <span class="icon is-small">
          <i class="icon-doc-text" aria-hidden="true"></i>
        </span>
        <span>Submitted</span>
      </a>
    </li>
    <li v-bind:class="{'is-active': selectedTab == 'upvotes'}" v-on:click="selectTab('upvotes')">
      <a>
        <span class="icon is-small">
          <i class="icon-up-open" aria-hidden="true"></i>
        </span>
        <span>Upvotes</span>
      </a>
    </li>
    <li v-bind:class="{'is-active': selectedTab == 'comments'}" v-on:click="selectTab('comments')">
      <a>
        <span class="icon is-small">
          <i class="icon-commenting-o" aria-hidden="true"></i>
        </span>
        <span>Comments</span>
      </a>
    </li>
  </ul>
</template>
<script>
  export default {
    props: ["selectedTab"],
    methods: {
      selectTab(tab) {
        this.$emit('update:selectedTab', tab);
      }
    }
  }
</script>

<style scoped>
  li a:hover {
    background-color: #efefef !important;
  }
</style>


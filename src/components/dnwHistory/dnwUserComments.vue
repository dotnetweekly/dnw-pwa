<template>
<div class="history-table">
  <table class="is-borderless">
    <tbody>
      <tr>
        <td class="history-title">Title</td>
        <td>Date</td>
      </tr>
      <tr v-if="loading">
        <td colspan="2">Loading...</td>
      </tr>
      <tr v-if="(!loading && links.length == 0)">
        <td colspan="2">No Comments</td>
      </tr>
      <tr v-for="link in links" v-bind:key="link._id">
        <td class="history-title">
          <span class="is-full-width overflow-dotted">
            <router-link :to="`/${link.category}/${link.slug}`">
              {{link.title}}
            </router-link>
          </span>
          </td>
        <td class="history-date">{{link.createdOn | formatDate}}</td>
      </tr>
    </tbody>
  </table>
  <dnw-paging :loading="loading" :totalPages="pages" :page.sync="page"></dnw-paging>
</div>
</template>
<script>
import userService from "../../services/user.service";
import dnwPaging from "../dnwPaging";

export default {
  components: {
    "dnw-paging": dnwPaging
  },
  props: ["username"],
  data() {
    return {
      links: [],
      pages: 1,
      page: 1,
      loading: true
    };
  },
  watch: {
    page(to) {
      this.getLinks(to);
    }
  },
  methods: {
    getLinks(page) {
      const username = this.username;
      userService
        .getHistory({ type: "comments", page, username })
        .then(data => {
          this.pages = data.pages;
          this.links = data.links;
          // this.page = data.page;
          this.loading = false;
        })
        .catch(() => {
          // Notification
          this.loading = false;
        });
    }
  },
  created() {
    this.getLinks(1);
  }
};
</script>
<style scoped>
.history-title {
  width: 70%;
  max-width: 600px;
}

.history-date {
  min-width: 200px;
  width: 200px;
}
</style>

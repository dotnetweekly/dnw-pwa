<template>
<div class="history-table">
  <table class="is-borderless">
    <tbody>
      <tr>
        <td class="history-title">Title</td>
        <td>Date</td>
      </tr>
      <tr v-for="link in links" v-bind:key="link._id">
        <td class="history-title">
          <span class="is-full-width overflow-dotted">
            <router-link :to="`/${link.category.slug}/${link.slug}`">
              {{link.title}}
            </router-link>
          </span>
          </td>
        <td>{{link.createdOn | formatDate}}</td>
      </tr>
    </tbody>
  </table>
  <dnw-paging :totalPages="pages" :page.sync="page"></dnw-paging>
</div>
</template>
<script>
  import userService from "../../services/user.service";
  import dnwPaging from "../dnwPaging";

  export default {
    components: {
      'dnw-paging': dnwPaging
    },
    data() {
      return {
        links: [],
        pages: 1,
        page: 1
      }
    },
    watch: {
      page(to) {
        this.getLinks(to);
      }
    },
    methods: {
      getLinks(page) {
        userService.getHistory({ type:"upvotes",page }).then(data => {
          this.pages = data.pages;
          this.links = data.links;
          this.page = data.page;
        })
      }
    },
    created() {
      this.getLinks(1);
    }
  }
</script>
<style scoped>
.history-title{
  width: 70%;
}
</style>

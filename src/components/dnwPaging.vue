<template>
  <div class="vwp-paging">
    <div class="paging-wrapper" v-if="!loading">
      <div class="paging-wrapper-inner">
        <div v-for="(item, index) in pages" class="paging-link" v-bind:key="index">
          <a v-if="(item != '...')"
            v-bind:class="{ 'is-active': ((page == null && item === 1) || (item == page)) }"
            v-on:click="selectPage(item)">
            {{item}}
            </a>
          <div v-if="(item == '...')">{{item}}</div>
        </div>
      </div>
      <div class="is-clearfix"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["loading", "totalPages", "page"],
  data: () => {
    return {
      pages: [],
      neighboors: 2
    };
  },
  watch: {
    page() {
      this.refreshPages(this.page);
    },
    totalPages() {
      this.refreshPages(this.page);
    }
  },
  methods: {
    selectPage(page) {
      this.$emit('update:page', page);
    },
    refreshPages: function(page) {
      if (!page) {
        page = 1;
      }
      page = parseInt(page);
      this.pages = [];
      for (var i = 1; i <= this.totalPages; i++) {
        if (i === 1 || i === parseInt(this.totalPages)) {
          this.pages.push(i);
        } else if (
          (i >= page - this.neighboors && i <= page) ||
          (i >= page && i <= page + this.neighboors)
        ) {
          this.pages.push(i);
        } else if (
          i === page - this.neighboors - 1 ||
          i === page + this.neighboors + 1
        ) {
          this.pages.push("...");
        }
      }
    }
  }
};
</script>

<style lang="scss">
@import "../_variables";
.vwp-paging {
  padding: $is-size-3;
  margin-right: 0;
  margin-left: 0;
  background-color: $white;
  width: auto;
  font-size: 90%;
  .paging-link {
    text-align: center;
    padding: 0;
    margin: 0.2rem;
    float: left;
    a {
      border: 1px solid $primary;
      color: $primary;
      padding: 10px;
    }
    .is-active {
      background-color: $primary;
      color: $text-invert;
    }
  }
  .paging-wrapper {
    margin: 0 auto;
    padding-left: 0.75rem;
    display: block;
    text-align: center;
    min-width: $mobile;
  }
  .is-active {
    font-weight: bold;
  }
  .paging-wrapper-inner {
    display: inline-block;
  }
}
</style>

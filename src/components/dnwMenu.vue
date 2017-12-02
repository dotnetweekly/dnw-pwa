<template>
  <div class="column is-one-quarter main-menu tight">
    <p></p>
    <dnw-calendar></dnw-calendar>
    <p></p>
    <div class="calendar-select select is-full-width">
      <select class="is-full-width" v-model="selectedCategory">
        <option :value="category.value" v-bind:key="category.label"
          v-for="category in categories">{{category.label}}</option>
      </select>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import dnwCalendar from "./dnwCalendar";
  import Vue from "vue"
  export default {
    data() {
      return {
        categories: [
          {label: "All", value: ""},
          {label: "Articles", value: "articles"},
          {label: "Books", value: "books"},
          {label: "Events/ Training", value: "events-training"},
          {label: "Libraries/ Tools", value: "libraries-tools"},
          {label: "Videos", value: "videos"}
        ],
        selectedCategory: ""
      }
    },
    watch: {
      selectedCategory(newCategory) {

      },
      filterCategory(newCategory) {
        this.selectedCategory = newCategory;
      }
    },
    computed: {
      ...mapGetters("linksModule", ["links", "filterCategory"])
    },
    components: {
      "dnw-calendar": dnwCalendar
    }
  }
</script>
<style lang="scss" scoped>
@import "../_variables";

.calendar-select{
  margin-top: 0.6rem;
}
.category-label{
  width: 50px;
}
.main-menu {
  list-style-type: none;
  min-width: 150px;
}
.main-menu a {
  padding: $is-size-8;
  width: 100%;
  display: inline-block;
}
.main-menu a:hover,
.main-menu a.is-active {
  font-weight: $weight-bold;
  color: $black;
}
</style>

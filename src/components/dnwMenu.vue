<template>
  <div>
    <p></p>
    <dnw-calendar></dnw-calendar>
    <p></p>
    <div class="calendar-select control has-icons-left">
      <div class="select is-full-width">
        <select class="is-full-width" v-on:change="updateCategory">
          <option
            v-if="filterCategories"
            v-for="category in filterCategories"
            :selected="isSelected(category.value)"
            :value="category.value" v-bind:key="category.label"
            >
            {{category.label}}
            </option>
        </select>
      </div>
      <dnw-category-icon :category="filterCategory"></dnw-category-icon>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import dnwCalendar from "./dnwCalendar";
  import dnwCategoryIcon from "./dnwCategoryIcon";
  import * as calendarHelper from "../helpers/calendar";
  export default {
    computed: {
      ...mapGetters("linksModule", ["links", "filterCategory", "filter",
        "filterCategories"])
    },
    components: {
      "dnw-category-icon": dnwCategoryIcon,
      "dnw-calendar": dnwCalendar
    },
    methods: {
      ...mapActions("linksModule", {
        setFilterCategory: "setFilterCategory"
      }),
      updateCategory(e) {
        if(!this.filterWeek || !this.filterYear){
          return;
        }
        const week = this.filterWeek;
        const year = this.filterYear;
        const newCategory = e.target.value;

        if (newCategory) {
          this.$router.push(`/${newCategory}/week/${week}/year/${year}`);

          return;
        }
        this.$router.push(`/week/${week}/year/${year}`);
      },
      isSelected(categoryLabel) {
        if(!this.filterCategory){
          return false;
        }
        return categoryLabel.trim() === this.filterCategory.trim()
      }
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
  min-width: 200px !important;
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

<template>
  <div class="column is-one-quarter main-menu tight">
    <p></p>
    <dnw-calendar></dnw-calendar>
    <p></p>
    <div class="calendar-select control has-icons-left">
      <div class="select is-full-width">
        <select class="is-full-width" v-on:change="updateCategory">
          <option :selected="isSelected(category.value)"
            :value="category.value" v-bind:key="category.label"
            v-for="category in filterCategories">
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
  import Vue from "vue"
  export default {
    computed: {
      ...mapGetters("linksModule", ["links", "filterCategory", "filter",
        "filterCategories", "filterDateWeek", "filterDateYear"])
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
        const newCategory = e.target.value;
        this.setFilterCategory(newCategory);
        if (newCategory) {
          this.$router.push(`/${newCategory}/week/${this.filterDateWeek}/year/${this.filterDateYear}`);

          return;
        }
        this.$router.push(`/week/${this.filterDateWeek}/year/${this.filterDateYear}`);
      },
      isSelected(categoryLabel) {
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

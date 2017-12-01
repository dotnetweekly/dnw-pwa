<template>
  <div class="column is-two-fifths main-menu tight">
    <dnw-calendar></dnw-calendar>
    <router-link to="/" exact>All</router-link>
    <router-link to="/articles">Articles</router-link>
    <router-link to="/books">Books</router-link>
    <router-link to="/events-training">Events/ Training</router-link>
    <router-link to="/libraries-tools">Libraries/ Tools</router-link>
    <router-link to="/videos">Videos</router-link>
  </div>
</template>
<script>
  import dnwCalendar from "./dnwCalendar";
  export default {
    components: {
      "dnw-calendar": dnwCalendar
    }
  }
</script>
<style lang="scss" scoped>
@import "../_variables";

.main-menu {
  list-style-type: none;
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

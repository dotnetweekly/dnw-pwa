<template>
  <div class="dnw-modal">
    <div class="section main-header">
      <div class="container content">
        <div class="columns content-header">
          <div class="column">
            <h2>Login</h2>
          </div>
          <div class="column modal-exit">
            <a class="button is-link is-outlined" v-on:click="closeModal">
              <i class="icon-cancel" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <section class="main-section section">
      <div class="container content">
        <slot></slot>
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("authModule", ["latestPath"])
  },
  methods: {
    closeModal() {
      if (typeof window === "undefined") {
        return;
      }
      if (this.$route.query && this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect);

        return;
      }
      if (this.latestPath) {
        this.$router.push(this.latestPath);

        return;
      }

      this.$router.push({ path: "/" });

      return;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../_variables";
.dnw-modal {
  .main-header {
    box-shadow: $border-bottom;
    display: inline-block;
    width: 100%;
  }
  .content-header {
    max-width: $tablet;
    margin: 0 auto;
  }
  .main-section {
    height: 100%;
  }
  .main-section .container {
    max-width: $tablet;
  }
  .modal-exit {
    flex: none;
    width: 70px;
  }
}
</style>

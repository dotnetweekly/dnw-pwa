<template>
  <dnw-modal>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input is-medium" v-model="email" type="email" placeholder="Email" autofocus>
        <span class="icon is-small is-left">
          <i class="icon-mail" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input is-medium" v-model="password" type="password" placeholder="Password">
        <span class="icon is-small is-left">
          <i class="icon-lock" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <div class="is-text-right">
      <a v-on:click="login()" class="button is-link is-medium ">Submit</a>
    </div>
  </dnw-modal>
</template>
<script>
import Modal from "../components/dnwModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
    "dnw-modal": Modal
  },
  computed: {
    ...mapGetters("authModule", ["isAuthenticated"])
  },
  methods: {
    ...mapActions("authModule", {
      logout: "logout"
    }),
    login() {
      this.$store
        .dispatch("authModule/login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

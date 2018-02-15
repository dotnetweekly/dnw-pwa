<template>
  <dnw-modal>
    <p>If you don't have an account <router-link to="/register">register here</router-link></p>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input
        v-on:keyup.enter="login"
        :class="{'input is-medium': true, 'is-danger': hasError('email')}"
        v-model="email"
        type="email"
        placeholder="Email"
        v-focus
        >
        <span class="icon is-small is-left">
          <i class="icon-mail" aria-hidden="true"></i>
        </span>
      </p>
      <span v-show="hasError('email')" class="help is-danger">{{getError("email")}}</span>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input
        v-on:keyup.enter="login"
        :class="{'input is-medium': true, 'is-danger': hasError('password')}"
        v-model="password"
        type="password"
        placeholder="Password"
        >
        <span class="icon is-small is-left">
          <i class="icon-lock" aria-hidden="true"></i>
        </span>
      </p>
      <span v-show="hasError('password')" class="help is-danger">{{getError("password")}}</span>
    </div>
    <p v-show="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
    <span v-show="error" class="help is-danger">{{ error }}</span>
    <p class="is-pulled-right"><router-link to="/forgot-password">Forgot Password</router-link></p>
    <div class="is-text-right">
      <a v-on:click="executeRecaptcha()" class="button is-link is-medium ">Submit</a>
    </div>
  </dnw-modal>
</template>
<script>
import Modal from "../components/dnwModal.vue";
import { mapGetters, mapActions } from "vuex";
import errorHelper from "../helpers/errors";

export default {
  data() {
    return {
      errors: [],
      error: "",
      email: "",
      password: ""
    };
  },
  components: {
    "dnw-modal": Modal
  },
  computed: {
    ...mapGetters("authModule", ["isAuthenticated", "latestPath"])
  },
  methods: {
    ...errorHelper,
    ...mapActions("authModule", {
      logout: "logout",
      goBack: "goBack"
    }),
    executeRecaptcha () {
      window.recaptchaComponent.execute(this.login);
    },
    login(recaptchaKey) {
      this.$store
        .dispatch("authModule/login", {
          recaptchaKey,
          email: this.email,
          password: this.password
        })
        .then((response) => {
          if (response && !response.success) {
            this.errors = response.errors;

            return;
          }
          this.email = "";
          this.password = "";
          this.$router.push("/profile");
        }).catch((response) => {
          const data = response.data;
          if (!data.success) {
            this.errors = data.errors;

            return;
          }
        });
    }
  }
};
</script>

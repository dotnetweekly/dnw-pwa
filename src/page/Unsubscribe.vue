<template>
    <div>
      <div v-if="running">
        <dnw-loading></dnw-loading>
      </div>
      <div v-if="success" class="column has-text-centered">
        <p>
          <span class="dnwIconLarge icon is-large">
            <i class="icon-ok" aria-hidden="true"></i>
          </span>
        </p>
        <p class="content is-large">
          Your account has been successfully unsubscribed from dotNET Weekly.
        </p>
      </div>
      <div v-if="noKey">
        <p>{{ error }}</p>
        <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
        <p>Unsubscribe key not found.</p>
        <p>You can <router-link to="/login">login</router-link> and change your subscription status.</p>
      </div>
    </div>
  </template>

  <script>
import axios from "axios";
import errorHelper from "../helpers/errors";
import dnwLoading from "../components/dnwLoading";

export default {
  components: {
    "dnw-loading": dnwLoading
  },
  data() {
    return {
      errors: [],
      success: false,
      noKey: false,
      error: "",
      running: false,
      recaptchaCheck: ""
    };
  },
  methods: {
    ...errorHelper,
    executeRecaptcha() {
      this.running = true;
      if (typeof window === "undefined") {
        return;
      }
      setTimeout(() => {
        window.recaptchaComponent.execute(this.unsubscribeAction);
      }, 1000);
    },
    unsubscribeAction(recaptchaKey) {
      const verifyKey = this.$route.params.key;
      if (!verifyKey) {
        this.noKey = true;
      }
      this.running = true;
      axios
        .post(`/user/unsubscribe?g-recaptcha-response=${recaptchaKey}`, {
          key: verifyKey
        })
        .then(response => {
          this.running = false;
          if (response.data.data.error) {
            this.noKey = true;
            this.error = response.data.data.error;
            return;
          }
          this.success = true;
        })
        .catch(response => {
          this.running = false;
          this.errors = response.errors;
        });
    }
  },
  created() {
    this.executeRecaptcha();
  }
};
</script>

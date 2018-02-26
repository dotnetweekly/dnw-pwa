<template>
  <div>
    <div v-if="running">
      Loading...
    </div>
    <div v-if="success" class="column has-text-centered">
      <p>
        <span class="dnwIconLarge icon is-large">
          <i class="icon-ok" aria-hidden="true"></i>
        </span>
      </p>
      <p class="content is-large">
        Your account has been activated! You're now logged in, enjoy!
      </p>
      <div class="separator"></div>
      <div class="content is-large">
        <ul class="is-unstyled">
          <li><router-link to="/add">Add community links</router-link></li>
          <li><router-link to="/">Upvote</router-link></li>
          <li>Comment</li>
        </ul>
      </div>
    </div>
    <div v-if="noKey">
      <p>{{ error }}</p>
      <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
      <p>Please <router-link to="/register">register</router-link> first to activate your account.</p>
      <p>If you already have and account you can <router-link to="/login">login</router-link> here.</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
import errorHelper from "../helpers/errors";
export default {
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
    ...mapActions("authModule", {
      setAuthToken: "setAuthToken",
      goBack: "goBack"
    }),
    executeRecaptcha () {
      this.running = true;
      if(typeof window === "undefined") {
        return;
      }
      setTimeout(() => {
        window.recaptchaComponent.execute(this.activateAction);
      }, 100);
    },
    activateAction(recaptchaKey) {
      const verifyKey = this.$route.params.key;
      if (!verifyKey) {
        this.noKey = true;
      }
      this.running = true;
      axios
        .post(`/auth/activate?g-recaptcha-response=${recaptchaKey}`, { key: verifyKey })
        .then(response => {
          this.running = false;
          if (response.data.data.error) {
            this.noKey = true;
            this.error = response.data.data.error;
            return;
          }
          this.setAuthToken(response.data.data);
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

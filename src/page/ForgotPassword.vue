<template>
<div>
  <h2>Forgot Password</h2>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Email</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left is-marginless">
          <input v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('email')}"
          type="text"
          v-model="email"
          placeholder="Email"
          v-focus
          >
          <span v-if="hasError('email')" class="help is-danger">{{getError("email")}}</span>
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <div v-if="success" class="dnwIconSmall is-pulled-left">
          <p>
            <span class="icon">
              <i class="icon-ok" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
        <a v-if="!sending && !success" v-on:click="executeRecaptcha()" class="button is-link is-medium is-pulled-left">Submit</a>
        <p class="dnwIconSuccessMessage" v-if="success">Please visit your email address {{email}} to update your password.</p>
        <a v-if="sending" disabled class="button is-link is-medium ">Submit</a>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import axios from "axios";
import errorHelper from "../helpers/errors";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      sending: false,
      success: false
    };
  },
  methods: {
    ...errorHelper,
    executeRecaptcha() {
      window.recaptchaComponent.execute(this.forgotPassword);
    },
    forgotPassword(recaptchaKey) {
      this.sending = true;
      axios
        .post(`user/forgotPassword?g-recaptcha-response=${recaptchaKey}`, {
          email: this.email
        })
        .then(response => {
          this.sending = false;
          const errors = response.data.data.errors;

          if (errors && errors.length > 0) {
            this.success = false;
            this.errors = errors;

            return;
          }
          this.success = true;
          this.errors = [];

          setTimeout(() => {
            this.success = false;
            this.email = "";
          }, 3000);
        })
        .catch(() => {
          // Notification
          this.sending = false;
          this.success = false;
        });
    }
  }
};
</script>
<style scoped>
.success-message {
  padding-top: 0.5rem;
  padding-left: 4rem;
}
</style>

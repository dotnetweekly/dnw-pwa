<template>
<div>
  <h2>Enter your new password</h2>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">New Password</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left is-marginless">
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('password')}"
          type="password"
          v-model="password"
          placeholder="Password"
          v-focus
          >
          <span v-if="hasError('password')" class="help is-danger" v-html="getError('password')"></span>
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
        <div class="control is-expanded has-icons-left">
          <div v-if="success" class="dnwIconSmall is-pulled-left">
            <p>
              <span class="icon">
                <i class="icon-ok" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          <p class="dnwIconSuccessMessage" v-if="success">
              Successfully changed your password!
          </p>
          <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
          <a v-if="!sending && !success" v-on:click="executeRecaptcha()" class="button is-link is-medium is-pulled-left">Submit</a>
          <a v-if="sending" disabled class="button is-link is-medium ">Submit</a>
        </div>
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
      password: "",
      errors: [],
      sending: false,
      success: false,
      recaptchaCheck: "",
      running: true
    };
  },
  methods: {
    ...errorHelper,
    executeRecaptcha() {
      this.sending = true;
      if (typeof window === "undefined") {
        return;
      }
      setTimeout(() => {
        window.recaptchaComponent.execute(this.forgotPassword);
      }, 1000);
    },
    forgotPassword(recaptchaKey) {
      const verifyKey = this.$route.params.key;
      this.sending = true;

      axios
        .post(
          `auth/forgotPassword/${verifyKey}?g-recaptcha-response=${recaptchaKey}`,
          {
            password: this.password
          }
        )
        .then(response => {
          this.sending = false;
          const errors = response.data.data.errors;

          if (errors && errors.length > 0) {
            this.success = false;
            this.errors = errors;

            return;
          }

          this.password = "";
          this.success = true;
          this.errors = [];

          setTimeout(() => {
            this.success = false;
          }, 1000);
        })
        .catch(() => {
          // Notification
          this.sending = false;
        });
    }
  }
};
</script>

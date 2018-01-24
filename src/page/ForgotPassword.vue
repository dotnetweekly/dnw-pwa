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
          <input  :class="{'input': true, 'is-danger': hasError('email')}" type="text"
          v-model="email" placeholder="Email">
          <span v-show="hasError('email')" class="help is-danger">{{getError("email")}}</span>
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
        <div v-show="success" class="dnwIconSmall is-pulled-left">
          <p>
            <span class="icon">
              <i class="icon-ok" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <a v-if="!sending && !success" v-on:click="forgotPassword()" class="button is-link is-medium is-pulled-left">Submit</a>
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
    forgotPassword() {
      this.sending = true;
      axios
        .post(`user/forgotPassword`, {
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

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
      <label class="label">New Password</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left is-marginless">
          <input  :class="{'input': true, 'is-danger': hasError('password')}" type="text"
          v-model="password" placeholder="New Password">
          <span v-show="hasError('password')" class="help is-danger">{{getError("password")}}</span>
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
        <p class="control is-expanded has-icons-left">
          <div v-show="success" class="dnwIconSmall is-pulled-left">
            <p>
              <span class="icon">
                <i class="icon-ok" aria-hidden="true"></i>
              </span>
            </p>
          </div>
          <a v-if="!sending && !success" v-on:click="forgotPassword()" class="button is-link is-medium is-pulled-left">Submit</a>
          <a v-if="sending" disabled class="button is-link is-medium ">Submit</a>
        </p>
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
      errors: []
    }
  },
  methods: {
    ...errorHelper,
    forgotPassword() {
      axios.post(`user/forgotPassword`, { email: this.email, password: this.password })
      .then(response => {

      });
    }
  }
};
</script>

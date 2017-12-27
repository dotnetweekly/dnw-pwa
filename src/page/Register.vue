<template>
  <div>
    <h2 v-if="profile">Register</h2>
    <div v-show="success" class="column has-text-centered">
      <p>
        <span class="dnwIconLarge icon is-large">
          <i class="icon-ok" aria-hidden="true"></i>
        </span>
      </p>
      <div class="separator"></div>
      <p class="content is-large">
        Successfully registered! Please check your email to verify your account.
      </p>
    </div>
    <div v-show="!success" class="columns">
      <div class="column is-one-third">
        Register today!
        <ul>
          <li>Add community links</li>
          <li>Upvote</li>
          <li>Comment</li>
          <li>Advertise</li>
          <li>Receive weekly newsletter</li>
        </ul>
      </div>
      <div class="column">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Name</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left is-marginless">
                <input autofocus  :class="{ 'input': true, 'is-danger': hasError('firstName')}"  type="text" v-model="profile.firstName" placeholder="First Name">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <p v-show="hasError('firstName')" class="help is-danger">{{getError("firstName")}}</p>
            </div>
            <div class="field">
              <p class="control is-expanded has-icons-left">
                <input class="input" type="text" v-model="profile.lastName" placeholder="Last Name">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Username</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left is-marginless">
                <input :class="{ 'input': true, 'is-danger': hasError('username')}" type="text" v-model="profile.username" placeholder="Username">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <p v-show="hasError('username')" class="help is-danger">{{getError("username")}}</p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Email</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left is-marginless">
                <input :class="{ 'input': true, 'is-danger': hasError('email')}" type="text" v-model="profile.email" placeholder="Email">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <p v-show="hasError('email')" class="help is-danger">{{getError("email")}}</p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Password</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded has-icons-left is-marginless">
                <input :class="{ 'input': true, 'is-danger': hasError('password')}" type="password" v-model="profile.password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fa fa-user"></i>
                </span>
              </p>
              <p v-show="hasError('password')" class="help is-danger">{{getError("password")}}</p>
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
                <a v-show="isLoading" disabled class="button is-loading is-link is-medium ">Loading</a>
                <a v-show="!isLoading" v-on:click="register()" class="button is-link is-medium ">Register</a>
              </p>
            </div>
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
      isLoading: false,
      errors: [],
      success: false,
      profile: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    this.success = false;
  },
  methods: {
    ...errorHelper,
    register() {
      this.isLoading = true;
      axios
        .post("/auth/register", { user: this.profile })
        .then(response => {
          this.isLoading = false;
          if (
            response.data.data.errors &&
            response.data.data.errors.length > 0
          ) {
            this.errors = response.data.data.errors;
            return;
          }

          this.errors = [];
          this.success = true;
          return;
        })
        .catch(response => {
          // this.errors = response.errors;
        });
    }
  }
};
</script>

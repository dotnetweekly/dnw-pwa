<template>
<div>
  <h2 v-if="profile">Profile</h2>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Name</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left is-marginless">
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('firstName')}"
          type="text"
          v-model="updatedUser.firstName"
          placeholder="First Name"
          v-focus
          >
          <span v-show="hasError('firstName')" class="help is-danger">{{getError("firstName")}}</span>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left is-marginless">
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('lastName')}"
          type="text"
          v-model="updatedUser.lastName"
          placeholder="Last Name"
          >
          <span v-show="hasError('lastName')" class="help is-danger">{{getError("lastName")}}</span>
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Username (public)</label>
    </div>
    <div class="field-body">
      <div class="field is-marginless">
        <p class="control is-expanded has-icons-left is-marginless">
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('username')}"
          type="text"
          v-model="updatedUser.username"
          placeholder="Username"
          >
          <span v-show="hasError('username')" class="help is-danger">{{getError("username")}}</span>
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Twitter (public)</label>
    </div>
    <div class="field-body">
      <div class="field has-addons">
          <p class="control is-marginless">
            <a class="button is-static">
              @
            </a>
          </p>
          <p class="control is-expanded is-marginless">
            <input
            v-on:keyup.enter="executeRecaptcha"
            :class="{'input': true, 'is-danger': hasError('twitter')}"
            type="text"
            v-model="updatedUser.twitter"
            placeholder="Twitter Username"
            >
            <span v-show="hasError('twitter')" class="help is-danger">{{getError("twitter")}}</span>
          </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Github (public)</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left is-marginless">
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('github')}"
          type="text"
          v-model="updatedUser.github"
          placeholder="Github Username"
          >
          <span v-show="hasError('github')" class="help is-danger">{{getError("github")}}</span>
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
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('newPassword')}"
          type="text"
          v-model="updatedUser.newPassword"
          placeholder="New Password"
          >
          <span v-show="hasError('newPassword')" class="help is-danger">{{getError("newPassword")}}</span>
        </p>
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
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('email')}"
          type="text"
          v-model="updatedUser.email"
          placeholder="Email"
          >
          <span v-show="hasError('email')" class="help is-danger">{{getError("email")}}</span>
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Subscribed to weekly newsletter</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control">
          <label class="radio">
            <input
            v-on:keyup.enter="executeRecaptcha"
            v-model="updatedUser.subscribed"
            value="true"
            type="radio"
            name="foobar"
            >
            Yes
          </label>
          <label class="radio">
            <input
            v-on:keyup.enter="executeRecaptcha"
            v-model="updatedUser.subscribed"
            value="false"
            type="radio"
            name="foobar"
            checked
            >
            No
          </label>
        </div>
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
        <a v-if="!sending && !success" v-on:click="executeRecaptcha()" class="button is-link is-medium is-pulled-left">Save</a>
        <p class="dnwIconSuccessMessage" v-if="success">Profile saved successfully!</p>
        <p v-show="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
        <a v-if="sending" disabled class="button is-link is-medium ">Save</a>
      </div>
    </div>
  </div>

  <div class="separator"></div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <dnw-user-history v-if="updatedUser.username" :username="updatedUser.username"></dnw-user-history>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import dnwUserCard from "../components/dnwHistory/dnwUserHistory";
import errorHelper from "../helpers/errors";

const fetchInitialData = (store, route) => {
  return store.dispatch(`userModule/getProfile`);
};

export default {
  data() {
    return {
      success: false,
      sending: false,
      errors: [],
      successMessage: "",
      updatedUser: {
        firstName: "",
        lastName: "",
        username: "",
        newPassword: "",
        subscribed: true,
        twitter: "",
        github: "",
        email: ""
      }
    };
  },
  components: {
    "dnw-user-history": dnwUserCard
  },
  computed: {
    ...mapGetters("userModule", ["profile"])
  },
  methods: {
    ...errorHelper,
    loadData() {
      fetchInitialData(this.$store, this.$route);
    },
    executeRecaptcha () {
      window.recaptchaComponent.execute(this.saveProfile);
    },
    saveProfile(recaptchaKey) {
      this.sending = true;
      axios
        .post(`user/profile?g-recaptcha-response=${recaptchaKey}`, this.updatedUser)
        .then(response => {
          this.sending = false;
          let errors = [];
          if (response.data && response.data.data) {
            errors = response.data.data.errors;
          } else {
            this.success = false;

            return;
          }

          if (errors && errors.length > 0) {
            this.errors = errors;

            return;
          }

          this.errors = [];
          this.updatedUser.newPassword = "";
          this.success = true;
          this.successMessage = response.data.data.successMessage;
          setTimeout(() => {
            this.success = false;
            this.successMessage = "";
          }, 3000);
          // Notification
        })
        .catch(err => {
          this.$router.push("/");
        });
    }
  },
  watch: {
    profile(to, from) {
      this.updatedUser = to;
    },
    $route(to, from) {
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

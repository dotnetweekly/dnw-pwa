<template>
<div>
  <h2 v-if="profile">Profile</h2>
  <dnw-loading v-if="!updatedUser.email"></dnw-loading>
  <div v-if="updatedUser.email">
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
            <span v-if="hasError('firstName')" class="help is-danger">{{getError("firstName")}}</span>
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
            <span v-if="hasError('lastName')" class="help is-danger">{{getError("lastName")}}</span>
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
            <span v-if="hasError('username')" class="help is-danger">{{getError("username")}}</span>
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
              <span v-if="hasError('twitter')" class="help is-danger">{{getError("twitter")}}</span>
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
            <span v-if="hasError('github')" class="help is-danger">{{getError("github")}}</span>
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
            <span v-if="hasError('newPassword')" class="help is-danger">{{getError("newPassword")}}</span>
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
          <a v-if="!sending && !success" v-on:click="executeRecaptcha()" class="button is-link is-medium is-pulled-left">Save</a>
          <p class="dnwIconSuccessMessage" v-if="success">Profile saved successfully! <span>{{successMessage}}</span></p>
          <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
          <a v-if="sending" disabled class="button is-link is-medium ">Save</a>
        </div>
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
import dnwLoading from "../components/dnwLoading";

const fetchInitialData = store => {
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
        twitter: "",
        github: "",
        email: ""
      }
    };
  },
  components: {
    "dnw-user-history": dnwUserCard,
    "dnw-loading": dnwLoading
  },
  computed: {
    ...mapGetters("userModule", ["profile"])
  },
  methods: {
    ...errorHelper,
    loadData() {
      fetchInitialData(this.$store, this.$route);
    },
    executeRecaptcha() {
      this.sending = true;
      window.recaptchaComponent.execute(this.saveProfile);
    },
    saveProfile(recaptchaKey) {
      this.sending = true;
      axios
        .post(
          `user/profile?g-recaptcha-response=${recaptchaKey}`,
          this.updatedUser
        )
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
          }, 6000);
          // Notification
        })
        .catch(() => {
          // Notification
          this.$router.push("/");
        });
    }
  },
  watch: {
    profile(to) {
      this.updatedUser = to;
    },
    $route() {
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>

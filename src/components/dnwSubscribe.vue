<template>
  <div>
    <section id="newsletter" class="hero is-primary">
      <div class="hero-body subscribe-body">
        <div v-if="success" class="column has-text-centered">
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
        <div v-if="!success">
          <div class="columns is-vcentered">
            <div class="column">
              <p>
                Want to receive every Tuesday the best links of the .NET realm?
                <br/> Once subscribed you can login, submit a link, upvote and receive the weekly newsletter.
                <br/>
              </p>
            </div>
          </div>
          <div class="columns is-vcentered">
            <div class="column">
              <form v-on:submit="executeRecaptcha" action="javascript:void(0)" method="POST" accept-charset="utf-8">
                <div class="subscribe-form field is-grouped">
                  <div class="control subscribe-email-label">
                    <label for="email">Email</label>
                  </div>
                  <div class="control has-icons-left is-expanded">
                    <input id="email" v-focus type="email" v-model="profile.email" name="email" :class="{ 'input': true, 'is-flat': true, 'email': true, 'is-danger': hasError('email')}"
                      placeholder="email address" required="">
                    <span class="icon is-small is-left">
                      <i aria-hidden="true" class="icon-mail"></i>
                    </span>
                  </div>
                  <div class="control">
                    <input v-if="!isLoading" type="submit" value="Subscribe" name="submit" class="button is-white is-outlined">
                    <input v-if="isLoading" type="submit" value="Subscribe" name="submit" class="button is-white is-outlined" disabled>
                  </div>
                </div>
                <p v-if="hasError('email')" class="subscribe-danger help is-danger">{{getError("email")}}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="separator" v-if="links && links.length === 0"></div>
    <p class="has-text-centered subscriber-count">
      3844 happy subscribers. Join today!
    </p>
  </div>
</template>
<style>
.subscriber-count {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-style: italic;
}

.subscribe-email-label {
  padding-top: 0.3rem;
}

.hero-body.subscribe-body {
  padding: 1.5rem;
}

.subscribe-help {
  font-style: italic;
}

.subscribe-form {
  margin-bottom: 0 !important;
}

.subscribe-danger {
  padding: 0.2rem;
  display: inline-block;
  background-color: #fff;
}

@media (max-width: 600px) {
  .subscribe-form .control {
    width: 100%;
    padding-bottom: 0.25rem;
    display: block !important;
  }
  .subscribe-form {
    width: 100%;
    display: block !important;
  }
  .subscribe-body .columns.is-vcentered {
    margin-bottom: 0;
  }
}
</style>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import errorHelper from "../helpers/errors";
export default {
  data() {
    return {
      isLoading: false,
      errors: [],
      success: false,
      profile: {
        email: ""
      }
    };
  },
  computed: {
    ...mapGetters("linksModule", ["links"])
  },
  mounted() {
    this.success = false;
  },
  methods: {
    ...errorHelper,
    executeRecaptcha() {
      this.isLoading = true;
      window.recaptchaComponent.execute(this.register);
    },
    register(recaptchaKey) {
      this.isLoading = true;
      axios
        .post(
          `/auth/register?quick=true&g-recaptcha-response=${recaptchaKey}`,
          {
            user: this.profile
          }
        )
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
          setTimeout(() => {
            this.profile.email = "";
            this.success = false;
          }, 4000);
          return;
        })
        .catch(response => {
          this.errors = response.errors || [];
        });
    }
  }
};
</script>

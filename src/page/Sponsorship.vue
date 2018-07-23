<template>
  <div>
    <h1>Sponsor Link</h1>
    <p>
      Want to share your product/service/job listing to 4000 .NET subscribers?<br/>
      Once approved you'll receive an invoice and we'll include your item in the newsletter specified!<br/><br/>

      Thank you for sponsoring dotNET Weekly and for helping us keep on running!
    </p>
    <div class="separator"></div>
    <div class="columns">
      <div class="column is-one-third">
        <div v-if="isAuthenticated">
          <dnw-sponsor-menu></dnw-sponsor-menu>
        </div>
        <div v-else>
          <p>
            To submit a sponsored link you have to first:<br/>
            <router-link class="button is-primary" to="/login">Login</router-link>
          </p>
          <p>
            If you don't have an account you can:<br/>
            <router-link class="button is-primary" to="/register">Register</router-link>
          </p>
        </div>
      </div>
      <div class="column" style="display:none"></div>
      <div class="column">
        <h3>Preview</h3>
        <dnw-sponsor-newsletter></dnw-sponsor-newsletter>
      </div>
      <div class="is-clearfix"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import dnwSponsorMenu from "../components/dnwSponsorMenu";
import dnwSponsorNewsletter from "../components/dnwSponsorNewsletter";

export default {
  components: {
    "dnw-sponsor-menu": dnwSponsorMenu,
    "dnw-sponsor-newsletter": dnwSponsorNewsletter
  },
  data: () => {
    return {};
  },
  computed: {
    ...mapGetters("authModule", ["isAuthenticated"])
  }
};
</script>

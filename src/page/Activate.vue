<template>
  <div>
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
          <li><router-link to="/add">Advertise</router-link></li>
        </ul>
      </div>
    </div>
    <div v-if="noKey">
      <p>{{ error }}</p>
      <p>Please <router-link to="/register">register</router-link> first to activate your account.</p>
      <p>If you already have and account you can <router-link to="/login">login</router-link> here.</p>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import { mapActions } from "vuex";
  export default {
    data() {
      return {
        success: false,
        noKey: false,
        error: "",
        running: false
      }
    },
    methods: {
      ...mapActions("authModule", {
        setAuthToken: "setAuthToken",
        goBack: "goBack"
      }),
    },
    mounted() {
      const verifyKey = this.$route.params.key;
      if(!verifyKey){
        this.noKey = true;
      }
      this.running = true;
      axios.post("/auth/activate", { key: verifyKey })
      .then(response => {
        this.running = false;
        if(response.data.data.error){
          this.noKey = true;
          this.error = response.data.data.error;
          return;
        }
        this.setAuthToken(response.data.data);
        this.success = true;
        // this.goBack({ router: this.$router, route: this.$route });
      })
      .catch(response => {
        // this.errors = response.errors;
      })
    }
  }
</script>
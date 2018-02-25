<template>
  <div>
    <div v-if="!error && !noKey">Loading...</div>
    <div v-if="error">
      <p v-html="error"></p>
    </div>
    <div v-if="noKey">
      <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
      <p>No key found. To update your email please visit the <router-link to="/profile">profile</router-link> page.</p>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import errorHelper from "../helpers/errors";
  export default {
    data() {
      return {
        errors: [],
        noKey: false,
        error: "",
        recaptchaCheck: ""
      }
    },
    methods: {
    ...errorHelper,
      executeRecaptcha () {
        if(typeof window === "undefined") {
          return;
        }
        window.recaptchaComponent.execute(this.sendUpdateRequest);
      },
      sendUpdateRequest(recaptchaKey) {
        const verifyKey = this.$route.params.key;
        if(!verifyKey){
          this.noKey = true;
        }
        this.running = true;
        axios.post(`/user/updateEmail?g-recaptcha-response=${recaptchaKey}`, { key: verifyKey })
        .then(response => {
          this.running = false;

          if(!response.data || !response.data.data) {
            this.noKey = true;

            return;
          }

          if(response.data.data.error){
            this.error = response.data.data.error;
            return;
          }
          this.$router.push("/profile");
        })
        .catch(response => {
          this.noKey = true;
          // this.errors = response.errors;
        })
      }
    },
    mounted() {
      this.executeRecaptcha();
    }
  }
</script>

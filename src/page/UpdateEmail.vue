<template>
  <div>
    <div v-if="!error && !noKey">Loading...</div>
    <div v-if="error">
      <p v-html="error"></p>
    </div>
    <div v-if="noKey">
      <p>No key found. To update your email please visit the <router-link to="/profile">profile</router-link> page.</p>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  export default {
    data() {
      return {
        noKey: false,
        error: ""
      }
    },
    mounted() {
      const verifyKey = this.$route.params.key;
      if(!verifyKey){
        this.noKey = true;
      }
      this.running = true;
      axios.post("/user/updateEmail", { key: verifyKey })
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
  }
</script>

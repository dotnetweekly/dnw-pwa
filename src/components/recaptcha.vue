<template>
  <div
  id="recaptcha0"
  class="g-recaptcha"
  :data-sitekey="sitekey">
  </div>
</template>

<script>
import config from "../../app.config";

export default {
  data() {
    return {
      sitekey: config.recaptchaKey,
      callback: () => {},
      loaded: false
    };
  },
  methods: {
    execute(callback) {
      this.callback = callback;
      if (!this.loaded) {
        this.render();
        this.loaded = true;

        let recaptchaCheck = setInterval(() => {
          if (window && window.grecaptcha) {
            window.grecaptcha.execute();
            clearInterval(recaptchaCheck);
          }
        }, 100);
      } else {
        window.grecaptcha.execute();
      }
    },
    reset() {
      window.grecaptcha.reset();
    },
    render() {
      console.log("render");
      if (window.grecaptcha) {
        window.grecaptcha.render(`recaptcha0`, {
          sitekey: this.sitekey,
          size: "invisible",
          callback: response => {
            // emit an event called verify with the response as payload
            // this.$emit('verify', response)
            this.callback(response);
            this.reset();
          }
        });
      }
    }
  }
};
</script>

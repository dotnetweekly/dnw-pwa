<template>
  <div
  id="recaptcha0"
  class="g-recaptcha"
  :data-sitekey="sitekey">
  </div>
</template>

<script>
  import config from "../app.config"

export default {
  data () {
    return {
      sitekey: config.recaptchaKey,
      callback: () => {}
    }
  },
  methods: {
    execute (callback) {
      this.callback = callback;
      window.grecaptcha.execute()
    },
    reset () {
      window.grecaptcha.reset()
    },
    render () {
      if (window.grecaptcha) {
        window.grecaptcha.render(`recaptcha0`, {
          sitekey: this.sitekey,
          size: 'invisible',
          callback: (response) => {
            // emit an event called verify with the response as payload
            // this.$emit('verify', response)
            this.callback(response);
            this.reset()
          }
        })
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.render()
    }, 100)
  }
}
</script>

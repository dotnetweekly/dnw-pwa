<template>
  <div
  :id="'recaptcha-' + widgetId"
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
      widgetId: 0,
      callback: () => {}
    }
  },
  methods: {
    execute (callback) {
      this.callback = callback;
      window.grecaptcha.execute(this.widgetId)
    },
    reset () {
      window.grecaptcha.reset(this.widgetId)
    },
    render () {
      if (window.grecaptcha) {
        this.widgetId = window.grecaptcha.render(`recaptcha-${this.widgetId}`, {
          sitekey: this.sitekey,
          size: 'invisible',
          // the callback executed when the user solve the recaptcha
          callback: (response) => {
            // emit an event called verify with the response as payload
            // this.$emit('verify', response)
            this.callback(response);
            // reset the recaptcha widget so you can execute it again
            this.reset()
          }
        })
      }
    }
  },
  mounted () {
    this.widgetId = this._uid;
    setTimeout(() => {
      this.render()
    }, 100)
  }
}
</script>

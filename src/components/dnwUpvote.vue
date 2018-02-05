<template>
  <div :class="{ 'upvote': true, 'has-text-centered': true, 'upvote-block': true, 'hasUpvoted': hasUpvoted }">
    <a v-on:click="executeRecaptcha" :class="{ 'upvote-block': true, 'has-text-centered': true } ">
      <i class="icon-up-open" aria-hidden="true"></i>
      <p>
        {{ upvoteCount }}
      </p>
    </a>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
import errorHelper from "../helpers/errors";
export default {
  props: {
    hasUpvoted: Boolean,
    upvoteCount: Number,
    linkId: {
      type: String,
      require: true
    }
  },
  computed: {
    ...mapGetters("authModule", ["isAuthenticated"])
  },
  methods: {
    ...errorHelper,
    executeRecaptcha () {
      window.recaptchaComponent.execute(this.vote);
    },
    setUpvoted(status) {
      const addVotes = (status ? 1 : -1);
      this.$store.dispatch("linksModule/refreshLinks");
      this.$emit('update:hasUpvoted', status);
      this.$emit('update:upvoteCount', this.upvoteCount + addVotes);
    },
    upvote(recaptchaKey) {
      const self = this;
      this.$emit('update:hasUpvoted', true);
      axios.post(`links/upvote/${this.linkId}?g-recaptcha-response=${recaptchaKey}`)
      .then(response => {
        if (response.data.success) {
          self.setUpvoted(true);
        }
      })
      .catch(() => {

      });
    },
    downvote(recaptchaKey) {
      const self = this;
      this.$emit('update:hasUpvoted', false);
      axios.post(`links/downvote/${this.linkId}?g-recaptcha-response=${recaptchaKey}`)
      .then(response => {
        if (response.data.success) {
          self.setUpvoted(false);
        }
      })
      .catch(() => {

      });
    },
    vote(recaptchaKey) {
      if (!this.isAuthenticated) {
        this.$router.push("/login");

        return;
      }
      if (this.hasUpvoted) {
        this.downvote(recaptchaKey);
      } else {
        this.upvote(recaptchaKey);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../_variables";

.upvote {
  background-color: $background;
  box-shadow: $body-border;
  padding: 0;
  cursor: pointer;
}

.upvote-block{
  width: 60px;
  height: 60px;
  flex: none;
  padding: 0;
  display: inline-block;
}

.upvote.hasUpvoted {
  border: $line2;
}

.upvote:focus, .upvote:active, .upvote.hasUpvoted:active {
  border: $line2;
}

</style>

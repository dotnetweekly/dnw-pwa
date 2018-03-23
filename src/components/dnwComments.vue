<template>
  <div class="dnw-comments">
    <div class="dnw-comments-wrapper">
      <dnw-comment v-for="comment in comments" v-bind:comment="comment" v-bind:key="comment._id"></dnw-comment>
      <p></p>
      <div v-if="success" class="column has-text-centered">
        <p>
          <span class="dnwIconLarge icon">
            <i class="icon-ok" aria-hidden="true"></i>
          </span>
        </p>
        <div class="separator"></div>
        <p class="content">
          Comment submitted! Once approved it will appear in this area.
        </p>
      </div>
      <article v-if="!success" class="media">
        <div class="media-content">
          <div class="field">
            <p class="control is-marginless">
              <textarea :class="{'textarea': true, 'is-danger': hasError('comment')}"
              v-model="comment" placeholder="Add a comment..."></textarea>
            </p>
            <p v-if="hasError('comment')" class="help is-danger">{{getError("comment")}}</p>
          </div>
          <div class="field">
            <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
            <p class="control">
              <button class="button" disabled v-if="sending && isAuthenticated">Post comment</button>
              <button class="button" v-if="!sending && isAuthenticated" v-on:click="executeRecaptcha()">Post comment</button>
              <router-link v-if="!isAuthenticated" to="/login" class="button">Login to comment</router-link>
            </p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";
import DNWComment from "../components/dnwComment.vue";
import errorHelper from "../helpers/errors";
export default {
  data() {
    return {
      sending: false,
      success: false,
      comment: "",
      errors: []
    };
  },
  components: {
    "dnw-comment": DNWComment
  },
  props: ["comments", "linkId"],
  computed: {
    ...mapGetters("authModule", ["isAuthenticated"])
  },
  methods: {
    ...mapActions("linkModule", ["sendComment"]),
    ...errorHelper,
    executeRecaptcha() {
      window.recaptchaComponent.execute(this.sendComment);
    },
    sendComment(recaptchaKey) {
      axios
        .post(
          `links/comment/${this.linkId}?g-recaptcha-response=${recaptchaKey}`,
          {
            comment: this.comment
          }
        )
        .then(response => {
          let errors = [];
          if (response.data && response.data.data) {
            errors = response.data.data.errors;
          }

          if (errors && errors.length > 0) {
            this.errors = errors;

            return;
          }

          this.errors = [];
          this.comment = "";
          this.success = true;
          setTimeout(() => {
            this.success = false;
          }, 5000);
          // Notification
        })
        .catch(() => {
          // Notification
          this.success = false;
        });
    }
  }
};
</script>
<style lang="scss">
@import "../_variables";
.dnw-comments {
  border-top: $line;
  margin-top: $is-size-1;
  padding-top: $is-size-4;
  font-size: 90%;
}

.dnw-comments-wrapper {
  max-width: $tablet;
  margin: 0 auto;
}

.dnw-comments-wrapper .content p small {
  font-size: 70%;
}
</style>

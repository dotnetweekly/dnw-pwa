<template>
  <div>

  <h1>Recommend a new community link</h1>
  <article class="message is-info">
    <div class="message-body">
        Please recommend mostly personal blog posts, open source projects and community books, events and videos.<br/>
        There will be an advertising section in the future, if you would like to promote your product or job listing.
    </div>
  </article>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Title</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('title')}"
          v-model="link.title"
          type="text"
          placeholder="Breaking Down Dependency Injection and Inversion of Control in C# with SimpleInjector"
          v-focus
          >
        </div>
        <p v-if="hasError('title')" class="help is-danger">{{getError("title")}}</p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Url</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <input
          v-on:keyup.enter="executeRecaptcha"
          :class="{'input': true, 'is-danger': hasError('url')}"
          type="text"
          v-model="link.url"
          placeholder="http://chris.bohatka.com/breaking-down-dependency-injection-and-inversion-of-control-in-csharp-with-simpleinjector/"
          >
        </div>
        <p v-if="hasError('url')" class="help is-danger">{{getError("url")}}</p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Category</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <div :class="{'select': true, 'is-full-width': true, 'is-danger': hasError('category')}">
            <multiselect
              v-model="link.category"
              :options="categoryOptions"
              :multiple="false"
              track-by="slug"
              :custom-label="customLabelCategory"
              >
            </multiselect>
          </div>
          <p v-if="hasError('category')" class="help is-danger">{{getError("category")}}</p>
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Tags</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <multiselect
            v-model="link.tags"
            :options="tagOptions"
            :multiple="true"
            :custom-label="customLabelTag"
            >
          </multiselect>
        </div>
        <p v-if="hasError('tags')" class="help is-danger">{{getError("tags")}}</p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Content</label>
    </div>
    <div class="field-body">
      <div class="field">
        <div class="control is-expanded has-icons-left">
          <textarea
          v-on:keyup.enter="executeRecaptcha"
          :class="{'textarea': true, 'is-danger': hasError('content')}"
          v-model="link.content"
          rows="13" ref="editorText" placeholder=""></textarea>
        </div>
        <p v-if="hasError('content')" class="help is-danger">{{getError("content")}}</p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <div v-if="success" class="dnwIconSmall is-pulled-left">
          <p>
            <span class="icon">
              <i class="icon-ok" aria-hidden="true"></i>
            </span>
          </p>
        </div>
        <p v-if="hasError('recaptcha')" class="help is-danger">{{getError("recaptcha")}}</p>
        <a v-if="!sending && !success" v-on:click="executeRecaptcha" class="button is-link is-medium is-pulled-left">Save</a>
        <p class="dnwIconSuccessMessage" v-if="success">Link submitted, once approved it will appear on the front page!</p>
        <a v-if="sending" disabled class="button is-link is-medium ">Save</a>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import tagService from "../services/tags.service";
import categoryService from "../services/categories.service";
import errorHelper from "../helpers/errors";
import axios from "axios";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      success: false,
      sending: false,
      errors: [],
      successMessage: "",
      tagOptions: [],
      categoryOptions: [],
      link: {
        title: "",
        url: "",
        category: {},
        content: "",
        tags: []
      }
    };
  },
  methods: {
    ...errorHelper,
    customLabelCategory(option) {
      return `${option.name}`;
    },
    customLabelTag(option) {
      return `${option}`;
    },
    executeRecaptcha() {
      window.recaptchaComponent.execute(this.addLink);
    },
    addLink(recaptchaKey) {
      axios
        .post(`links?g-recaptcha-response=${recaptchaKey}`, this.link)
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
          this.link.title = "";
          this.link.url = "";
          this.link.content = "";
          setTimeout(() => {
            this.success = false;
          }, 5000);
        })
        .catch(() => {
          // Notification
          this.sending = false;
          this.success = false;
        });
    }
  },
  mounted() {
    tagService
      .getTags()
      .then(response => {
        if (response) {
          this.tagOptions = response;
          this.link.tags = this.tagOptions.filter(tag => {
            return [".net", "c#", "visual-studio"].indexOf(tag) > -1;
          });
        }
      })
      .catch(() => {
        // Notification
        this.sending = false;
        this.success = false;
      });
    categoryService
      .getCategories()
      .then(response => {
        if (response) {
          this.categoryOptions = response;
          this.link.category = this.categoryOptions[0];
        }
      })
      .catch(() => {
        // Notification
        this.sending = false;
        this.success = false;
      });
    this.$refs.editorText.placeholder =
      "For years Dependency Injection and Inversion of Control seemed like buzz words to me. I would constantly hear about them at conferences and meetups when discussing testing and maintainability, though they always seemed to evade me. Part of it may have been imposter syndrome convincing me I wasn't quite there yet. \n\nIf you try to search these terms, you'll find the equivalent of technical texts and various framework pages explaining how to implement them in their specific flavor. For years, I lacked a clear definition of what these two patterns were; even after I had been using them for some time. I understand the how, but not necessarily the what or the why. In this post, we are going to take a look at what Dependency Injection and Inversion of Control are at their core; which is that they are design patterns. If you're new to development, hopefully these explanations can help you make sense of these patterns and how you can benefit from them.";
  }
};
</script>

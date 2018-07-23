<template>
  <div>
    <h3>Price <span v-if="sponsorLink.category === 'sponsored'">$100</span><span v-if="sponsorLink.category === 'job-listing'">$50</span></h3>
    <div class="field">
      <label class="label">Sponsor Link/ Job Listing</label>
      <div class="control">
        <div :class="{'select': true, 'is-full-width': true, 'is-danger': hasError('category')}">
          <select 
          :class="{'is-full-width': true, 'is-danger': hasError('category')}"
          v-on:change="onTypeChange">
            <option value="sponsored">Sponsored Link ({{sponsoredLeft}} left) - $100</option>
            <option value="job-listing">Job Listing ({{jobListingLeft}} left) - $50</option>
          </select>
        </div>
      </div>
      <p v-if="hasError('category')" class="help is-danger">{{getError("category")}}</p>
    </div>

    <div class="field">
      <label class="label">Issue Date (every Tuesday)</label>
      <div class="control">
        <div :class="{'select': true, 'select-single-full': true, 'is-full-width': true, 'is-danger': hasError('date')}">
          <multiselect
            :class="{'is-danger': hasError('date')}"
            v-model="sponsorLinkDate"
            :options="sponsorFilter.nextWeeks.slice(1,)"
            :multiple="false"
            :custom-label="customLabelWeeks"
            >
          </multiselect>
        </div>
      </div>
      <p v-if="hasError('date')" class="help is-danger">{{getError("date")}}</p>
    </div>

    <div class="field">
      <label class="label">Title (max 80 characters)</label>
      <div class="control">
        <div :class="{'is-full-width': true, 'is-danger': hasError('title')}">
          <input
          :class="{'input':true, 'is-danger': hasError('title')}"
          type="text" placeholder="Text input" v-model="sponsorLink.title">
        </div>
      </div>
      <p v-if="hasError('title')" class="help is-danger">{{getError("title")}}</p>
    </div>

    <div class="field">
      <label class="label">Content (max 200 characters)</label>
      <div class="control is-expanded has-icons-left">
        <div :class="{'is-full-width': true, 'is-danger': hasError('content')}">
          <textarea 
          :class="{'textarea':true, 'is-danger': hasError('content')}"
          placeholder="Text input" v-model="sponsorLink.content"></textarea>
        </div>
      </div>
      <p v-if="hasError('content')" class="help is-danger">{{getError("content")}}</p>
    </div>

    <div class="field">
      <label class="label">Link (the full url you want to link to)</label>
      <div class="control">
        <div :class="{'is-full-width': true, 'is-danger': hasError('url')}">
          <input
          :class="{'input':true, 'is-danger': hasError('url')}"
          type="text" placeholder="Text input" v-model="sponsorLink.url">
        </div>
      </div>
      <p v-if="hasError('url')" class="help is-danger">{{getError("url")}}</p>
    </div>

    <div class="field">
      <label class="label">Tags (between 1-5 tags)</label>
      <div class="control">
        <div :class="{'select': true, 'is-full-width': true, 'is-danger': hasError('tags')}">
          <multiselect
          :class="{'is-danger': hasError('tags')}"
          v-model="sponsorLink.tags"
          :options="tagOptions"
          :multiple="true"
          :custom-label="customLabelTag"
          >
          </multiselect>
        </div>
      </div>
      <p v-if="hasError('tags')" class="help is-danger">{{getError("tags")}}</p>
    </div>

    <div class="field" v-if="sponsorLink.category !== 'job-listing'">
      <label class="label">Image URL (recommended 100x100)</label>
      <div class="control">
        <div :class="{'is-full-width': true, 'is-danger': hasError('imageUrl')}">
          <input
          :class="{'input':true, 'is-danger': hasError('url')}"
          :disabled="sponsorLink.category === 'job-listing'" type="text" placeholder="Text input" v-model="sponsorLink.imageUrl">
        </div>
      </div>
      <p v-if="hasError('imageUrl')" class="help is-danger">{{getError("imageUrl")}}</p>
    </div>

    <a v-if="!sending" class="button is-link is-medium is-pulled-right" v-on:click="executeRecaptcha">Submit</a>
    <p class="dnwIconSuccessMessage" v-if="success">Link submitted, once approved it will appear on the front page!</p>
    <a v-if="sending" disabled class="button is-link is-medium is-pulled-right">Submit</a>
  </div>
</template>
<script>
/*eslint-disable */
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import tagService from "../services/tags.service";
import Multiselect from "vue-multiselect";
import * as calendarHelper from "../helpers/calendar";
import errorHelper from "../helpers/errors";

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
      sponsoredLeft: 2,
      jobListingLeft: 3,
      sponsorLinkDate: ""
    }
  },
  computed: {
    ...mapGetters("sponsorsModule", ["sponsorLink", "sponsorFilter"]),
    sponsorLinkObj() {
      return this.sponsorLink.category + this.sponsorLink.date;
    },
    sponsorLinkDateObj() {
      return this.sponsorFilter.nextWeeks.length;
    }
  },
  watch: {
    sponsorLinkObj: function() {
      let selectedWeekIndex = 1;
      for (var i = 0; i < this.sponsorFilter.nextWeeks.length; i++) {
        if (this.sponsorFilter.nextWeeks[i].tuesday == this.sponsorLink.date) {
          selectedWeekIndex = i - 1;
          break;
        }
      }
      if (this.sponsorFilter.nextWeeks && this.sponsorFilter.nextWeeks.length > 0) {
        this.sponsoredLeft = 2 - this.sponsorFilter.nextWeeks[selectedWeekIndex].sponsoredCount;
        this.jobListingLeft = 3 - this.sponsorFilter.nextWeeks[selectedWeekIndex].jobListingCount;
      }
    },
    sponsorLinkDateObj: function() {
      this.sponsorLinkDate = this.sponsorFilter.nextWeeks[1];
    },
    sponsorLinkDate: function() {
      setTimeout(() => {
        this.setFilterDate(this.sponsorLinkDate.tuesday);
      });
    }
  },
  methods: {
    ...errorHelper,
    ...mapActions("sponsorsModule", {
      setType: "setType",
      setFilterDate: "setFilterDate"
    }),
    executeRecaptcha() {
      this.sending = true;
      window.recaptchaComponent.execute(this.addLink);
    },
    addLink(recaptchaKey) {
      axios
        .post(`links?g-recaptcha-response=${recaptchaKey}`, this.sponsorLink)
        .then(response => {
          let errors = [];
          this.sending = false;

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
    },
    customLabelTag(option) {
      return `${option}`;
    },
    customLabelWeeks(option) {
      const dateTuesday = new Date(option.tuesday);
      return `${calendarHelper.getDayName(dateTuesday.getDay()-1)} ${dateTuesday.getDate()} ${calendarHelper.getMonthName(dateTuesday.getMonth())}, ${dateTuesday.getFullYear()}`;
    },
    onTypeChange: function(e) {
      this.setType(e.target.value);
    }
  },
  mounted() {
    tagService
    .getTags()
    .then(response => {
      if (response) {
        this.tagOptions = response;
      }
    })
    .catch(() => {
      // Notification
      this.sending = false;
      this.success = false;
    });
  }
};
</script>
<style>
  .select-single-full input{
    width: 100% !important;
  }
</style>
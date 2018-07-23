<template>
  <div>
    <div id="dnwSponsorContent" ref="dnwSponsorContent" style="display:none">
      <dnw-sponsor-content v-bind:sponsorLink="sponsorLink"></dnw-sponsor-content>
    </div>
    <div id="dnwSponsorSpacer" ref="dnwSponsorSpacer" style="display:none">
      <table class="spacer float-center" style="background-color: inherit !important; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"><tbody><tr><td height="16px" style="border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 600; line-height: 16px; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding: 0px 15px;">&nbsp;</td></tr></tbody></table>
    </div>
    <iframe id="newsletterTmpl" ref="newsletterTmpl"></iframe>
  </div>
</template>
<script>
import request from "axios";
import { mapGetters, mapActions } from "vuex";
import dnwSponsorContent from "./dnwSponsorContent";
import linkHelper from "../helpers/link.helper";

export default {
  components: {
    "dnw-sponsor-content": dnwSponsorContent
  },
  data: () => {
    return {
      newsletterTmpl: "",
      templateCategory: ""
    };
  },
  computed: {
    ...mapGetters("sponsorsModule", ["sponsorLink", "sponsorFilter"]),
    sponsorLinkObj() {
      return JSON.stringify(this.sponsorLink);
    }
  },
  watch: {
    sponsorLinkObj: function(newLink, oldLink) {
      const newLinkObj = JSON.parse(newLink);
      const oldLinkObj = JSON.parse(oldLink);
      if (
        (newLinkObj.category && oldLinkObj.category !== newLinkObj.category) ||
        (newLinkObj.date && oldLinkObj.date !== newLinkObj.date)
      ) {
        setTimeout(() => {
          this.refreshTemplate();
        });
      } else if (this.newsletterTmpl) {
        this.renderPreview(newLink);
      }
    }
  },
  methods: {
    ...mapActions("sponsorsModule", {
      setFilter: "setFilter"
    }),
    renderPreview() {
      const self = this;
      setTimeout(() => {
        if (
          !self.$refs.newsletterTmpl ||
          !self.$refs.newsletterTmpl.contentWindow
        ) {
          return;
        }
        let doc = self.$refs.newsletterTmpl.contentWindow.document;
        let linkTmpl = self.newsletterTmpl;
        let sponsorContentTmpl = self.$refs.dnwSponsorContent.innerHTML;
        if (self.sponsorLink.title) {
          linkTmpl = linkTmpl.replace(
            /(\${linkTitle})/gim,
            self.sponsorLink.title
          );
        }
        if (self.sponsorLink.url) {
          linkTmpl = linkTmpl.replace(
            /(\${linkResource})/gim,
            self.sponsorLink.url
          );
        }
        if (self.sponsorLink.tags && self.sponsorLink.tags.length > 0) {
          linkTmpl = linkTmpl.replace(
            /(\${linkTags})/gim,
            self.sponsorLink.tags.join(", ")
          );
        }
        if (self.sponsorLink.url) {
          linkTmpl = linkTmpl.replace(
            /(\${linkRoot})/gim,
            linkHelper.extractRootDomain(self.sponsorLink.url)
          );
        }
        if (self.sponsorLink.imageUrl) {
          linkTmpl = linkTmpl.replace(
            /(\${imageUrl})/gim,
            linkHelper.extractRootDomain(self.sponsorLink.imageUrl)
          );
        }
        linkTmpl = linkTmpl.replace(/(\${linkContent})/gim, sponsorContentTmpl);
        doc.open();
        doc.write(linkTmpl);
        doc.close();
      });
    },
    refreshTemplate() {
      const self = this;
      let query = `emails/currentNewsletter?template=${
        self.sponsorLink.category
      }`;
      let selectedWeek = self.sponsorFilter.nextWeeks.filter(x => {
        return x.tuesday == self.sponsorLink.date;
      });
      if (selectedWeek && selectedWeek.length > 0) {
        selectedWeek = selectedWeek[0];
        query += `&week=${selectedWeek.week}&year=${selectedWeek.year}`;
      }
      request
        .get(query)
        .then(response => {
          self.newsletterTmpl = response.data.data;
          setTimeout(() => {
            self.renderPreview();
            self.templateCategory = self.sponsorLink.category;
            if (
              !self.$refs.newsletterTmpl ||
              !self.$refs.newsletterTmpl.contentWindow
            ) {
              return;
            }
            self.$refs.newsletterTmpl.contentWindow.location = `#${
              self.sponsorLink.category
            }`;
          }, 100);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    request
      .get(`emails/sponsoredCount`)
      .then(response => {
        this.setFilter(response.data.data);
        this.renderPreview();
        this.refreshTemplate();
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>
<style>
#newsletterTmpl {
  width: 100%;
  height: 600px;
}
</style>

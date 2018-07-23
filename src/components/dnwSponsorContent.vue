<template>
  <div>
  <table class="linkContent" style="border-collapse: collapse; margin-bottom: 10px; margin-top: 10px; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"><tbody><tr>
      <th v-if="sponsorLink.imageUrl && sponsorLink.category == 'sponsored'" class="linkImage" style="margin:0;padding:0"><table style="border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width:100px;height:100px;"><tbody><tr><th>
        <img src="${imageUrl}" style="clear: both; display: block; max-width: 100%; outline: none; text-decoration: none; width: auto;">
      </th></tr></tbody></table></th>
      <th v-if="sponsorLink.imageUrl && sponsorLink.category == 'sponsored'" class="linkImagePadding" style="width:5px;"> </th>
      <th><table style="font-weight: 400;border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;text-align:left;"><tbody><tr>
        <th style="font-weight:400">
          {{sponsorLink.content || '${linkContent}'}}
        </th>
      </tr></tbody></table></th>
    </tr></tbody></table>
  </div>
</template>
<script>
/*eslint-disable */
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("sponsorsModule", ["sponsorLink"])
  }
};
</script>
  
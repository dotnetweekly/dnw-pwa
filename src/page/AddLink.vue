<template>
  <div>

  <h1>Recommend a new link</h1>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Title</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Link's Title">
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Url</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Resource Url">
        </p>
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
          <div class="select is-full-width">
            <select class="is-full-width">
              <option>Articles</option>
              <option>Books</option>
              <option>Events/ Training</option>
              <option>Libraries/ Tools</option>
              <option>Videos</option>
            </select>
          </div>
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
            v-model="value"
            :options="options"
            :multiple="true"
            track-by="library"
            :custom-label="customLabel"
            >
          </multiselect>
        </div>
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
          <textarea class="textarea" placeholder="e.g. No HTML Supported"></textarea>
        </div>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <a v-on:click="login()" class="button is-link is-medium ">Save</a>
        </p>
      </div>
    </div>
  </div>

  </div>
</template>
<script>
  import Multiselect from 'vue-multiselect'

  export default {
    components: {
      Multiselect
    },
    data() {
    return {
      value: {},
      options: [
        {	language: 'JavaScript', library: 'Vue.js' },
        { language: 'JavaScript', library: 'Vue-Multiselect' },
        { language: 'JavaScript', library: 'Vuelidate' }
      ]
    }},
    methods: {
      customLabel (option) {
        return `${option.library} - ${option.language}`
      }
  }
}
</script>

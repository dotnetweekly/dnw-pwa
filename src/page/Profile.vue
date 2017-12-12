<template>
<div>
  <h2 v-if="profile">Profile</h2>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Name</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" v-bind:value="profile.firstName" placeholder="First Name">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" v-bind:value="profile.lastName" placeholder="Last Name">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Username</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" v-bind:value="profile.username" placeholder="Username">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Twitter</label>
    </div>
    <div class="field-body">
      <div class="field has-addons">
          <p class="control is-marginless">
            <a class="button is-static">
              @
            </a>
          </p>
          <p class="control is-expanded">
            <input class="input" type="text" v-bind:value="profile.twitter" placeholder="Twitter Username">
          </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Github</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" v-bind:value="profile.github" placeholder="Github Username">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Subscribed to weekly newsletter</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <div class="control">
            <label class="radio">
              <input type="radio" name="foobar">
              Yes
            </label>
            <label class="radio">
              <input type="radio" name="foobar" checked>
              No
            </label>
          </div>
        </p>
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

  <div class="separator"></div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label">Change Email</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control is-expanded has-icons-left">
          <input class="input" type="text" placeholder="Change Email">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </p>
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
          <a v-on:click="login()" class="button is-link is-medium ">Change Email</a>
        </p>
      </div>
    </div>
  </div>

  <div class="separator"></div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label"></label>
    </div>
    <div class="field-body">
      <div class="field">
        <dnw-user-history v-if="profile.username" :username="profile.username"></dnw-user-history>
      </div>
    </div>
  </div>

</div>
</template>
<script>
import { mapGetters } from "vuex";
import dnwUserCard from "../components/dnwHistory/dnwUserHistory";

const fetchInitialData = (store, route) => {
  return store.dispatch(`userModule/getProfile`);
};

export default {
  components: {
    "dnw-user-history": dnwUserCard
  },
  computed: {
    ...mapGetters("userModule", ["profile"])
  },
  methods: {
    loadData() {
      fetchInitialData(this.$store, this.$route);
    }
  },
  watch: {
    $route(to, from) {
      this.loadData();
    }
  },
  created() {
    this.loadData();
  }
};
</script>
<style>
.separator{
  border-top: 1px solid rgba(219, 219, 219, 0.5);
  margin-top: 3rem;
  padding-top: 1.5rem;
  font-size: 90%;
}
</style>

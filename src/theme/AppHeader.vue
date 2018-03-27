<template>
  <nav class="navbar has-shadow">
    <div class="container">
      <router-link class="navbar-item main-logo" to="/" title="dotNET Weekly" exact>
        <img alt="dotNET Weekly" src="/assets/logo.jpg" /><span class="dnw-logo-txt">dotNET Weekly</span>
        <div class="header-user-count tags has-addons">
          <span class="tag"><i aria-hidden="true" class="icon-user"></i></span>
          <span class="tag is-info">{{dnwSubscriberCount}}</span>
        </div>
      </router-link>
      <div class="column tight"></div>
      <div class="header-menu">
        <div class="header-cta">
          <router-link v-if="isAuthenticated" alt="add a link" to="/add" class="add-a-link is-text">+ Add a link</router-link>
          <router-link v-if="!isAuthenticated" alt="login" to="/login" class="add-a-link is-text">+ Add a link</router-link>
        </div>
        <div class="header-profile">
          <div class="header-profile-inner">
            <router-link v-if="isAuthenticated" to="/profile" title="profile">
              <i title="profile" class="icon-user" alt="profile" aria-hidden="true"></i>
            </router-link>
            <router-link v-if="!isAuthenticated" to="/login" title="profile">
              <i title="profile" class="icon-user" alt="profile" aria-label="profile" aria-hidden="true"></i>
            </router-link>
            <a v-if="isAuthenticated" v-on:click="logout()" class="header-auth-link">Logout</a>
            <router-link v-if="!isAuthenticated" class="header-auth-link" to="/login">Login</router-link>
            <span v-if="!isAuthenticated" class="header-auth-link auth-link-separator">|</span>
            <router-link v-if="!isAuthenticated" class="header-auth-link" to="/register">Register</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dnwSubscriberCount: 3530
    };
  },
  computed: {
    ...mapGetters("authModule", ["isAuthenticated", "subscribers"])
  },
  watch: {
    subscribers(to) {
      if (typeof window === "undefined") {
        this.dnwSubscriberCount = to;
        return;
      }
      let interval = setInterval(() => {
        if (this.dnwSubscriberCount >= to) {
          clearInterval(interval);
          return;
        }
        this.dnwSubscriberCount++;
      }, 50);
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("authModule/logout");
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../_variables";

.auth-link-separator {
  padding: 0 0.3rem;
}

.header-auth-link {
  vertical-align: middle;
  line-height: 2.7rem;
  font-size: 16px;
}

.header-menu {
  display: flex;
}

.navbar-item {
  align-items: center !important;
}

.dnw-logo-txt {
  padding-left: $is-size-7;
}

a.navbar-item.main-logo {
  color: $primary;
}

.header-search {
  padding: 0 20%;
}

.header-cta {
  padding: 1rem 0.75rem;
}

.header-profile {
  font-size: 160%;
  padding: 0.5rem 1rem;
}

.header-profile {
  span,
  a {
    float: left;
  }
}

@media screen and (min-width: $desktop) {
  .container {
    min-width: $desktop;
  }
}

@media screen and (max-width: $tablet) {
  .header-profile,
  .header-cta,
  .header-menu {
    width: 100%;
    display: inline-block;
  }
}

@media screen and (min-width: "421px") {
  .navbar > .container,
  .main-logo {
    display: flex !important;
  }
}

@media (min-width: $mobile) and (max-width: $tablet) {
  .header-profile-inner {
    float: right;
  }
  .header-cta {
    text-align: right;
  }
}

@media screen and (max-width: $mobile) {
  .header-profile-inner {
    margin: 0 auto;
    display: inline-block;
  }
  .header-user-count {
    margin: 0 auto;
    display: inline-block;
  }
  .header-menu,
  .main-logo,
  .header-cta,
  .header-profile {
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .main-logo > img,
  .dnw-logo-txt {
    vertical-align: middle;
  }
  .column.tight {
    display: none;
  }
}
</style>

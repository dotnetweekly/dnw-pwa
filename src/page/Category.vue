<template>
<div class="columns">
  <dnw-menu></dnw-menu>
  <div class="column">
    <dnw-link v-for="post in posts" v-bind:key="post._id" :link="post"></dnw-link>
  </div>
</div>
</template>
<script>
import dnwLink from "../components/dnwLink";
import dnwMenu from "../components/dnwMenu";

export default {
  components: {
    "dnw-link": dnwLink,
    "dnw-menu": dnwMenu
  },
  data() {
    return {
      posts: [
        {
          _id: "5a0fc657b3271d172760b822",
          title:
            "CI/CD with .NET Core 2.0, VS Code, GitHub, Azure, and Docker (mikewilliams.io)",
          tags: [
            { _id: "5a1256b82ef3181cec1fe628", name: "dotnet" },
            { _id: "5a1276402e3a2e34e298e122", name: "azure" }
          ],
          url: "http://querystorm.com/documentation.html",
          createdOn: "2017-11-18T05:34:15.476Z",
          user: {
            username: "bstavroulakis"
          }
        }
      ]
    };
  }
};
</script>
<template></template>
<script>
export default {
  mounted() {
    const hash = this.$route.hash.replace("#", "").replace(/\s+/g, "");
    this.$router.push(hash || "/");
  }
};
</script>

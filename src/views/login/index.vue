<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  .login-bg {
    display: block;
    object-fit: contain;
  }
}
</style>
<template>
  <section class="login-container">
    <img class="login-bg" src="@/assets/login-bg.jpg" alt="login" />
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {}
</script>

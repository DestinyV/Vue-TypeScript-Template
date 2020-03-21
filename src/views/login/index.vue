<style lang="less" scoped>
.login-container {
  width: 100%;
  height: 100%;
  .login-bg {
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: auto;
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

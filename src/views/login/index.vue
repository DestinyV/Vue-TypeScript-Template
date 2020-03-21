<style lang="less" scoped>
.login-container {
  position: relative;
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
  .show-sign {
    position: absolute;
    top: 25%;
    left: 50%;
  }
  .show-time {
    position: absolute;
    bottom: 15rem;
    left: 5rem;
    text-align: left;
    font-family: sans-serif, serif, monospace, cursive, fantasy;
    .show-time-hour {
      font-size: 12rem;
    }
    .show-time-day {
      font-size: 6rem;
    }
  }
}
</style>
<template>
  <section class="login-container" @click="showSign">
    <!-- 背景 -->
    <img class="login-bg" src="@/assets/login-bg.jpg" alt="login" />
    <!-- time -->
    <transition-group name="time">
      <!-- 登录 -->
      <div v-if="toggle" class="show-sign" key="show-sign">
        <a-card hoverable :bordered="false" style="width: 240px">
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
            slot="cover"
          />
          <a-card-meta title="Europe Street beat">
            <template slot="description">www.instagram.com</template>
          </a-card-meta>
        </a-card>
      </div>
      <div v-else class="show-time" key="show-time">
        <div class="show-time-hour">{{ hour }}</div>
        <div class="show-time-day">{{ month }},{{ week }}</div>
      </div>
    </transition-group>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Card } from "ant-design-vue";
import moment from "moment";

@Component({
  components: {
    ACard: Card,
    ACardMeta: Card.Meta
  }
})
export default class Login extends Vue {
  private hour: string = moment(new Date()).format("LT");
  private week: string = moment(new Date()).format("dddd");
  private month: string = moment(new Date()).format("MMM Do");
  private toggle = false;
  mounted() {
    setInterval(() => {
      this.hour = moment(new Date()).format("LT");
    }, 10 * 1000);
    setInterval(() => {
      this.week = moment(new Date()).format("dddd");
      this.month = moment(new Date()).format("MMM Do");
    }, 3.6e6);
  }
  private showSign(): void {
    this.toggle = false;
    this.toggle = true;
    console.log("showSign", this.toggle);
  }
}
</script>

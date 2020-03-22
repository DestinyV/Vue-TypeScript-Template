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
    top: 35%;
    left: 45%;
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
  <section class="login-container" @mousemove="showSign" @click="showSign">
    <!-- 背景 -->
    <img class="login-bg" src="@/assets/login-bg.jpg" alt="login" />
    <!-- time -->
    <transition-group name="time">
      <!-- 登录 -->
      <div v-if="toggle" class="show-sign" key="show-sign">
        <a-form
          layout="horizontal"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 20 }"
          :form="form"
          :selfUpdate="true"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [{ required: true, message: '请输入账号' }]
                }
              ]"
              placeholder="账号"
            >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input-password
              v-decorator="[
                'password',
                {
                  rules: [{ required: true, message: '请输入密码' }]
                }
              ]"
              type="password"
              placeholder="密码"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">登录</a-button>
          </a-form-item>
        </a-form>
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
import { Input, Icon, Form, Button, Checkbox } from "ant-design-vue";
import moment from "moment";
import { setToken } from "@/utils/authority";
// import { debounce } from "@/utils/index.ts";

@Component({
  components: {
    AInput: Input,
    AForm: Form,
    AFormItem: Form.Item,
    AIcon: Icon,
    AInputPassword: Input.Password,
    AButton: Button,
    ACheckbox: Checkbox
  }
})
export default class Login extends Vue {
  private hour: string = moment(new Date()).format("LT");
  private week: string = moment(new Date()).format("dddd");
  private month: string = moment(new Date()).format("MMM Do");
  private toggle = false;
  private timer: NodeJS.Timeout | null = null;
  private form: any = this.$form.createForm(this);
  mounted() {
    setInterval(() => {
      this.hour = moment(new Date()).format("LT");
    }, 10 * 1000);
    setInterval(() => {
      this.week = moment(new Date()).format("dddd");
      this.month = moment(new Date()).format("MMM Do");
    }, 3.6e6);
  }
  public showSign(): void {
    this.toggle = true;
    this.timer = null;
    this.timer = setTimeout(() => {
      this.toggle = false;
    }, 60 * 1000);
  }
  public handleSubmit(e: Event): void {
    e.preventDefault();
    this.form.validateFields((err: Error, values: any) => {
      if (!err) {
        console.log("Received values of form: ", values);
        // 登录成功需添加自定义逻辑然后设置token
        setToken("loginToken");
        this.$router.push("/");
      }
    });
  }
}
</script>

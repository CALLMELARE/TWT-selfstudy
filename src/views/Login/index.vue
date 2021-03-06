<!-- Login -->
<template>
  <div class="home-container">
    <div class="warpper">
      <h2 class="title">登录天外天账号</h2>
      <van-tabs v-model:active="active">
        <van-tab class="tab" title="密码登录">
          <van-form @submit="onSubmitPwd">
            <van-field
              v-model="state.username"
              name="username"
              placeholder="邮箱/用户名/学号"
              :rules="[{ required: true, message: '请填写邮箱/用户名/学号' }]"
            />
            <van-field
              v-model="state.password"
              type="password"
              name="password"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />

            <div style="margin: 16px;">
              <van-button round block type="primary" native-type="submit">
                登录
              </van-button>
            </div>
          </van-form>
        </van-tab>
        <van-tab class="tab" title="验证码登录">
          <van-form @submit="onSubmitPwd">
            <van-field v-model="state.tel" name="tel" type="tel" placeholder="手机号" />
            <van-field v-model="state.sms" name="sms" center clearable placeholder="短信验证码">
              <template #button>
                <van-button size="small" type="primary">发送验证码</van-button>
              </template>
            </van-field>
            <div style="margin: 16px;">
              <van-button round block type="primary" native-type="submit">
                登录
              </van-button>
            </div>
          </van-form>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Login',
  props: {},
  setup() {
    const active = ref(1)
    const state = reactive({
      tel: '',
      sms: '',
      username: '',
      password: ''
    })
    const onSubmitPwd = (values: any) => {
      console.log(values)
    }
    const onSubmitSMS = (values: any) => {
      console.log(values)
    }
    const sendSMS = () => {}
    return { active, state, onSubmitPwd, onSubmitSMS, sendSMS }
  }
})
</script>
<style lang="scss" scoped>
.home-container {
  .warpper {
    padding: 12px;
    background: #fff;
    font-size: 18px;

    .title {
      padding: 30px 0;
      font-size: 22px;
      font-weight: bold;
      line-height: 30px;
      text-align: center;
    }
    .tab {
      padding-top: 10px;
    }
  }
}
</style>

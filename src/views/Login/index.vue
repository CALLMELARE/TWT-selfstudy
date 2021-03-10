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
          <van-form @submit="onSubmitSMS">
            <van-field
              v-model="state.tel"
              name="tel"
              type="tel"
              placeholder="手机号"
              :rules="[
                { required: true, message: '请填写手机号' },
                {
                  pattern,
                  message: '请输入正确的手机号'
                }
              ]"
            />
            <van-field
              v-model="state.sms"
              name="sms"
              center
              clearable
              placeholder="短信验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
            >
              <template #button>
                <van-button @click="sendSMS(state.tel)" size="small" type="primary"
                  >发送验证码</van-button
                >
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
import { loginCommon, loginVerifyCode, loginWithSMS } from '@/api/auth'
import { Notify } from 'vant'
import { setMsgCookie, setToken } from '@/utils/auth'
import { getQueryParamByKey } from '@/utils'
import router from '@/router'
export default defineComponent({
  name: 'Login',
  props: {},
  setup() {
    const pattern = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/
    const active = ref(0)
    const from = getQueryParamByKey('from')
    const state = reactive({
      tel: '',
      sms: '',
      username: '',
      password: ''
    })
    const onSubmitPwd = (values: any) => {
      let data = {
        account: values.username,
        password: values.password
      }

      console.log(values)
      loginCommon(data)
        .then((val) => {
          setToken(val.data.token)
          Notify({
            type: 'success',
            message: '登录成功'
          })
          if (from) {
            router.push({ path: from })
          } else {
            router.push({ path: '/home' })
          }
        })
        .catch((val) => {
          Notify({
            type: 'danger',
            message: val.data.message
          })
        })
    }
    const onSubmitSMS = (values: any) => {
      let data = {
        phone: values.tel,
        code: values.sms
      }
      console.log(values)
      loginWithSMS(data)
        .then((val) => {
          setToken(val.data.token)
          Notify({
            type: 'success',
            message: '登录成功'
          })
          if (from) {
            router.push({ path: from })
          } else {
            router.push({ path: '/home' })
          }
        })
        .catch((val) => {
          Notify({
            type: 'danger',
            message: val.data.message
          })
        })
    }
    const sendSMS = (value: any) => {
      let data = { phone: value }
      console.log(value)
      loginVerifyCode(data)
        .then((val) => {
          Notify({
            type: 'primary',
            message: '短信发送成功'
          })
          setMsgCookie(val.data.cookie)
        })
        .catch((val) => {
          Notify({
            type: 'danger',
            message: val.data.message
          })
        })
    }
    return { active, state, onSubmitPwd, onSubmitSMS, sendSMS, pattern }
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

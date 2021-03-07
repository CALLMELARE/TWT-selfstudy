import service from '@/utils/request'
import { loginCommonData, loginVerifyCodeData, loginWithSMSData } from '@/api/interface'

// 这几个接口不要求token，但是也要求domain和ticket

// 发送短信验证码
export function loginVerifyCode(data: loginVerifyCodeData) {
  return service({
    url: 'login/phoneMsg',
    method: 'post',
    data
  })
}

// 使用账号密码登录
export function loginCommon(data: loginCommonData) {
  return service({
    url: 'login/common',
    method: 'post',
    data
  })
}

// 使用短信验证码登录
export function loginWithSMS(data: loginWithSMSData) {
  return service({
    url: 'login/phone',
    method: 'post',
    data
  })
}

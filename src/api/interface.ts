export interface IResponseType<P = {}> {
  code: number
  msg: string
  data: P
}

// 用户信息
export interface IUserInfo {
  author?: string
  avator?: string
  projectAddress?: string
  demoUrl?: string
  demoCodeUrl?: string
}

// jssdk配置信息
export interface IJsSdk {
  signature: string
  nonceStr: string
  timestamp: string
  appId: string
}

// -------- auth.ts --------

// 根据手机号发送验证码
export interface loginVerifyCodeData {
  phone: string
}

// 账号密码登录
export interface loginCommonData {
  account: string
  password: string
}

// 短信验证码登录
export interface loginWithSMSData {
  phone: string
  code: string
}

// -------- fav.ts --------
// 添加收藏教室
export interface addCollectionData {
  classroom_id: string
}

// 删除已收藏的某个教室
export interface deleteCollectionData {
  classroom_id: string
}

// -------- selfstudy.ts --------

export interface getDayData {
  term: string | number //学期 exp:18192
  week: string | number //周 exp:9
  day: string | number //日 exp:6
}

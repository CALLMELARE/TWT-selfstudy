import Cookies from 'js-cookie'

const TokenKey = 'Token'
const CookieKey = 'cookie'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string | object) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getMsgCookie() {
  return Cookies.get(CookieKey)
}

export function setMsgCookie(cookie: string | object) {
  return Cookies.set(CookieKey, cookie)
}

export function removeMsgCookie() {
  return Cookies.remove(CookieKey)
}

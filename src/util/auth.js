import Cookies from 'js-cookie'

const TokenKey = process.env.COOKIE_NAME
const CookieUserName = process.env.COO_USER_NAME
const CookieUid = process.env.COO_USER_ID
const CookieMid = process.env.COO_USER_MID



export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey) && Cookies.remove(CookieUserName) && Cookies.remove(CookieUid)
}

export function setCookieUserName (name) {
  return Cookies.set(CookieUserName, name)
}

export function getUserName () {
  return Cookies.get(CookieUserName)
}

export function getUID () {
  return Cookies.get(CookieUid)
}

export function setUID (uid) {
  return Cookies.set(CookieUid, uid)
}

export function getMID () {
  return Cookies.get(CookieMid)
}

export function setMID (uid) {
  return Cookies.set(CookieMid, uid)
}

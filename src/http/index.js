import Vue from 'vue'
import { SUCCESS, LOGINERR } from './httpConst'
import router from '../router'
/* eslint-disable no-undef */

// const httpHost = ''; // 正式
// const httpHost = 'http://118.178.234.171:7070'; // 测试服务器host
const httpHost = 'http://dev.meipuyn.com' // 测试服务器host
// const httpHost = 'http://main.localhost.com:7070' // 测试服务器host
// const httpHost = 'http://118.178.234.171' // 正式服务host
// const httpHost = 'http://vip.meipuyn.com' // 正式服务host
// 现在线上服务器 vip.meipuyn.com 开发服务器dev.meipuyn.com
//

axios.defaults.baseURL = httpHost // 默认的请求url
/**
 * post http请求
 * @param  {String} url           [请求url]
 * @param  {Object} params        [请求参数]
 * @param  {[type]} showErrToast  [是否显示错误提示]
 * @return {[type]}               [description]
 */
export async function postHttp ({ url = '', params = {}, showErrToast = true } = { url: '', params: {}, showErrToast: true }) {
  try {
    let response = await axios.post(url, params, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   USER_ID: localStorage.getItem('userId') || '',
      //   ACCESS_TOKEN: localStorage.getItem('accessToken') || ''
      // },
      timeout: 30000
    })
    if (showErrToast && response.data.code !== SUCCESS) {
      Vue.prototype.$message.error(response.data.message || '请求失败, 请重试')
    }
    if (response.data.code === LOGINERR) {
      router.push('/')
      return
    }
    return response.data
  } catch (e) {
    console.error('err: ', e)
    Vue.prototype.$message.error('请求失败, 请重试')
  }
}

/**
 * get http请求
 * @param  {String} url           [请求url]
 * @param  {Object} params        [请求参数]
 * @param  {[type]} showErrToast  [是否显示错误提示]
 * @return {[type]}               [description]
 */
export async function getHttp ({ url = '', params = {}, showErrToast = true } = { url: '', params: {}, showErrToast: true }) {
  try {
    let response = await axios.get(url, { params: params }, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   USER_ID: localStorage.getItem('userId') || '',
      //   ACCESS_TOKEN: localStorage.getItem('accessToken') || ''
      // },
      timeout: 30000
    })
    if (showErrToast && response.data.code !== SUCCESS) {
      Vue.prototype.$message.error(response.data.message || '请求失败, 请重试')
    }
    if (response.data.code === LOGINERR) {
      router.push('/')
      return
    }
    return response.data
  } catch (e) {
    console.error('err: ', e)
    Vue.prototype.$message.error('请求失败, 请重试')
  }
}

/**
 * @Description: 传入不完整的文件路径进行判断，如果没有ip地址则进行拼接，
 *  使用方法： 在需要凭借的变量后加=>    | pathJoint    <=即可
 *  例如 <img :src="avatar">  =>  <img :src="avatar|pathJoint">
 * @MethodAuthor: Yuqing
 * @Date: 2022-03-09 17:17:33
 * @path    '/file/123.jpg'
 * @returns 'http://10.42.42.50:8888/file/123.jpg'
*/
import store from '@/store'
import { isExternal } from '@/utils/validate'
function pathJoint(path) {
  if (path) {
    return isExternal(path) ? path : store.state.app.fileServerPath + path
  }
  return ''
}
export default {
  pathJoint
}

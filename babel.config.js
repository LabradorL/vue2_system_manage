/*
 * @Author: lixiaofeng
 * @Date: 2022-09-25 15:57:32
 * @LastEditors: 李晓风 1091616642@qq.com
 * @LastEditTime: 2024-02-04 11:32:39
 * @Description:
 */
module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      'plugins': ['dynamic-import-node']
    }
  }
}

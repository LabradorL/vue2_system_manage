/*
 * @Author: lixiaofeng
 * @Date: 2022-09-26 18:10:27
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-10-14 10:43:10
 * @Description: 弹窗拖拽 v-dialogDrag
 * example: <el-dialog v-dialogDrag></el-dialog>
 *
 */
export default {
  //1-被绑定
  bind(el, binding, vnode, oldVnode) {
    const value = binding.value
    if (value == false) return
    // 获取拖拽内容头部
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    const dragDom = el.querySelector('.el-dialog');
    const closeButton = el.querySelector('.el-icon-close')
    dialogHeaderEl.style.cursor = 'move';
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
    dragDom.style.position = 'absolute';
    dragDom.style.marginTop = 0;
    let width = dragDom.style.width;
    if (width.includes('%')) {
      width = +document.body.clientWidth * (+width.replace(/\%/g, '') / 100);
    } else {
      width = +width.replace(/\px/g, '');
    }
    dragDom.style.left = `${(document.body.clientWidth - width) / 2}px`;
    let originLeft = dragDom.style.left
    let originTop = dragDom.style.top
    // 对于页面节点监听,用于关闭对话框后复位
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    // 创建MutationObserver实例，返回一个观察者对象
    let observer = new MutationObserver((mutationRecoards, observer) => {
      // mutationRecoards 变动数组
      // observer 观察者实例

      // 观察的内容发生变化后的处理逻辑开始
      let display = getComputedStyle(el).getPropertyValue('display')
      if (display == "none") {
        dragDom.style.left = originLeft
        dragDom.style.top = originTop
      }
      // 观察的内容发生变化后的处理逻辑结束
    })
    // observe(node, config) 启动监听
    // node 所要监听的DOM元素
    // config 一个配置对象，指定所要观察的特定变动
    observer.observe(el, { attributes: true, attributeFilter: ['style'], attributeOldValue: true })

    // 鼠标按下事件
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离 (鼠标点击位置距离可视窗口的距离)
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes('%')) {
        styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
        styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
      } else {
        styL = +sty.left.replace(/\px/g, '');
        styT = +sty.top.replace(/\px/g, '');
      };

      // 鼠标拖拽事件
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离 （开始拖拽至结束拖拽的距离）
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        let finallyL = l + styL
        let finallyT = t + styT

        // 移动当前元素
        dragDom.style.left = `${finallyL}px`;
        dragDom.style.top = `${finallyT}px`;

      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
    // 是否存在关闭按钮,点击关闭按钮后复位
    // if(closeButton) {
    //   closeButton.addEventListener("click", function(){
    //     setTimeout(()=>{
    //       dragDom.style.left = originLeft
    //       dragDom.style.top = originTop
    //     },500)
    //   })
    // }
  },
  //2-被插入
  inserted: function (el, binding, vnode) {
    console.log("2-inserted 被插入");
  },
  //3-更新
  update: function (el, binding, vnode) {
    // let display = getComputedStyle(el).getPropertyValue('display')
    // if(display === 'block') {
    //   console.log("3-update 更新");
    //   // 关闭对话框后复位
    //   const dragDom = el.querySelector('.el-dialog');
    //   let width = dragDom.style.width;
    //   if (width.includes('%')) {
    //     width = +document.body.clientWidth * (+width.replace(/\%/g, '') / 100);
    //   } else {
    //     width = +width.replace(/\px/g, '');
    //   }
    //   setTimeout(()=>{
    //     dragDom.style.left = `${(document.body.clientWidth - width) / 2}px`
    //     dragDom.style.top = ''
    //   },500)
    // }
  },
  //4-更新完成
  componentUpdated: function (el, binding, vnode) {
    console.log("4-componentUpdated 更新完成");
  },
  //5-解绑
  unbind: function (el, binding, vnode) {
    console.log("5-unbind 解绑");
  }
};

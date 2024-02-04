<!--
 * @Author: lixiaofeng
 * @Date: 2022-10-08 11:46:26
 * @LastEditors: lixiaofeng
 * @LastEditTime: 2022-10-14 17:25:31
 * @Description:
-->
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<svg-icon icon-class={icon} />)
    }

    if (title) {
      if (title.length > 5) {
        vnodes.push(
          <span slot='title' title={title}>
            {title}
          </span>
        )
      } else {
        vnodes.push(<span slot='title'>{title}</span>)
      }
    }
    return vnodes
  }
}
</script>

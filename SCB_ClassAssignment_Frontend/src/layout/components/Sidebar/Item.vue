<script lang="jsx">
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
    const { title } = context.props
    const vnodes = []

    // if (icon) {
    //   if (icon.includes('el-icon')) {
    //     vnodes.push(<i style="font-size: 20px" class={[icon, 'sub-el-icon']} />)
    //   } else {
    //     vnodes.push(<svg-icon style="font-size: 20px" icon-class={icon}/>)
    //   }
    // }

    if (title) {
      vnodes.push(<span slot='title' style="font-size: 16px">{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

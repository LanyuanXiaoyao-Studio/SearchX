<template>
  <a-icon :component="SvgData"/>
</template>

<script>
import SvgData from '@/icons/MacOSSvg'

export default {
  components: {
    SvgData
  },
  data() {
    return {
      SvgData
    }
  }
}
</script>

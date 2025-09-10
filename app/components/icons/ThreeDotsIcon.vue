<template lang="">
    <svg :width="iconWidth" :height="iconHeight" viewBox="0 0 16 16" :fill="$colorMode.value === 'light' ? light : dark" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.99996 3.55558C8.98181 3.55558 9.77775 2.75964 9.77775 1.77779C9.77775 0.795944 8.98181 0 7.99996 0C7.01811 0 6.22217 0.795944 6.22217 1.77779C6.22217 2.75964 7.01811 3.55558 7.99996 3.55558Z" fill="#9D9D9D"/>
                  <path d="M7.99996 9.77775C8.98181 9.77775 9.77775 8.98181 9.77775 7.99996C9.77775 7.01811 8.98181 6.22217 7.99996 6.22217C7.01811 6.22217 6.22217 7.01811 6.22217 7.99996C6.22217 8.98181 7.01811 9.77775 7.99996 9.77775Z" fill="#9D9D9D"/>
                  <path d="M7.99996 15.9999C8.98181 15.9999 9.77775 15.204 9.77775 14.2221C9.77775 13.2403 8.98181 12.4443 7.99996 12.4443C7.01811 12.4443 6.22217 13.2403 6.22217 14.2221C6.22217 15.204 7.01811 15.9999 7.99996 15.9999Z" fill="#9D9D9D"/>
                </svg>
</template>
<script>
export default {
     props: {
    iconWidth: {
      type : String,
      default : '16'
    },
    iconHeight : {
      type : String,
      default : '16'
    },
    light : {
      type : String,
      default : '#1A1919'
    },
    dark : {
      type : String,
      default : '#8D8D8D'
    },
  }
    
}
</script>
<style lang="">
    
</style>
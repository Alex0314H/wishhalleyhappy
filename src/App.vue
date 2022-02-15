<template>
<html>
  <meta name="viewport" content="width=device-width; initial-scale=1; maximum-scale=1; minimum-scale=1; user-scalable=no; ">
  <div id="app">

    <router-view />
  </div>
</html>

</template>

<script>
export default {
  name: 'App'
}
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}
</script>

<style scoped lang="less">
</style>

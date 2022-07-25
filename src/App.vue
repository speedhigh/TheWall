<template>
  <div class="min-h-screen bg-gray-200 text-gray-900">
    <div class="container max-w-md mx-auto bg-gray-50 min-h-screen">
      <router-view />
    </div>
  </div>
</template>

<script>
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
// document.body.addEventListener('focusout', () => {
//   document.body.scrollIntoView(true);
// })
</script>

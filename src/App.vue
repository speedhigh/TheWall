<template>
  <div class="min-h-screen bg-gray-200 text-gray-900">
    <div 
      class="container max-w-md mx-auto bg-gray-50 min-h-screen"
      :class="{'pt-11': $route.meta.title}, {'pb-12': $route.meta.hasFooter}"
    >
      <router-view />
    </div>
  </div>
</template>

<script setup>

</script>

<style>
.toast {
	z-index: 10000 !important;
}
</style>

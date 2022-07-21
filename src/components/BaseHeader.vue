<template>
  <!-- header -->
  <header 
    v-if="$route.meta.title" 
    class="fixed top-0 bg-white inset-x-0 max-w-md mx-auto w-full h-11 flex items-center pr-11 z-50"
  >
    <!-- black -->
    <div class="p-2.5" @click="$router.back()">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </div>
    <!-- title -->
    <h1 class="mx-auto text-lg">{{ $route.meta.title }}</h1>
  </header>
</template>
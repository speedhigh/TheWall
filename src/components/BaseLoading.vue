<template>
  <div class="flex items-center justify-center h-screen relative bg-[rgba(255,255,255,0.8)]">
    <section class="absolute overflow-hidden">
      <span class="text-gray-500 text-sm z-20">Loading...</span>
    </section>
    <div class="flex items-center justify-center w-[400px] h-[400px]">
      <span />
      <span />
    </div>
  </div>
</template>

<style scoped>
div>span {
  background-color: transparent;
  height: 100px;
  width: 100px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 5px solid transparent;
  border-bottom: 5px solid #FF442B;
  border-top: 5px solid #FF442B;
  opacity: 0.6;
  animation: rotateleft 0.8s infinite ease-in-out;
  position: absolute;
}

div>span~span {
  background-color: transparent;
  width: 120px;
  height: 120px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 5px solid transparent;
  border-left: 5px solid #FF442B;
  border-right: 5px solid #FF442B;
  opacity: 0.6;
  animation: rotateright 0.8s infinite ease-in-out;
  position: absolute;
}

@keyframes rotateleft {
  from {transform: rotate(0)}
  to {transform: rotate(-360deg)}
}

@keyframes rotateright {
  from {transform: rotate(0)}
  to {transform: rotate(360deg)}
}
</style>
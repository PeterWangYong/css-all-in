<script setup>
import Container from './components/Container.vue';
</script>

<template>
  <Container></Container>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  @include flex-center;
  width: 100vw;
  height: 100vh;
}
</style>

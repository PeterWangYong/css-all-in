<template>
  <div class="item">
    <h2 class="title">{{ title }}</h2>
  </div>
</template>

<script setup>
defineProps(['title']);
</script>

<style lang="scss" scoped>
.item {
  @include flex-center;
  margin-left: 40px;
  &:nth-of-type(2n + 1) {
    margin-left: 0;
  }
}
</style>

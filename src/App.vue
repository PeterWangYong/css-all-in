<script setup>
import { ref } from 'vue';
import Crystal from './components/Crystal.vue';
import Markdown from './components/Markdown.vue';
import ItemModel from './models/itemModel';
const data = ref(new ItemModel('css'));
function handleParse(root) {
  data.value = root;
  console.log('parse emit', root);
  console.log('after parse data', data.value);
}
</script>

<template>
  <div class="left">
    <Crystal :root="data"></Crystal>
  </div>
  <div class="right">
    <Markdown @parse="handleParse"></Markdown>
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  @include flex-center;
  width: 100vw;
  height: 100vh;

  .left,
  .right {
    width: 50%;
    height: 100%;
    border-left: solid 1px #ccc;
  }

  .left {
    @include flex-center;
  }
}
</style>

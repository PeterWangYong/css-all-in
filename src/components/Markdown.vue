<script setup>
import { ref } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { marked } from 'marked';
import ItemModel from '../models/itemModel';
const emit = defineEmits(['parse']);
const text = ref('');
function initRoot() {
  const root = new ItemModel();
  root.title = 'css';
  root.token = { depth: 0 };
  return root;
}

let root = initRoot();
let lastItem = root;

const walkTokens = (token) => {
  if (token.type === 'heading') {
    // console.log(token);
    function check(token) {
      console.log(lastItem.token, token);
      if (lastItem?.token.depth < token.depth) {
        const newItem = new ItemModel(token.text);
        newItem.token = token;
        lastItem.children = [...lastItem.children, newItem];
        lastItem = newItem;
      } else {
        lastItem = lastItem.parent;
        check(token);
      }
    }
    check(token);
  }
};

marked.use({ walkTokens });

watchDebounced(
  text,
  () => {
    root = initRoot();
    lastItem = root;
    marked.parse(text.value);
    emit('parse', root);
  },
  { debounce: 1000 }
);
</script>

<template>
  <div class="container">
    <textarea class="edit" v-model="text"></textarea>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .edit {
    width: 100%;
    height: 100%;
    padding: 10px;
    outline: none;
    border: none;
    font-size: 1.5em;
  }
}
</style>

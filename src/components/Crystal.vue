<script setup>
import { ref, computed, watchEffect, watch } from 'vue';
import Item from './Item.vue';
import ItemModel from '../models/itemModel';
// import yaml from '../assets/yaml/test.yaml';
const props = defineProps(['root']);

let itemList = ref([props.root]);

watchEffect(() => {
  console.log('watchEffect', props.root);
  itemList.value = [props.root];
});

// const root = ItemModel.parse(yaml);

const itemNumber = computed(() => itemList.value.length);
const itemStyle = computed(() => ({
  width: `${itemNumber.value === 1 ? 100 : 45}%`,
  height: `${
    itemNumber.value === 1 ? 300 : 260 / Math.ceil(itemNumber.value / 2) - 10
  }px`,
  border: `${itemNumber.value === 1 ? 'none' : 'solid 1px #000'}`,
}));

const lastItem = ref(null);
const breadList = ref([]);

function foreNext(item) {
  itemList.value = item.children;
  lastItem.value = item;
  breadList.value.push(item);
}

function backLast() {
  if (!lastItem.value.parent) {
    itemList.value = [lastItem.value];
  } else {
    itemList.value = lastItem.value.parent.children;
    lastItem.value = lastItem.value.parent;
  }
  breadList.value.pop();
}

function jumpItem(item) {
  itemList.value = item.children;
  lastItem.value = item;
  const index = breadList.value.indexOf(item);
  breadList.value = breadList.value.slice(0, index + 1);
}
</script>

<template>
  <div class="container">
    <div class="topbar">
      <div class="bread">
        <span v-if="breadList.length === 0">导航</span>
        <template v-else v-for="item of breadList">
          <span> / </span>
          <a @click="jumpItem(item)">
            {{ item.title }}
          </a>
        </template>
      </div>
      <button @click="backLast">返回上一级</button>
    </div>
    <div class="content">
      <Item
        v-for="item of itemList"
        :key="item.title"
        :title="item.title"
        :style="itemStyle"
        @click="foreNext(item)"
      ></Item>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 500px;
  border: solid 1px #000;

  .topbar {
    @include flex-between;
    height: 50px;
    padding: 0 20px;
  }

  .content {
    @include flex-start;
    height: 300px;
    padding: 0 20px;
  }
}
</style>

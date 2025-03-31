<template>
  <div id="contextmenu" class="context-menu">
    <ul class="menu-list">
      <li class="menu-item" @click="setMark">标记</li>
      <li class="menu-item" @click="deleteMark">清除标记</li>
    </ul>
  </div>
</template>
<script setup>
import { defineProps } from "vue";
import { useMarkStore } from "@/stores/marks";
const props = defineProps({
  target: {
    type: Object,
    required: true
  },
})
const storage = useMarkStore();
const setMark = () => {
  const oldMarks = storage?.marks || [];
  const newMarks = [...oldMarks, props.target.id];
  storage.setMarks(newMarks);

}
const deleteMark = () => {
  const oldMarks = storage?.marks ?? [];
  console.log(oldMarks);
  console.log(Array.isArray(oldMarks)); // 检查是否为数组
  const newMarks = oldMarks.filter((item) => item !== props.target.id.toString());
  storage.setMarks(newMarks);
}
</script>
<style scoped>
.context-menu {
  position: absolute;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100px;
  border: 1px solid #e0e0e0;
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.menu-item:hover {
  background-color: #f0f0f0;
  color: #007bff;
}

.menu-item.disabled {
  color: #a0a0a0;
  cursor: not-allowed;
  pointer-events: none;
}

.menu-item.disabled:hover {
  background-color: transparent;
}
</style>

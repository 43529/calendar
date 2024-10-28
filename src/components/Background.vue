<template>
  <div>
    <button @click="changeColor">123</button>
    <div id="moon"></div>
    <div id="earth" ref="earth"></div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useDateStore } from '@/stores/date'
import lunisolar from 'lunisolar'
const dateStore = useDateStore()
const earth = ref()
onMounted(() => {
  const width = parseInt((400 / 30) * lunisolar(dateStore.date).lunar.day)
  earth.value.style.left =
    earth.value.getBoundingClientRect().left - width + 'px'
})

watch(
  () => dateStore.date,
  (newVal, oldVal) => {
    const width = parseInt((400 / 30) * lunisolar(newVal).lunar.day)
    console.log(width)
    earth.value.style.left =
      earth.value.getBoundingClientRect().left - width + 'px'
  },
)
</script>
<style scoped>
div {
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
#moon {
  position: absolute;
  /* border: 2px solid #0f0f0f; */
  width: 200px;
  height: 200px;
  background-color: #ffff00;
  border-radius: 50%;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
}
#earth {
  position: absolute;
  width: 200px;
  height: 200px;
  background-color: red;
  border-radius: 50%;
  left: calc(50% + 100px);
  top: calc(50% - 100px);
}
</style>

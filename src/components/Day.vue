<template>
  <div @click="trigger" @contextmenu="handleContextMenu" :class="[
    dayjs(date).valueOf() === dayjs(store.date).valueOf() ? 'today' : 'day',
    dayjs(date).month() === store.date.month() ? 'current-month' : '',
    markStore?.marks?.includes(
      dayjs(date).valueOf().toString(),
    )
      ? 'marked'
      : '',

  ]" :id="dayjs(date).valueOf()" ref="box">
    <div>{{ dayjs(date).format('MM-DD') }}</div>
    <div>
      {{ getLunarDate(date) }}
    </div>
  </div>
  <div v-if="isExpanded" ref="overlay" class="overlay" @click="closeOverlay">
    <todo-list v-show="todoVisible" :today="date" :closeOverlay="closeOverlay"  />
  </div>
</template>

<script setup>
import { defineProps, inject, nextTick, watch } from 'vue'
import { useMarksStore } from '@/stores/marks.ts'
import dayjs from 'dayjs'
import { useDateStore } from '@/stores/date'
import lunisolar from 'lunisolar'
import { ref } from "vue"; // 引入 Vue 的 ref
import { gsap } from "gsap";
import TodoList from './TodoList.vue' // 引入 GSAP
const store = useDateStore()
const markStore = useMarksStore()

const box = ref(null);
const overlay = ref(null);

// 控制遮罩层是否显示
const isExpanded = ref(false);
const position = ref({ x: 0, y: 0 });
const todoVisible = ref(null);
// 点击事件处理函数
const expandOverlay = (position) => {
  if (!isExpanded.value) {
    // 显示遮罩层
    isExpanded.value = true;

    // 等待 DOM 更新后执行动画
    nextTick(() => {
      gsap.set(overlay.value, {
        top: position.value.y, // 设置初始顶部位置
        left: position.value.x// 设置初始左侧位置
      });
      gsap.to(overlay.value, {
        duration: 0.5,
        width: "100vw", // 占满屏幕宽度
        height: "100vh", // 占满屏幕高度
        top: "0", // 调整到顶部
        left: "0", // 调整到左侧
        transform: "none", // 移除初始的 transform 居中
        ease: "power2.inOut", // 缓动效果
        onComplete: () => {
          // 动画完成后的回调（如果需要）
          todoVisible.value = true;
        }
      });
    });
  }
}
const closeOverlay = () => {
  todoVisible.value = false;
  gsap.to(overlay.value, {
    duration: 0.5,
    width: "0",
    height: "0",
    top: position.value.y,
    left: position.value.x,
    transform: "translate(-50%, -50%)",
    ease: "power2.inOut",
    onComplete: () => {
      isExpanded.value = false; // 动画完成后隐藏遮罩层

    }
  });
}
const trigger = (e) => {
  position.value = {
    x: e.clientX,
    y: e.clientY,
  }
  store.setDate(props.date)
  expandOverlay(position)
}
const props = defineProps({
  date: {
    type: Object,
    required: true,
  },
})
const contextMenu = inject('contextMenu')
const handleContextMenu = (e) => {
  contextMenu.openMenu(e);
};
/**
 * 根据给定的公历日期返回农历日期
 *
 * @param date 公历日期
 * @returns 返回农历日期。如果是节气，则返回节气名称；如果是农历初一，则返回月份；否则返回具体的农历日期（月日）
 */
const getLunarDate = date => {
  if (lunisolar(date).solarTerm) {
    return lunisolar(date).solarTerm
  } else if (lunisolar(date).format('lD') === '初一') {
    return lunisolar(date).format('lM')
  } else {
    return lunisolar(date).format('lD')
  }
}
</script>
<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
}

.day {
  cursor: pointer;
  color: #a5a5a5;
}

.day:hover {
  border-radius: 10px;
  /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* 卡片阴影 */
  border: 1px solid #ddd;
  color: #283949;
}

.today {
  border-radius: 10px;
  /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* 卡片阴影 */
  border: 2px solid #4a5996;
}

.today:hover {
  border-radius: 10px;
  /* 圆角大小 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  /* 卡片阴影 */
}

.current-month {
  color: #283949;
}

.marked {
  background-color: #d2d8f0;
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background-color: rgba(0, 0, 0, 0.8);
  /* 半透明黑色背景 */
  transform: translate(-50%, -50%);

}
</style>

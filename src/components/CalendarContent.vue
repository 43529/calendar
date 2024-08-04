<template>
  <div ref="container" class="number-axis">
    <div ref="sentinelTop" class="sentinel"></div>
    <ul>
      <li v-for="number in numbers" :key="number"><DayComponent :date="'23'" /></li>
    </ul>
    <div ref="sentinelBottom" class="sentinel"></div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, nextTick } from 'vue'
import DayComponent from './DayComponent.vue'
export default {
  components: {
    DayComponent
  },
  setup() {
    const numbers = reactive([])
    const sentinelTop = ref(null)
    const sentinelBottom = ref(null)
    const observerTop = ref(null)
    const observerBottom = ref(null)
    const container = ref(null)

    // 初始化数轴数据
    const initializeNumbers = () => {
      for (let i = 0; i < 100; i++) {
        numbers.push(i + 1)
      }
    }

    // 加载更多的较小数
    const loadMorePast = () => {
      const firstNumber = numbers[0]
      const newNumbers = []
      for (let i = 1; i <= 10; i++) {
        newNumbers.unshift(firstNumber - i)
      }

      numbers.unshift(...newNumbers)
      if (numbers.length > 100) {
        numbers.splice(-10) // 删除最后10个
      }
      // 调整滚动位置以便显示加载的新内容
      nextTick(() => {
        container.value.scrollTop += 2 * newNumbers.length // 根据实际行高调整
      })
    }

    // 加载更多的较大数
    const loadMoreFuture = () => {
      const lastNumber = numbers[numbers.length - 1]
      for (let i = 1; i <= 10; i++) {
        numbers.push(lastNumber + i)
      }
      if (numbers.length > 100) {
        numbers.splice(0, 10) // 删除前10个
      }
    }

    // 观察者回调函数
    const onIntersectionTop = (entries) => {
      if (entries[0].isIntersecting) {
        loadMorePast()
      }
    }

    const onIntersectionBottom = (entries) => {
      if (entries[0].isIntersecting) {
        loadMoreFuture()
      }
    }

    // 创建观察者
    const createObserver = () => {
      observerTop.value = new IntersectionObserver(onIntersectionTop)
      observerBottom.value = new IntersectionObserver(onIntersectionBottom)
      observerTop.value.observe(sentinelTop.value)
      observerBottom.value.observe(sentinelBottom.value)
    }

    onMounted(() => {
      initializeNumbers()
      createObserver()
      nextTick(() => {
        container.value.scrollTop = container.value.scrollHeight / 2 // 初始位置设置为中间
      })
    })

    return {
      numbers,
      sentinelTop,
      sentinelBottom,
      container
    }
  }
}
</script>

<style>
.number-axis {
  height: calc(100vh - 2px);
  background-color: aqua;
  overflow-y: auto;
}
.sentinel {
  height: 1px;
}
</style>

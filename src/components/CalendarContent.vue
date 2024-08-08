<template>
  <div ref="container" class="number-axis">
    <div ref="sentinelTop" class="sentinel"></div>
    <ul>
      <li v-for="(week, index) in weeks" :key="index"><Week :week="week" /></li>
    </ul>
    <div ref="sentinelBottom" class="sentinel"></div>
  </div>
</template>
<script>
import { ref, reactive, onMounted, nextTick } from 'vue'
import Week from './Week.vue'
import dayjs from 'dayjs'
export default {
  components: {
    Week
  },
  setup() {
    const weeks = reactive([])
    const sentinelTop = ref(null)
    const sentinelBottom = ref(null)
    const observerTop = ref(null)
    const observerBottom = ref(null)
    const container = ref(null)

    // 初始化数轴数据
    const initializeWeeks = () => {
      for (let i = 0; i < 100; i++) {
        const currentWeek = []
        let startDay
        if (i < 50) {
          startDay = dayjs()
            .subtract(50 - i, 'week')
            .startOf('week')
        } else {
          startDay = dayjs()
            .add(i - 50, 'week')
            .startOf('week')
        }
        for (let j = 0; j < 7; j++) {
          currentWeek.push(startDay.add(j, 'd'))
        }
        weeks.push(currentWeek)
      }
    }

    // 加载更多的较小数
    const loadMorePast = () => {
      const firstDay = weeks[0][0]
      const newWeeks = []
      for (let i = 1; i <= 10; i++) {
        const currentWeek = []
        const startDay = firstDay.subtract(i, 'week').startOf('week')
        for (let j = 0; j < 7; j++) {
          currentWeek.push(startDay.add(j, 'd'))
        }
        newWeeks.unshift(currentWeek)
      }
      weeks.unshift(...newWeeks)
      if (weeks.length > 100) {
        weeks.splice(-10) // 删除最后10个
      }
      nextTick(() => {
        container.value.scrollTop += 24 * newWeeks.length // 根据实际行高调整
      })
    }

    // 加载更多的较大数
    const loadMoreFuture = () => {
      const lastDay = weeks[weeks.length - 1][6]
      const newWeeks = []
      for (let i = 1; i <= 10; i++) {
        const currentWeek = []
        const startDay = lastDay.add(i, 'week').startOf('week')
        for (let j = 0; j < 7; j++) {
          currentWeek.push(startDay.add(j, 'd'))
        }
        newWeeks.push(currentWeek)
      }
      weeks.push(...newWeeks)
      if (weeks.length > 100) {
        weeks.splice(0, 10) // 删除前10个
      }
      nextTick(() => {
        console.log(container.value.scrollTop);
        container.value.scrollTop -= 24 * newWeeks.length // 根据实际行高调整
      })
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
      initializeWeeks()
      createObserver()
      nextTick(() => {
        container.value.scrollTop = container.value.scrollHeight / 2 // 初始位置设置为中间
      })
    })

    return {
      weeks,
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
  overflow-y: auto;
}
.sentinel {
  height: 1px;
}
</style>

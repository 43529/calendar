<template>
    <div class="mx-auto p-3 rounded-md bg-white max-w-[1080px] w-full box-border max-h-[calc(100vh-48px)] overflow-y-auto"
        @click.stop>

        <div class="w-full flex gap-2 items-stretch">
            <input v-model="newTodo" @keyup.enter="addTodo" placeholder="添加新的待办，回车提交"
                class="flex-1 min-w-0 px-3 py-2 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
            <button @click="addTodo" class="px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                添加
            </button>
            <button @click="callCloseOverlay"
                class="px-3 py-2 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                关闭
            </button>
        </div>

        <!-- 明确的分割线元素 -->
        <div class="w-full h-px bg-gray-200 my-4" aria-hidden="true"></div>

        <div v-if="todos.length === 0" class="text-gray-500 py-3 text-center">暂无待办</div>

        <ul
            class="w-full list-none p-0 m-0 divide-y divide-gray-200 max-h-[calc(100vh-220px)] overflow-y-auto -webkit-overflow-scrolling-touch">
            <li v-for="item in todos" :key="item.id" :class="item.done ? 'line-through text-gray-400' : ''"
                class="flex flex-col md:flex-row md:items-center md:justify-between px-2 py-3">
                <div v-if="editingId !== item.id" class="flex items-center gap-2 w-full">
                    <label class="flex items-center gap-2 flex-1">
                        <input type="checkbox" v-model="item.done" class="h-4 w-4" />
                        <span class="truncate" @dblclick="startEdit(item)">{{ item.text }}</span>
                    </label>

                    <div class="flex items-center gap-2 ml-2">
                        <button @click="startEdit(item)"
                            class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-2 py-1 cursor-pointer">编辑</button>
                        <button @click="removeTodo(item.id)"
                            class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-2 py-1 cursor-pointer">删除</button>
                    </div>
                </div>

                <div v-if="editingId === item.id" class="flex gap-2 mt-2 md:mt-2 w-full">
                    <input v-model="editText" @keyup.enter="confirmEdit" @keyup.esc="cancelEdit"
                        class="flex-1 px-2 py-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    <button @click="confirmEdit"
                        class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-2 py-1 cursor-pointer">保存</button>
                    <button @click="cancelEdit"
                        class="text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded px-2 py-1 cursor-pointer">取消</button>
                </div>
            </li>
        </ul>

        <div v-if="todos.length"
            class="w-full flex items-center justify-between mt-3 pt-3 border-t border-gray-200 text-gray-600">
            <p>总计: {{ todos.length }} / 完成: {{ doneCount }}</p>
            <button v-if="todos.length !== 0" @click="clearDone"
                class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 cursor-pointer transition-colors">
                清除已完成
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const STORAGE_KEY = 'todo-list-vue-basic'

const newTodo = ref('')
const todos = ref([])

const editingId = ref(null)
const editText = ref('')

const props = defineProps({
    closeOverlay: {
        type: Function,
    }
})

function callCloseOverlay() {

    if (typeof props.closeOverlay === 'function') {
        props.closeOverlay()
    }
}

function handleGlobalKeydown(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        if (editingId.value != null) {
            cancelEdit()
        } else {
            callCloseOverlay()
        }
    }
}
onMounted(() => {
    window.addEventListener('keydown', handleGlobalKeydown)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleGlobalKeydown)
})

function load() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) todos.value = JSON.parse(raw)
    } catch (e) {
        todos.value = []
    }
}
function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
}

load()
watch(todos, save, { deep: true })

function addTodo() {
    const text = newTodo.value.trim()
    if (!text) return
    todos.value.push({
        id: Date.now(),
        text,
        done: false
    })
    newTodo.value = ''
}

function removeTodo(id) {
    todos.value = todos.value.filter(t => t.id !== id)
    if (editingId.value === id) cancelEdit()
}

function startEdit(item) {
    editingId.value = item.id
    editText.value = item.text
}

function confirmEdit() {
    const id = editingId.value
    if (id == null) return
    const text = editText.value.trim()
    if (!text) {
        // if empty, delete
        removeTodo(id)
    } else {
        const it = todos.value.find(t => t.id === id)
        if (it) it.text = text
    }
    cancelEdit()
}

function cancelEdit() {
    editingId.value = null
    editText.value = ''
}

const doneCount = computed(() => todos.value.filter(t => t.done).length)

function clearDone() {
    todos.value = todos.value.filter(t => !t.done)
}
</script>

<!-- 原生 CSS 已移除，样式由 Tailwind 工具类提供 -->
<style scoped>
/* intentionally left blank */
</style>
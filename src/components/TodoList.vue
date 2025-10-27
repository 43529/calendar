<template>
    <div class="todo-list">
        <!-- <div style="height: 100%;"> -->
        <h2>待办事项</h2>

        <div class="input-row">
            <input v-model="newTodo" @keyup.enter="addTodo" placeholder="添加新的待办，回车提交" class="new-input" />
            <button @click="addTodo" class="add-btn">添加</button>
            <button @click="callCloseOverlay" class="add-btn">关闭外部</button>
        </div>

        <div v-if="todos.length === 0" class="empty">暂无待办</div>

        <ul class="list">
            <li v-for="item in todos" :key="item.id" :class="{ done: item.done }">
                <label>
                    <input type="checkbox" v-model="item.done" />
                    <span class="text" @dblclick="startEdit(item)">{{ item.text }}</span>
                </label>

                <div class="actions">
                    <button @click="startEdit(item)" class="edit">编辑</button>
                    <button @click="removeTodo(item.id)" class="remove">删除</button>
                </div>

                <div v-if="editingId === item.id" class="edit-row">
                    <input v-model="editText" @keyup.enter="confirmEdit" @keyup.esc="cancelEdit" />
                    <button @click="confirmEdit">保存</button>
                    <button @click="cancelEdit">取消</button>
                </div>
            </li>
        </ul>

        <div class="footer" v-if="todos.length">
            <span>总计: {{ todos.length }} / 完成: {{ doneCount }}</span>
            <button @click="clearDone" class="clear">清除已完成</button>
        </div>
        <!-- </div> -->

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

<style scoped>
.todo-list {
    margin: 0 auto;
    padding: 12px;
    border-radius: 6px;
    background: #fff;

    width: clamp(640px, 38vw, 1080px);
    box-sizing: border-box;

    /* 推荐两选一：基于视口的最大高度（稳健） */
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    min-height: 0;
}

h2 {
    margin: 0 0 8px 0;
    font-size: 18px;
}

.input-row {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.new-input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.add-btn {
    padding: 8px 12px;
    border: none;
    background: #42b983;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}

.list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-height: calc(100vh - 220px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

}

.list li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 6px;
    border-top: 1px solid #f0f0f0;
}

.list li.done .text {
    text-decoration: line-through;
    color: #999;
}

.actions button {
    margin-left: 6px;
    padding: 4px 8px;
    border: none;
    background: #f5f5f5;
    border-radius: 4px;
    cursor: pointer;
}

.edit-row {
    margin-top: 8px;
    display: flex;
    gap: 6px;
}

.empty {
    color: #888;
    padding: 12px 0;
    text-align: center;
}

.footer {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #666;
}

.clear {
    padding: 6px 10px;
    border: none;
    background: #ff6b6b;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
}
</style>
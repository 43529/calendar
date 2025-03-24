<template>
  <div  id="contextmenu" class="context-menu" >
    <ul class="menu-list">
      <li class="menu-item">复制</li>
      <li class="menu-item">粘贴</li>
      <li class="menu-item disabled">剪切</li>
      <li class="menu-item">删除</li>
      <li class="menu-item">属性</li>
    </ul>
  </div>
</template>
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

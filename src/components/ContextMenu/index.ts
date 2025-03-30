import { h, render } from 'vue';
import Menu from './Menu.vue';

const createContextMenu = () => {
  let isShow = false;
  let scope: HTMLElement | null = null;
  let containerEl: HTMLElement | null = null;

  const openMenu = (e: MouseEvent) => {
    e.preventDefault();

    scope = document.getElementById('calender');

    if (!isShow) {
      containerEl = document.createElement('div');
      containerEl.style.position = 'absolute';
      const vnode = h(Menu, { target: e.currentTarget as EventTarget & Record<string, any> });
      render(vnode, containerEl);
      isShow = true;
    }

    if (containerEl && scope) {
      const { offsetWidth } = containerEl;
      const { clientWidth } = scope;
      const { clientX, clientY } = e;

      const _X = clientWidth - clientX > offsetWidth ? clientX : clientX - offsetWidth;
      containerEl.style.top = `${clientY}px`;
      containerEl.style.left = `${_X}px`;
      scope.appendChild(containerEl);
    }
  };

  const closeMenu = () => {
    if (isShow && containerEl && scope) {
      render(null, containerEl);
      scope.removeChild(containerEl);
      isShow = false;
    }
  };
  document.addEventListener('click', closeMenu);
  document.addEventListener('wheel', closeMenu);
  return { openMenu, closeMenu };
};

// 导出单例实例（如果需要全局唯一）
export const contextMenu = createContextMenu();

// 或者导出工厂函数，以便创建多个实例
export default createContextMenu;
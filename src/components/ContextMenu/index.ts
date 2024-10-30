import { h, render } from 'vue'
import Menu from './Menu.vue'
export function openContextMenu(e: Event) {
  const scope = document.getElementById('contextmenu')
  const contanierEl = document.createElement('div')

  const vnode = h(Menu)
  render(vnode, contanierEl)

  contanierEl.style.position = 'absolute'
  contanierEl.style.top = '0px'

  window.oncontextmenu = function (e: MouseEvent) {
    e.preventDefault()
    console.log(scope);
    console.log(contanierEl);
    scope?.appendChild(contanierEl)
  }
}

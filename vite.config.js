import { fileURLToPath, URL } from 'node:url'
import copy from 'rollup-plugin-copy'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    copy({
      targets: [
        { src: 'src/assets/icons/*', dest: 'dist/assets/icons' } // 确认路径是否正确
      ],
      hook: 'writeBundle' // 确保在构建后执行
    })
  ],
  base: './', // 设置基础路径为相对路径
  build: {
    outDir: 'dist', // 输出目录
    assetsDir: 'assets' // 资源目录
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

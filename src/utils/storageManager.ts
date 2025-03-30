/// <reference types="@types/chrome" />
// 存储管理器
const StorageManager = (() => {
    // 检测是否在生产环境中（即是否有 chrome.storage）
    const isProduction: boolean =
      typeof chrome !== "undefined" && chrome.storage !== undefined;
  
    interface StorageData {
      [key: string]: any; // 支持任意键值对
    }
  
    return {
      /**
       * 设置数据
       * @param key 键名
       * @param value 值
       * @returns Promise<void>
       */
      set(key: string, value: any): Promise<void> {
        if (isProduction) {
          // 使用 chrome.storage.local
          return new Promise((resolve, reject) => {
            chrome.storage.local.set({ [key]: value }, () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          });
        } else {
          // 使用 localStorage
          try {
            localStorage.setItem(key, JSON.stringify(value));
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error);
          }
        }
      },
  
      /**
       * 获取数据
       * @param key 键名
       * @returns Promise<any>
       */
      get<T = any>(key: string): Promise<T | null> {
        if (isProduction) {
          // 使用 chrome.storage.local
          return new Promise((resolve, reject) => {
            chrome.storage.local.get([key], (result: StorageData) => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve(result[key]);
              }
            });
          });
        } else {
          // 使用 localStorage
          try {
            const value = localStorage.getItem(key);
            return Promise.resolve(value ? JSON.parse(value) : null);
          } catch (error) {
            return Promise.reject(error);
          }
        }
      },
  
      /**
       * 删除数据
       * @param key 键名
       * @returns Promise<void>
       */
      remove(key: string): Promise<void> {
        if (isProduction) {
          // 使用 chrome.storage.local
          return new Promise((resolve, reject) => {
            chrome.storage.local.remove(key, () => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          });
        } else {
          // 使用 localStorage
          try {
            localStorage.removeItem(key);
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error);
          }
        }
      },
  
      /**
       * 清空所有数据
       * @returns Promise<void>
       */
      clear(): Promise<void> {
        if (isProduction) {
          // 使用 chrome.storage.local
          return new Promise((resolve, reject) => {
            chrome.storage.local.clear(() => {
              if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
              } else {
                resolve();
              }
            });
          });
        } else {
          // 使用 localStorage
          try {
            localStorage.clear();
            return Promise.resolve();
          } catch (error) {
            return Promise.reject(error);
          }
        }
      },
    };
  })();
export default StorageManager;
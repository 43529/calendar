import { defineStore } from "pinia";

// 检测是否在扩展环境（chrome.storage）
const isExt = typeof chrome !== "undefined" && !!chrome.storage?.local;

/** 统一封装存储层，让 dev 环境自动 fallback 到 localStorage */
export const storage = {
  async get<T = unknown>(key: string): Promise<T | null> {
    if (isExt) {
      return new Promise((resolve) => {
        chrome.storage.local.get(key, (res: Record<string, unknown>) => {
          resolve(res[key] as T | null ?? null);
        });
      });
    } else {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }
  },

  async set<T = unknown>(key: string, value: T): Promise<void> {
    if (isExt) {
      return new Promise<void>((resolve) => {
        chrome.storage.local.set({ [key]: value }, () => resolve());
      });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  async remove(key: string): Promise<void> {
    if (isExt) {
      return new Promise<void>((resolve) => {
        chrome.storage.local.remove(key, () => resolve());
      });
    } else {
      localStorage.removeItem(key);
    }
  },
};

/** marks 类型（你可以自由扩展） */
export interface MarksState {
  marks: string;
}

export const useMarksStore = defineStore("marksStore", {
  state: (): MarksState => ({
    marks: "",
  }),

  actions: {
    /** 初始化：从 chrome.storage.local / localStorage 加载数据 */
    async init() {
      const saved = await storage.get<string>("marks");
      this.marks = saved ?? "";
    },

    /** 保存 Markdown / 文本 */
    async setMarks(value: string) {
      this.marks = value;
      await storage.set("marks", value);
    },

    /** 清空 */
    async clearMarks() {
      this.marks = "";
      await storage.remove("marks");
    },
  },
});

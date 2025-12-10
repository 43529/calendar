declare namespace chrome {
  namespace storage {
    namespace local {
      function get(keys: string | string[] | null, callback: (items: Record<string, unknown>) => void): void;
      function set(items: Record<string, unknown>, callback?: () => void): void;
      function remove(keys: string | string[], callback?: () => void): void;
    }
  }
}

declare const chrome: typeof chrome;
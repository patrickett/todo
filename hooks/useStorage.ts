type StorageType = "session" | "local";

export default () => {
  const storageType = (
    type: StorageType = "local"
  ): "localStorage" | "sessionStorage" => `${type ?? "session"}Storage`;

  const isBrowser: boolean = typeof window !== "undefined";

  function getItem<T>(key: string, type?: StorageType): T | string | null {
    if (isBrowser) {
      const value: string | undefined = window[storageType(type)][key];

      if (!value) return null;

      try {
        const parsed: T = JSON.parse(value);
        return parsed;
      } catch (error) {
        return value;
      }
    }

    return null;
  }

  function setItem<T>(key: string, value: T, type?: StorageType): boolean {
    if (isBrowser) {
      const val = typeof value === "string" ? value : JSON.stringify(value);
      window[storageType(type)].setItem(key, val);
      return true;
    }

    return false;
  }

  function removeItem(key: string, type?: StorageType): void {
    window[storageType(type)].removeItem(key);
  }

  return {
    getItem,
    setItem,
    removeItem,
  };
};

// type UseStorageReturnValue = {
//   getItem: (key: string, type?: StorageType) => string;
//   setItem: <T>(key: string, value: T, type?: StorageType) => boolean;
//   removeItem: (key: string, type?: StorageType) => void;
// };

// class useStorage {
//   private storageType = (
//     type?: StorageType
//   ): "localStorage" | "sessionStorage" => `${type ?? "session"}Storage`;

//   private isBrowser: boolean = typeof window !== "undefined";

//   getItem<T>(key: string, type?: StorageType): T  {
//     return this.isBrowser ? window[this.storageType(type)][key] : "";
//   };

//   setItem = <T>(key: string, value: T, type?: StorageType): boolean => {
//     if (this.isBrowser) {
//       const val = typeof value === "string" ? value : JSON.stringify(value);
//       window[this.storageType(type)].setItem(key, val);
//       return true;
//     }

//     return false;
//   };

//   removeItem = (key: string, type?: StorageType): void => {
//     window[this.storageType(type)].removeItem(key);
//   };
// }
// export default new useStorage();

class Storage {
  private GOOGLE_CHROME_STORAGE: string = 'GOOGLE_CHROME_STORAGE';
  private LOCAL_STORAGE: string = 'LOCAL_STORAGE';
  private storageMethod: string;

  constructor(type: string) {
    this.storageMethod = type === 'chrome' ? this.GOOGLE_CHROME_STORAGE : this.LOCAL_STORAGE;
  }

  public set(key: string, value: string, callback: () => void = () => {}) {
    if (this.storageMethod === this.GOOGLE_CHROME_STORAGE) {
      chrome.storage.sync.set(
        {
          [key]: value,
        },
        callback,
      );
    } else {
      localStorage.setItem(key, value);
      callback();
    }
  }

  public get(keys: string | string[] | null, callback: (arg: any) => void = arg => {}): void {
    if (this.storageMethod === this.GOOGLE_CHROME_STORAGE) {
      chrome.storage.sync.get(keys, callback);
    } else {
      if (typeof keys === 'string') {
        const result = localStorage.getItem(keys);
        callback(result);
      } else {
        const result = keys && keys.map(key => localStorage.getItem(key));
        callback(result);
      }
    }
  }

  public getAll(callback: (args: any) => void = arg => {}) {
    if (this.storageMethod === this.GOOGLE_CHROME_STORAGE) {
      this.get(null, callback);
    } else {
      const values = [];
      const keys = Object.keys(localStorage);
      let i = keys.length;

      while (i--) {
        values.push(localStorage.getItem(keys[i]));
      }
      callback(values);
    }
  }

  public remove(keys: string | string[], callback: () => void = () => {}): void {
    if (this.storageMethod === this.GOOGLE_CHROME_STORAGE) {
      chrome.storage.sync.remove(keys, callback);
    } else {
      if (typeof keys === 'string') {
        localStorage.removeItem(keys);
      } else {
        keys.map(key => localStorage.removeItem(key));
      }
      callback();
    }
  }

  public clear(callback: () => void = () => {}): void {
    if (this.storageMethod === this.GOOGLE_CHROME_STORAGE) {
      chrome.storage.sync.clear(callback);
    } else {
      localStorage.clear();
      callback();
    }
  }
}

export default Storage;

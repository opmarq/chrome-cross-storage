const GOOGLE_CHROME_STORAGE: string = 'GOOGLE_CHROME_STORAGE';
const LOCAL_STORAGE: string = 'LOCAL_STORAGE';

class Storage {
  private storageMethod: string;

  constructor(type: string) {
    this.storageMethod = type === 'chrome' ? GOOGLE_CHROME_STORAGE : LOCAL_STORAGE;
  }

  public setStorageMethod(type: string) {
    this.storageMethod = type === 'chrome' ? GOOGLE_CHROME_STORAGE : LOCAL_STORAGE;
  }

  public set(key: string, value: string, callback: (msg: any) => void) {
    if (this.storageMethod === GOOGLE_CHROME_STORAGE) {
    } else {
      localStorage.setItem(key, value);
      callback(key);
    }
  }

  public get(key: string) {
    if (this.storageMethod === GOOGLE_CHROME_STORAGE) {
    } else {
      localStorage.getItem(key);
    }
  }

  public remove(key: string) {
    if (this.storageMethod === GOOGLE_CHROME_STORAGE) {
    } else {
      localStorage.removeItem(key);
    }
  }

  public clear() {
    if (this.storageMethod === GOOGLE_CHROME_STORAGE) {
    } else {
      localStorage.clear();
    }
  }
}

export default Storage;

import Storage from '../index';

beforeEach(() => {
  localStorage.clear();
  chrome.storage.sync.clear();
});

describe('Storage', () => {
  describe("LocalStorage", () => {

    it('Should instantiate the Storage', () => {
      expect(new Storage('local')).toBeInstanceOf(Storage);
    });

    it('Should set an item', () => {
      const KEY = 'foo',
        VALUE = 'bar';

      const storage = new Storage('local');

      storage.set(KEY, VALUE);

      expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
      expect(localStorage.__STORE__[KEY]).toBe(VALUE);
      expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });

    it('Should get an item', () => {
      const KEY = 'foo',
        VALUE = 'bar';

      const storage = new Storage('local');

      localStorage.setItem(KEY, VALUE)

      storage.get(KEY, result => {
        expect(result).toStrictEqual({ [KEY]: VALUE })
      });
    });

    it('Should get all items', () => {
      const storage = new Storage('local');

      expect(Object.keys(localStorage.__STORE__).length).toBe(0);

      for (let i = 0; i < 10; i++) {
        storage.set(`foo${i}`, `bar${i}`);
      }

      expect(Object.keys(localStorage.__STORE__).length).toBe(10);

      storage.getAll(result => {
        expect(Object.keys(result).length).toBe(10)

        for (let key in result) {
          expect(result[key]).toBe(localStorage.__STORE__[key])
        }

      });

    });

    it('Should remove and item', () => {
      const KEY = 'foo',
        VALUE = 'bar';

      const storage = new Storage('local');

      storage.set(KEY, VALUE);
      expect(localStorage.__STORE__[KEY]).toBe(VALUE);
      storage.remove(KEY);
      expect(localStorage.__STORE__[KEY]).toBeUndefined();
    });

    it("Should clear the storage", () => {

      const storage = new Storage('local');

      expect(Object.keys(localStorage.__STORE__).length).toBe(0);

      for (let i = 0; i < 10; i++) {
        storage.set(`foo${i}`, `bar$`);
      }

      expect(Object.keys(localStorage.__STORE__).length).toBe(10);
      storage.clear();
      expect(Object.keys(localStorage.__STORE__).length).toBe(0);
    })
  })

  describe('Chrome Storage', () => {
    it('Should set an item', () => {
      const KEY = 'foo',
        VALUE = 'bar';

      const storage = new Storage('chrome');

      storage.set(KEY, VALUE);

      expect(chrome.storage.sync.set).toHaveBeenLastCalledWith({ [KEY]: VALUE }, expect.anything());

      chrome.storage.sync.get(KEY, (result) => {

        expect(typeof result).toBe("object")
        expect(result).toStrictEqual({ [KEY]: VALUE })

      })

    });

    it('Should get an item', () => {
      const KEY = 'foo',
        VALUE = 'bar';

      const storage = new Storage('chrome');

      chrome.storage.sync.set({ [KEY]: VALUE })

      storage.get(KEY, (result) => {
        expect(result).toStrictEqual({ [KEY]: VALUE })
      })

    });

    it('Should get all items', () => {

      const storage = new Storage('chrome');

      // @ts-ignore
      chrome.storage.sync.get(null, (result) => {
        // @ts-ignore
        expect(Object.keys(result).length).toBe(0)
      })

      for (let i = 0; i < 10; i++) {
        storage.set(`foo${i}`, `bar${i}`);
      }

      chrome.storage.sync.get(null, (result) => {
        // @ts-ignore
        expect(Object.keys(result).length).toBe(10)
      })

      storage.getAll(result => {
        expect(Object.keys(result).length).toBe(10)
      });

    });

    it('Should remove and item', () => {
      const KEY = 'foo',
        VALUE = 'bar';

      const storage = new Storage('chrome');

      storage.set(KEY, VALUE);

      chrome.storage.sync.get(KEY, (result) => {
        expect(result).toEqual({
          [KEY]: VALUE
        })
      })
      storage.remove(KEY);
      chrome.storage.sync.get(KEY, (result) => {
        expect(result).toEqual({
          [KEY]: undefined
        })
      })
    });

    it("Should clear the storage", () => {


      const storage = new Storage('chrome');

      // @ts-ignore
      chrome.storage.sync.get(null, (result) => {
        // @ts-ignore
        expect(Object.keys(result).length).toBe(0)
      })

      for (let i = 0; i < 10; i++) {
        storage.set(`foo${i}`, `bar${i}`);
      }

      chrome.storage.sync.get(null, (result) => {
        // @ts-ignore
        expect(Object.keys(result).length).toBe(10)
      })

      storage.clear();

      // @ts-ignore
      chrome.storage.sync.get(null, (result) => {
        // @ts-ignore
        expect(Object.keys(result).length).toBe(0)
      })

    })

  });

});

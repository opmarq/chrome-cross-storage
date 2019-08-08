import Storage from '../index';

beforeEach(() => {
  localStorage.clear();
});

describe('Storage', () => {
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

    storage.set(KEY, VALUE);

    storage.get(KEY, result => {
      expect(result).toEqual(VALUE);
    });
  });

  it('Should get all items', () => {
    const storage = new Storage('local');

    expect(Object.keys(localStorage.__STORE__).length).toBe(0);

    for (let i = 0; i < 10; i++) {
      storage.set(`foo${i}`, `bar$`);
    }

    expect(Object.keys(localStorage.__STORE__).length).toBe(10);
    storage.getAll(result => {
      expect(result.length).toBe(10);
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
});

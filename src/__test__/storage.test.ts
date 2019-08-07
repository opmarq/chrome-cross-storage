import Storage from '../index';

test('Storage', () => {
  expect(new Storage('web')).toBeInstanceOf(Storage);
});

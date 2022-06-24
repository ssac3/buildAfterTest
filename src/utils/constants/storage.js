export default (storage) => ({
  get(key) {
    try {
      return storage.getItem(key);
    } catch (error) {
      return null;
    }
  },
  set(key, value) {
    storage.setItem(key, value);
  },
  remove(key) {
    storage.removeItem(key);
  },
  clear() {
    storage.clear();
  },
});
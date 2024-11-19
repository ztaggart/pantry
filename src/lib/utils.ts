export function hasEmptyData<K>(data: K) {
  let key: keyof K;
  for (key in data) {
    if (data[key] === '') {
      return true;
    }
  }
  return false;
}

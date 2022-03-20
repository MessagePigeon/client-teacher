export default function getUpdateArrayByIndex<T>(
  array: T[],
  index: number,
  updateElement: T,
) {
  return [...array.slice(0, index), updateElement, ...array.slice(index + 1)];
}

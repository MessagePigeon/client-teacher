export function findIndexById<TElement extends Record<string, any>, TIdValue>(
  array: TElement[],
  id: TIdValue,
  idKey: TElement extends { id: TIdValue } ? 'id' : keyof TElement,
) {
  return array.findIndex((element) => element[idKey] === id);
}

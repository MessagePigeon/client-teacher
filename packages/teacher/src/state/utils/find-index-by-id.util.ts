export function findIndexById<
  TElement extends Record<TIdKey, any>,
  TIdKey extends string,
>(array: TElement[], id: TElement[TIdKey], idKey: TIdKey): number;
export function findIndexById<TElement extends { id: unknown }>(
  array: TElement[],
  id: TElement['id'],
): number;
export function findIndexById<
  TElement extends Record<TIdKey, any>,
  TIdKey extends string,
>(array: TElement[], id: TElement[TIdKey], idKey: TIdKey = 'id' as TIdKey) {
  return array.findIndex((element) => element[idKey] === id);
}

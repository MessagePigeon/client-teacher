/**
 * Update object array by id
 * @param array
 * @param id
 * @param data update data without `id`
 * @returns updated index or `-1` for not found
 */
export function updateById<E extends { id: unknown }>(
  array: E[],
  id: E['id'],
  data: Partial<Omit<E, 'id'>>,
) {
  const index = array.findIndex((element) => element.id === id);
  if (index === -1) return -1;
  const newElement = { ...array[index], ...data };
  array[index] = newElement;
  return index;
}
